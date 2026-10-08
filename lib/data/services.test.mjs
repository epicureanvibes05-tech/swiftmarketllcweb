import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Match M4.3's in-memory transpilation convention; no generated files or new runner.
const source = readFileSync(new URL("./services.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;
const data = {};
runInNewContext(compiled, { exports: data });

const requirements = readFileSync(
  new URL("../../docs/mvp-requirements-v3.0.md", import.meta.url), "utf8",
);
const architecture = readFileSync(
  new URL("../../docs/information-architecture.md", import.meta.url), "utf8",
);
const approvedNames = requirements.split("## 5. Master Service Architecture")[1]
  .split("Each family")[0].split("\n")
  .filter((line) => line.includes("| Shared service contract defined below |"))
  .map((line) => line.split("|")[1].trim());
const approvedMappings = architecture.split("## 9. Service-family architecture")[1]
  .split("## 10.")[0].split("\n")
  .filter((line) => line.includes("| /services/"))
  .map((line) => {
    const columns = line.split("|");
    return { name: columns[1].trim(), slug: columns[2].trim().slice("/services/".length) };
  });

test("exact approved family inventory and M4.1 mappings, without extra families", () => {
  assert.equal(approvedNames.length, 22);
  assert.equal(approvedMappings.length, 22);
  assert.equal(data.serviceFamilies.length, 22);
  assert.deepEqual(Array.from(data.serviceFamilies, (family) => family.name), approvedNames);
  assert.deepEqual(
    Array.from(data.serviceFamilies, ({ name, slug }) => ({ name, slug })),
    approvedMappings,
  );
});

test("identities are unique, stable, URL-safe and match exact lookup results", () => {
  assert.equal(new Set(data.serviceFamilies.map((family) => family.id)).size, 22);
  assert.equal(new Set(data.serviceFamilies.map((family) => family.slug)).size, 22);
  for (const family of data.serviceFamilies) {
    assert.equal(family.id, `family:${family.slug}`);
    assert.match(family.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(data.getServiceFamilyById(family.id), family);
    assert.equal(data.getServiceFamilyBySlug(family.slug), family);
  }
  assert.equal(data.getServiceFamilyById("family:unknown"), undefined);
  assert.equal(data.getServiceFamilyBySlug("SEO"), undefined);
  assert.equal(data.getServiceFamilyBySlug("seo/"), undefined);
});

test("all family content/scope stays draft and TBF; no SEO or commercial fabrication", () => {
  for (const family of data.serviceFamilies) {
    assert.equal(family.publication.status, "draft");
    assert.equal(family.availability, "tbf");
    assert.equal(family.targetSegments.state, "tbf");
    assert.equal("routeId" in family, false);
    assert.equal("metadata" in family, false);
    assert.equal("indexability" in family, false);
    assert.equal("commercial" in family, false);
    for (const decision of [...Object.values(family.content), ...Object.values(family.scope)]) {
      assert.equal(decision.state, "tbf");
      assert.equal("value" in decision, false);
    }
    assert.deepEqual(Object.keys(family).sort(), [
      "availability", "content", "id", "name", "publication", "scope", "slug", "targetSegments",
    ].sort());
  }
});

test("no individual records are invented; future populated relationships must be valid", () => {
  assert.equal(data.services.length, 0);
  const familyIds = new Set(data.serviceFamilies.map((family) => family.id));
  assert.equal(new Set(data.services.map((service) => service.id)).size, data.services.length);
  // Child slugs are unique within their canonical family namespace.
  assert.equal(new Set(data.services.map((s) => `${s.familyId}/${s.slug}`)).size, data.services.length);
  for (const service of data.services) assert.equal(familyIds.has(service.familyId), true);
  assert.equal(data.getServiceById("service:unknown"), undefined);
  assert.equal(data.getServicesByFamily("family:unknown").length, 0);
  for (const family of data.serviceFamilies) {
    assert.equal(data.getServicesByFamily(family.id).length, 0);
  }
});

test("every baseline external cost remains explicitly separate, without invented pricing", () => {
  assert.deepEqual(Object.keys(data.serviceExternalCosts).sort(), [
    "advertising-media-spend", "third-party-tools", "hosting",
    "premium-assets", "production", "other-external",
  ].sort());
  for (const cost of Object.values(data.serviceExternalCosts)) {
    assert.equal(cost.treatment, "separate");
    assert.equal("pricing" in cost, false);
    assert.equal("amount" in cost, false);
  }
});

test("shared draft records cannot be mutated; helpers preserve inventory and ordering", () => {
  const before = JSON.stringify(data.serviceFamilies);
  assert.equal(Object.isFrozen(data.serviceFamilies), true);
  assert.equal(Object.isFrozen(data.services), true);
  for (const family of data.serviceFamilies) {
    assert.equal(Object.isFrozen(family), true);
    assert.equal(Object.isFrozen(family.content), true);
    assert.equal(Object.isFrozen(family.scope), true);
    assert.equal(Object.isFrozen(family.publication), true);
    assert.equal(Object.isFrozen(family.targetSegments), true);
    for (const decision of Object.values(family.content)) {
      assert.equal(Object.isFrozen(decision), true);
    }
    assert.throws(() => { family.name = "SYNTHETIC MUTATION TEST ONLY"; }, TypeError);
    data.getServicesByFamily(family.id);
  }
  assert.equal(JSON.stringify(data.serviceFamilies), before);
  assert.equal(Object.isFrozen(data.serviceExternalCosts), true);
  assert.doesNotThrow(() => JSON.stringify(data.serviceFamilies));
});
