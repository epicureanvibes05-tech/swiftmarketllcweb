import type {
  CanonicalPath, ContentId, ContentRecord, CTA, Decision, EvidenceVerification,
  Proof, ProofId, RouteDefinition, RouteId, RouteType, Slug,
} from "@/lib/domain";
import { parseSlug } from "@/lib/domain/helpers";
import { relationshipRegistry } from "@/lib/data/relationships";
import type { RelationshipRegistry } from "@/lib/data/relationships";
import {
  getPublicRouteById, getRouteById, getSitemapRoutes, routes, siteOrigin,
  validateCTAReferences, validateRouteRegistry,
} from "@/lib/data/routes";
import { resolvePublicCTA } from "@/lib/data/navigation";

export type SectionRole = "overview" | "scope" | "sector-context" | "enquiry" | "legal" | "evidence";
export type EvidenceClaim = Readonly<{
  kind: "numerical-performance" | "portfolio-result";
  text: string;
  verification: EvidenceVerification;
}>;
export type ContentSection = Readonly<{
  id: Slug;
  role: SectionRole;
  heading: string;
  body: string;
  cta?: CTA;
  proofIds: readonly ProofId[];
  claims: readonly EvidenceClaim[];
}>;
/** Composition of existing content fields; no false editorial kind for service pages. */
export type PageContent = Pick<ContentRecord,
  "id" | "publication" | "title" | "summary" | "relatedEntities" | "proofIds" | "cta"
> & Readonly<{
  routeId: RouteId;
  heading: Decision<string>;
  sections: Decision<readonly ContentSection[]>;
  canonicalPath: Decision<CanonicalPath>;
  /** Human review attests that all claims are classified and source-supported. */
  factualReview: Decision<true>;
  legalReview: Decision<true>;
  operationalReview: Decision<true>;
}>;
const tbf = Object.freeze({ state: "tbf" } as const);
const empty = Object.freeze([]);
export const proofs: readonly Proof[] = empty;
export const content: readonly PageContent[] = Object.freeze(routes.map((route) => Object.freeze({
  id: `content:${route.id.slice("route:".length)}` as ContentId,
  routeId: route.id, publication: Object.freeze({ status: "draft" } as const),
  title: tbf, summary: tbf, heading: tbf, sections: tbf, cta: tbf, canonicalPath: tbf,
  factualReview: tbf, legalReview: tbf, operationalReview: tbf,
  relatedEntities: Object.freeze(route.entity && route.entity.kind !== "content" ? [route.entity] : []),
  proofIds: empty,
})));

export function getContentById(id: string, source = content): PageContent | undefined { return source.find((c) => c.id === id); }
export function getContentByRouteId(id: string, source = content): PageContent | undefined { return source.find((c) => c.routeId === id); }

