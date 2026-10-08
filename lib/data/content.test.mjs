import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const paths = {
  "@/lib/domain/helpers": "../domain/helpers.ts", "@/lib/data/services": "./services.ts",
  "@/lib/data/industries": "./industries.ts", "@/lib/data/packages": "./packages.ts",
  "@/lib/data/relationships": "./relationships.ts", "@/lib/data/routes": "./routes.ts",
  "@/lib/data/navigation": "./navigation.ts", "@/lib/data/content": "./content.ts",
};
const modules = new Map();
function load(name) {
  assert.equal(Object.hasOwn(paths, name), true, `Unexpected import: ${name}`);
  if (modules.has(name)) return modules.get(name);
  const compiled = ts.transpileModule(readFileSync(new URL(paths[name], import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const exports = {}; modules.set(name, exports);
  runInNewContext(compiled, { exports, require: load, URL });
  return exports;
}
const api = load("@/lib/data/content"), routeApi = load("@/lib/data/routes");
const tbf = { state: "tbf" };
const approved = (value) => ({ state: "approved", value, approvalReference: "SYNTHETIC TEST APPROVAL ONLY" });
// SYNTHETIC TEST FIXTURES ONLY; no fixtures are exported to production.
const published = { status: "published", approvalReference: "SYNTHETIC TEST APPROVAL ONLY", publishedAt: "2000-01-01T00:00:00Z" };
const verified = { status: "verified", sourceReference: "SYNTHETIC TEST SOURCE ONLY", publicationPermissionReference: "SYNTHETIC TEST PERMISSION ONLY" };
const cta = { kind: "navigation", intent: "recover", label: "SYNTHETIC TEST CTA ONLY", destination: { routeId: "route:home" } };
function fixture(type = "home") {
  const routeSource = routeApi.routes.map((r) => r.id !== "route:home" ? r : ({
    ...r, type, publication: published, verification: "reviewed", generation: "static",
    audience: approved([]), seoIntent: approved("SYNTHETIC TEST INTENT ONLY"),
    dataSource: approved("SYNTHETIC TEST SOURCE ONLY"), contentOwner: approved("SYNTHETIC TEST OWNER ONLY"),
    template: approved("SYNTHETIC TEST TEMPLATE ONLY"), primaryCTA: approved(cta),
    metadata: { title: approved("SYNTHETIC TEST SEO TITLE ONLY"), description: approved("SYNTHETIC TEST SEO DESCRIPTION ONLY") },
    indexability: approved({ index: false, follow: true, sitemap: false }),
  }));
  const record = {
    ...api.content[0], publication: published, title: approved("SYNTHETIC TEST TITLE ONLY"),
    summary: approved("SYNTHETIC TEST SUMMARY ONLY"), heading: approved("SYNTHETIC TEST HEADING ONLY"),
    canonicalPath: approved("/"), factualReview: approved(true), cta: approved(cta),
    sections: approved([{ id: "overview", role: "overview", heading: "SYNTHETIC TEST SECTION ONLY",
      body: "SYNTHETIC TEST BODY ONLY", proofIds: [], claims: [] }]),
  };
  return { record, routeSource };
}
function issues(record, routeSource, evidence = []) {
  return Array.from(api.getContentReadiness(record.id, [record], routeSource, evidence).issues, (i) => i.code);
}
function deepFrozen(value) {
  if (value && typeof value === "object") {
    assert.ok(Object.isFrozen(value)); Object.values(value).forEach(deepFrozen);
  }
}

test("53 canonical draft records preserve all 20 fixed and 33 conditional route identities", () => {
  assert.equal(api.content.length, 53);
  assert.deepEqual(Array.from(api.content, (c) => c.routeId), Array.from(routeApi.routes, (r) => r.id));
  assert.equal(new Set(api.content.map((c) => c.id)).size, 53);
  assert.equal(api.validateContentRegistry().length, 0);
  assert.equal(api.content.filter((c) => c.relatedEntities[0]?.kind === "service-family").length, 22);
  assert.equal(api.content.filter((c) => c.relatedEntities[0]?.kind === "industry").length, 11);
  assert.equal(api.content.filter((c) => c.relatedEntities[0]?.kind === "package").length, 6);
  assert.equal(api.content.filter((c) => c.relatedEntities[0]?.kind === "enterprise").length, 1);
});
test("unknown lookups have no fallback and draft/TBF content never becomes public", () => {
  assert.equal(api.getContentById("content:missing"), undefined);
  assert.equal(api.getContentByRouteId("/about"), undefined);
  assert.equal(api.getContentByRouteId("route:about").id, "content:about");
  assert.equal(api.getPublicationEligibleContent().length, 0);
  for (const c of api.content) {
    assert.equal(c.publication.status, "draft");
    for (const field of ["title", "summary", "heading", "sections", "cta", "canonicalPath", "factualReview", "legalReview", "operationalReview"]) assert.equal(c[field].state, "tbf");
    assert.equal(api.getContentReadiness(c.id).ready, false);
  }
  assert.equal(api.proofs.length, 0);
});
test("duplicate content IDs/routes, dangling route/entity/CTA references fail closed", () => {
  const { record, routeSource } = fixture();
  const codes = Array.from(api.validateContentRegistry([record, record], routeSource), (i) => i.code);
  assert.ok(codes.includes("duplicate-id")); assert.ok(codes.includes("duplicate-route"));
  assert.ok(issues({ ...record, routeId: "route:missing" }, routeSource).includes("invalid-route"));
  assert.ok(issues({ ...record, relatedEntities: [{ kind: "industry", id: "industry:missing" }] }, routeSource).includes("invalid-reference"));
  assert.ok(issues({ ...record, cta: approved({ ...cta, destination: { routeId: "route:missing" } }) }, routeSource).includes("invalid-cta"));
});
test("complete synthetic content is eligible only with separate route and content publication", () => {
  const { record, routeSource } = fixture();
  assert.deepEqual(issues(record, routeSource), []);
  assert.equal(api.getPublicationEligibleContent([record], routeSource).length, 1);
  const unpublished = { ...record, publication: { status: "approved", approvalReference: "SYNTHETIC TEST APPROVAL ONLY" } };
  assert.equal(api.getContentReadiness(record.id, [unpublished], routeSource).ready, true);
  assert.equal(api.getPublicationEligibleContent([unpublished], routeSource).length, 0);
  assert.ok(issues({ ...record, publication: { status: "draft" } }, routeSource).includes("missing-approval"));
  assert.equal(api.getPublicationEligibleContent([record], routeApi.routes).length, 0);
});
test("missing copy, approvals, canonical path or route metadata fails closed", () => {
  const { record, routeSource } = fixture();
  for (const field of ["title", "summary", "heading", "sections", "factualReview", "cta", "canonicalPath"]) assert.ok(issues({ ...record, [field]: tbf }, routeSource).length);
  assert.ok(issues({ ...record, canonicalPath: approved("/wrong/") }, routeSource).includes("invalid-canonical"));
  assert.ok(issues({ ...record, heading: approved(" ") }, routeSource).includes("missing-content"));
  assert.ok(issues({ ...record, factualReview: { ...approved(true), approvalReference: " " } }, routeSource).includes("missing-approval"));
  const missingSEO = routeSource.map((r) => r.id === record.routeId ? { ...r, metadata: { ...r.metadata, title: tbf } } : r);
  assert.ok(issues(record, missingSEO).includes("missing-seo"));
});
test("page-type completeness requires scope, sector, enquiry, legal and evidence roles", () => {
  for (const type of ["service-family", "individual-service", "package-tier", "enterprise", "industry", "conversion", "legal", "proof-detail"]) {
    const { record, routeSource } = fixture(type);
    assert.ok(issues(record, routeSource).includes("missing-section"), type);
  }
  const { record, routeSource } = fixture("legal");
  const legal = { ...record, sections: approved([{ ...record.sections.value[0], role: "legal" }]) };
  assert.ok(issues(legal, routeSource).includes("missing-approval"));
  assert.deepEqual(issues({ ...legal, legalReview: approved(true) }, routeSource), []);
});
test("empty/malformed sections, duplicate anchors and unverified section links are rejected", () => {
  const { record, routeSource } = fixture(), section = record.sections.value[0];
  assert.ok(issues({ ...record, sections: approved([]) }, routeSource).includes("missing-section"));
  for (const change of [{ body: "" }, { heading: " " }, { id: "Bad Anchor" }]) assert.ok(issues({ ...record, sections: approved([{ ...section, ...change }]) }, routeSource).includes("invalid-section"));
  assert.ok(issues({ ...record, sections: approved([section, section]) }, routeSource).includes("invalid-section"));
  assert.ok(issues({ ...record, sections: approved([{ ...section, cta: { ...cta, destination: { routeId: "route:home", fragment: "missing" } } }]) }, routeSource).includes("invalid-cta"));
});
test("testimonials and case-study evidence require source, permission, approval and publication", () => {
  const { record, routeSource } = fixture();
  for (const kind of ["testimonial", "case-study", "client-logo"]) {
    const proof = { id: "proof:synthetic", kind, title: approved("SYNTHETIC TEST PROOF ONLY"), content: approved("SYNTHETIC TEST EVIDENCE ONLY"), publication: published, verification: verified, relatedEntities: [] };
    const linked = { ...record, proofIds: [proof.id] };
    assert.deepEqual(issues(linked, routeSource, [proof]), []);
    for (const invalid of [{ ...proof, verification: { status: "unverified" } }, { ...proof, verification: { ...verified, sourceReference: " " } }, { ...proof, verification: { ...verified, publicationPermissionReference: " " } }, { ...proof, publication: { status: "draft" } }, { ...proof, content: tbf }]) assert.ok(issues(linked, routeSource, [invalid]).includes("missing-evidence"));
    assert.ok(issues(linked, routeSource).includes("invalid-reference"));
    assert.ok(api.validateContentRegistry([record], routeSource, [proof, proof]).length);
  }
});
test("numerical performance and portfolio result claims require verified references", () => {
  const { record, routeSource } = fixture(), section = record.sections.value[0];
  for (const kind of ["numerical-performance", "portfolio-result"]) {
    const claim = { kind, text: "SYNTHETIC TEST CLAIM ONLY", verification: verified };
    const claimed = { ...record, sections: approved([{ ...section, claims: [claim] }]) };
    assert.deepEqual(issues(claimed, routeSource), []);
    assert.ok(issues({ ...claimed, sections: approved([{ ...section, claims: [{ ...claim, verification: { status: "unverified" } }] }]) }, routeSource).includes("missing-evidence"));
  }
});
test("conversion and submit actions require operational attestation without asserting delivery", () => {
  const { record, routeSource } = fixture("conversion");
  const conversion = { ...record, sections: approved([{ ...record.sections.value[0], role: "enquiry" }]),
    cta: approved({ kind: "submit-enquiry", intent: "request-consultation", label: "SYNTHETIC TEST SUBMIT ONLY" }) };
  const matchingRoutes = routeSource.map((r) => r.id === record.routeId ? { ...r, primaryCTA: conversion.cta } : r);
  assert.ok(issues(conversion, matchingRoutes).includes("missing-approval"));
  assert.deepEqual(issues({ ...conversion, operationalReview: approved(true) }, matchingRoutes), []);
  assert.ok(issues({ ...conversion, operationalReview: approved(true) }, routeSource).includes("invalid-cta"));
});
test("indexed content needs approved origin and unique SEO; unsafe publication is diagnosed", () => {
  const { record, routeSource } = fixture();
  const indexed = routeSource.map((r) => r.id === record.routeId ? { ...r, indexability: approved({ index: true, follow: true, sitemap: false }) } : r);
  assert.ok(issues(record, indexed).includes("missing-seo"));
  assert.equal(api.getContentReadiness(record.id, [record], indexed, [], approved("https://example.invalid")).ready, true);
  assert.equal(api.getContentReadiness(record.id, [record], indexed, [], approved("http://localhost:3000")).ready, false);
  const secondRoute = { ...indexed[0], id: "route:synthetic-test", path: "/synthetic-test", slug: "synthetic-test", parentId: "route:home" };
  const secondContent = { ...record, id: "content:synthetic-test", routeId: secondRoute.id, canonicalPath: approved(secondRoute.path) };
  assert.ok(Array.from(api.validateContentRegistry([record, secondContent], [...indexed, secondRoute]), (i) => i.code).includes("duplicate-seo"));
  assert.ok(Array.from(api.validateContentRegistry([{ ...record, heading: tbf }], routeSource), (i) => i.code).includes("unsafe-publication"));
});
test("all helpers preserve source data, deeply frozen canonical records and serialization", () => {
  const before = JSON.stringify({ content: api.content, routes: routeApi.routes });
  deepFrozen(api.content); deepFrozen(api.proofs);
  api.getContentReadiness("content:home"); api.validateContentRegistry(); api.getPublicationEligibleContent();
  assert.equal(JSON.stringify({ content: api.content, routes: routeApi.routes }), before);
  assert.equal(JSON.stringify(JSON.parse(JSON.stringify(api.content))), JSON.stringify(api.content));
});