/** Structural minimums, not final section names, copy, order or commercial scope. */
export function requiredSectionRoles(type: RouteType): readonly SectionRole[] {
  switch (type) {
    case "legal": return Object.freeze(["legal"]);
    case "conversion": return Object.freeze(["enquiry"]);
    case "proof-hub": case "proof-detail": return Object.freeze(["overview", "evidence"]);
    case "industry": return Object.freeze(["overview", "sector-context"]);
    case "service-family": case "individual-service": case "packages-hub": case "package-segment":
    case "package-comparison": case "package-tier": case "enterprise":
      return Object.freeze(["overview", "scope"]);
    default: return Object.freeze(["overview"]);
  }
}
export type ContentIssue = Readonly<{
  code: "duplicate-id" | "duplicate-route" | "invalid-route" | "invalid-reference" | "invalid-canonical"
    | "invalid-section" | "invalid-cta" | "missing-evidence" | "missing-content" | "missing-section"
    | "missing-approval" | "missing-seo" | "duplicate-seo" | "route-not-ready" | "unsafe-publication";
  contentId: string;
  field: string;
}>;
function decided<T>(value: Decision<T>): value is Extract<Decision<T>, { state: "approved" }> {
  return value.state === "approved" && !!value.approvalReference.trim();
}
function textReady(value: Decision<string>): boolean { return decided(value) && !!value.value.trim(); }
function verified(value: EvidenceVerification): boolean {
  return value.status === "verified" && !!value.sourceReference.trim() && !!value.publicationPermissionReference.trim();
}
function proofReady(proof: Proof): boolean {
  return proof.publication.status === "published" && !!proof.publication.approvalReference.trim()
    && !!proof.publication.publishedAt.trim() && verified(proof.verification)
    && textReady(proof.title) && textReady(proof.content);
}
function inspectContent(record: PageContent, source: readonly RouteDefinition[], evidence: readonly Proof[], data: RelationshipRegistry, complete: boolean): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];
  const report = (code: ContentIssue["code"], field: string) => issues.push(Object.freeze({ code, contentId: record.id, field }));
  const route = getRouteById(record.routeId, source);
  if (!route) report("invalid-route", "routeId");
  if (record.canonicalPath.state === "approved" && (!decided(record.canonicalPath) || record.canonicalPath.value !== route?.path)) report("invalid-canonical", "canonicalPath");
  // Reuse canonical entity validation without mutating the existing route source.
  if (route && validateRouteRegistry([{ ...route, publication: { status: "draft" }, indexability: tbf, primaryCTA: tbf,
    parentId: null, path: "/", slug: null, relatedEntities: record.relatedEntities, entity: undefined }], data).some((i) => i.code === "invalid-entity")) report("invalid-reference", "relatedEntities");
  const checkCTA = (cta: CTA, field: string) => {
    if (!cta.label.trim() || validateCTAReferences(cta, source, data).length
      || (cta.kind === "navigation" && cta.destination.fragment)) report("invalid-cta", field);
    if (complete && cta.kind !== "submit-enquiry" && !resolvePublicCTA(cta, source, data)) report("route-not-ready", field);
    if (cta.kind === "submit-enquiry" && (!decided(record.operationalReview) || record.operationalReview.value !== true)) report("missing-approval", "operationalReview");
  };
  const checkProofIds = (ids: readonly ProofId[], field: string) => {
    if (new Set(ids).size !== ids.length) report("invalid-reference", field);
    for (const id of ids) {
      const proof = evidence.find((p) => p.id === id);
      if (!proof) report("invalid-reference", field);
      else if (!proofReady(proof)) report("missing-evidence", field);
    }
  };
  checkProofIds(record.proofIds, "proofIds");
  if (record.cta.state === "approved") checkCTA(record.cta.value, "cta");
  if (route?.primaryCTA.state === "approved" && record.cta.state === "approved"
    && JSON.stringify(route.primaryCTA.value) !== JSON.stringify(record.cta.value)) report("invalid-cta", "route.primaryCTA");
  if (record.sections.state === "approved") {
    const ids = new Set<string>();
    for (const section of record.sections.value) {
      if (!parseSlug(section.id) || ids.has(section.id) || !section.heading.trim() || !section.body.trim()) report("invalid-section", section.id);
      ids.add(section.id); checkProofIds(section.proofIds, section.id);
      if (section.cta) checkCTA(section.cta, section.id);
      for (const claim of section.claims) if (!claim.text.trim() || !verified(claim.verification)) report("missing-evidence", section.id);
      if (section.role === "evidence" && !section.proofIds.length && !section.claims.length) report("missing-evidence", section.id);
    }
  }
  if (!complete) return Object.freeze(issues);
  for (const field of ["title", "summary", "heading"] as const) if (!textReady(record[field])) report("missing-content", field);
  for (const field of ["canonicalPath", "cta", "sections", "factualReview"] as const) if (!decided<unknown>(record[field])) report("missing-approval", field);
  if (decided(record.factualReview) && record.factualReview.value !== true) report("missing-approval", "factualReview");
  if (!(record.publication.status === "approved" || record.publication.status === "published") || !record.publication.approvalReference.trim()) report("missing-approval", "publication");
  if (record.publication.status === "published" && !record.publication.publishedAt.trim()) report("missing-approval", "publishedAt");
  if (route) {
    const sections = record.sections.state === "approved" ? record.sections.value : empty;
    for (const role of requiredSectionRoles(route.type)) if (!sections.some((s) => s.role === role)) report("missing-section", role);
    if (route.type === "legal" && (!decided(record.legalReview) || record.legalReview.value !== true)) report("missing-approval", "legalReview");
    if (route.type === "conversion" && (!decided(record.operationalReview) || record.operationalReview.value !== true)) report("missing-approval", "operationalReview");
    if (!textReady(route.metadata.title) || !textReady(route.metadata.description) || !decided(route.indexability)) report("missing-seo", "route.metadata/indexability");
    if (!getPublicRouteById(route.id, source, data)) report("route-not-ready", "routeId");
  }
  return Object.freeze(issues);
}

export function validateContentRegistry(source = content, routeSource = routes, evidence = proofs, data = relationshipRegistry): readonly ContentIssue[] {
  const issues: ContentIssue[] = [], ids = new Set<string>(), targets = new Set<string>();
  const report = (code: ContentIssue["code"], contentId: string, field: string) => issues.push(Object.freeze({ code, contentId, field }));
  if (validateRouteRegistry(routeSource, data).length) report("invalid-route", "registry", "routes");
  const evidenceIds = new Set<string>();
  for (const proof of evidence) {
    if (evidenceIds.has(proof.id)) report("duplicate-id", proof.id, "proofs");
    evidenceIds.add(proof.id);
    if (proof.routeId && !getRouteById(proof.routeId, routeSource)) report("invalid-route", proof.id, "routeId");
    const probe = routeSource[0];
    if (probe && validateRouteRegistry([{ ...probe, publication: { status: "draft" }, indexability: tbf,
      primaryCTA: tbf, parentId: null, path: "/", slug: null, entity: undefined, relatedEntities: proof.relatedEntities }], data)
      .some((issue) => issue.code === "invalid-entity")) report("invalid-reference", proof.id, "relatedEntities");
    if (proof.publication.status === "published" && !proofReady(proof)) report("missing-evidence", proof.id, "verification/content");
  }
  const titles = new Set<string>(), descriptions = new Set<string>();
  for (const record of source) {
    if (ids.has(record.id)) report("duplicate-id", record.id, "id");
    if (targets.has(record.routeId)) report("duplicate-route", record.id, "routeId");
    ids.add(record.id); targets.add(record.routeId);
    issues.push(...inspectContent(record, routeSource, evidence, data, false));
    if (record.publication.status === "published") {
      if (inspectContent(record, routeSource, evidence, data, true).length) report("unsafe-publication", record.id, "readiness");
    }
    const route = getRouteById(record.routeId, routeSource);
    if (route?.indexability.state === "approved" && route.indexability.value.index
      && (record.publication.status === "approved" || record.publication.status === "published")) {
      for (const [field, values] of [["title", titles], ["description", descriptions]] as const) {
        const metadata = route.metadata[field];
        if (textReady(metadata) && metadata.state === "approved") {
          const normalized = metadata.value.trim().toLowerCase();
          if (values.has(normalized)) report("duplicate-seo", record.id, field);
          values.add(normalized);
        }
      }
    }
  }
  return Object.freeze(issues);
}

export type ContentReadiness = Readonly<{ ready: boolean; issues: readonly ContentIssue[] }>;
export function getContentReadiness(id: string, source = content, routeSource = routes, evidence = proofs, origin: Decision<string> = siteOrigin, data = relationshipRegistry): ContentReadiness {
  const record = getContentById(id, source);
  const issues = [...validateContentRegistry(source, routeSource, evidence, data)];
  if (!record) issues.push(Object.freeze({ code: "invalid-reference", contentId: id, field: "id" }));
  else {
    issues.push(...inspectContent(record, routeSource, evidence, data, true));
    const route = getRouteById(record.routeId, routeSource);
    if (route?.indexability.state === "approved" && route.indexability.value.index) {
      // Reuse M4.8 origin/publication policy without altering the route's actual sitemap decision.
      const checked = routeSource.map((r) => r.id === route.id ? { ...r, indexability: { ...route.indexability, value: { index: true, follow: true, sitemap: true } } } as RouteDefinition : r);
      if (!getSitemapRoutes(checked, origin, data).some((r) => r.id === route.id)) issues.push(Object.freeze({ code: "missing-seo", contentId: id, field: "siteOrigin" }));
    }
  }
  return Object.freeze({ ready: issues.length === 0, issues: Object.freeze(issues) });
}
export function getPublicationEligibleContent(source = content, routeSource = routes, evidence = proofs, origin: Decision<string> = siteOrigin, data = relationshipRegistry): readonly PageContent[] {
  return Object.freeze(source.filter((record) => record.publication.status === "published"
    && getContentReadiness(record.id, source, routeSource, evidence, origin, data).ready));
}
