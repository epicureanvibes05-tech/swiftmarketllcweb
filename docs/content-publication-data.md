# M4.9: Content registry and publication governance

## Scope and authority

Approved MVP v3.0, M4.1 information architecture, M4.2 route architecture and M4.3–M4.8 models/data remain authoritative. This milestone creates only `lib/data/content.ts`, `lib/data/content.test.mjs` and this document. Existing sources, identities, lifecycle contracts and the seven untracked M4.7/M4.8 files remain unchanged. No dependencies, public pages, forms, CMS/admin, backend, checkout or payment workflow are added.

Historical status statements in AGENTS/README describe the earlier foundation review; the current user-provided milestone baseline governs this task. Those documents are preserved rather than silently synchronized. No current business or route-identity conflict requires a contract change.

## Registry and contracts

`content` contains **53 immutable draft PageContent records**, one for each canonical route: 20 fixed identities and 33 conditional candidates (22 families and 11 industries). IDs follow `content:{route ID without route:}`; full route IDs remain the relationship keys. Six tier pages reference their six canonical packages, and Enterprise references the custom offer. No individual service, additional conditional route, testimonial, case study or portfolio result is fabricated.

`PageContent` composes the existing `ContentRecord` fields for ID, publication, title, summary, related entities, proof IDs and CTA. It adds required route reference, H1/heading, sections, canonical-path decision and approval attestations. The existing ContentRecord `kind` is limited to editorial/company/legal records; forcing service/package pages into those kinds would be misleading. This small composition in the data module supports all page types without changing that domain contract or creating a second lifecycle/SEO/CTA schema.

Route type, canonical full path, SEO title/description, indexing and generation remain owned by the existing RouteDefinition. Content does not duplicate route metadata. `canonicalPath` is an approval decision that must match the referenced route's path; it is not a URL or fabricated production origin. Related solution references reuse the existing union and canonical entity validation. The direction is content → route; no existing route is changed to an unsupported `content` entity reference.

All copy and approval decisions start TBF: title, summary, heading, sections, CTA, canonical path, factual review, legal review and operational review. Entity references derive only from the canonical route's existing entity, never speculative service/industry/package recommendations. Empty proof ID lists mean no proof supplied, not an assertion that the company has no proof. `proofs` is an empty typed, immutable `Proof[]` source ready for approved evidence.

## Sections and completeness

Sections have a syntax-valid unique slug, semantic role, nonempty heading/body, optional typed CTA, proof references and explicitly classified claims. They are plain content data; no HTML renderer, markdown parser or unsafe HTML path is introduced. A future renderer must encode text safely. One page heading is represented separately from section headings; rendered hierarchy/accessibility still requires later QA.

The following are implementation minimums for the authorized completeness validation, not final section labels, order, copy, commercial scope or newly approved claims:

| Existing route type | Required section roles |
| --- | --- |
| Legal | legal |
| Conversion | enquiry |
| Proof hub/detail | overview, evidence |
| Industry detail | overview, sector-context |
| Service family/individual, package hub/segment/comparison/tier, Enterprise | overview, scope |
| Other existing route types | overview |

Every page also requires approved nonempty title, summary and H1; approved sections, CTA and canonical path; factual review; content publication approval; and eligible route metadata/publication. These minimums do not establish sufficient editorial depth. Review must confirm distinct useful content and the applicable IA/route-specific requirements, including scope differentiation and relevant approved industry relationships. Commercial truth stays in canonical offer/service sources; a scope section cannot approve missing commercial data.

Legal pages additionally require legal-review approval; conversion pages and any submit CTA require operational-review approval. The fields reuse `Decision<true>` and are attestations, not invented legal policies, providers or proof of actual delivery. TBF attestations cannot pass readiness. Irrelevant legal/operational attestations may remain TBF on other page types; no forced fictional approval is required.

## Evidence governance

Existing `Proof` and `EvidenceVerification` contracts govern testimonials, case studies and client logos. Referenced proof must be published with a publication approval/date, approved nonempty title/content, a nonempty source reference and a nonempty publication-permission reference. Unknown or duplicate proof IDs fail validation. Duplicate proof inventory IDs, dangling proof routes/entities and incomplete published proof are rejected.

Section claims distinguish `numerical-performance` and `portfolio-result`. Each requires nonempty claim text and verified source/permission references. Evidence sections require supplied proof or classified claims; an empty evidence panel cannot pass. No evidence records or claims are populated in production.

Approval references are opaque identifiers for reviewed source material, not public credentials or private documents. Store sensitive evidence separately; these public-data contracts must never carry personal enquiry details or secrets. Later publication must review permission and redact information appropriately.

Automated validation cannot discover every implied claim or prove that an approval reference is truthful. Mandatory factual review attests that all prose, testimonials, portfolio outcomes and numerical performance claims are correctly classified and supported. A writer must not bypass evidence checks by burying claims in ordinary body text. Human fact checking and rights review remain launch gates.

## Helpers and publication boundaries

- `getContentById` / `getContentByRouteId`: exact architectural lookup, including drafts; unknown values return undefined.
- `requiredSectionRoles`: structural minimums by the canonical route type.
- `validateContentRegistry`: uniqueness, route/entity/CTA references, canonical-path agreement, sections/evidence, duplicate active indexable SEO metadata and unsafe published content.
- `getContentReadiness`: returns a frozen ready flag and diagnostics; unresolved fields fail readiness, while valid TBF drafts remain structurally valid registry data.
- `getPublicationEligibleContent`: returns only published content whose readiness passes. Approved-but-unpublished, draft, planned and retired records never become public through this helper.

Readiness requires approved or published content with a nonempty approval reference, plus a separately published, reviewed and eligible canonical route and ancestors. This conservative order supports approving content after its destination has been implemented/reviewed; it never marks routes published itself. Published content also needs a publication date. Invalid registry data fails public selection closed, including unrelated integrity issues, consistent with M4.8.

Primary and section CTA references use M4.8 validation. The approved primary content CTA must exactly match the route's primary CTA data, preventing conflicting journey declarations. Links must resolve through its publication-safe resolver; unknown routes, draft destinations, unverified fragments and draft selected entities cannot pass. A submit action is not a link and additionally needs operational review. Future runtime submission still requires tested validation, delivery, spam/rate controls and truthful receipt behavior.

Existing M4.8 helpers deliberately remain unchanged and validate route readiness without importing this content module. Future public consumers must additionally join destinations to `getPublicationEligibleContent` before exposing pages, navigation or sitemap entries. Calling a route-only helper cannot establish content approval; this milestone does not silently wire a new lifecycle into existing helpers.

For indexable routes, readiness requires the approved production origin under M4.8's origin policy, even if the route is intentionally excluded from the sitemap. The check uses an immutable eligibility view and does not change the real route's sitemap decision. Noindex utilities still require approved metadata and explicit indexing decisions; origin TBF cannot produce indexable eligible content. Active indexable content must have unique route SEO titles/descriptions, comparing trimmed case-insensitive values. Missing metadata fails closed.

Current outcomes: **53 draft content records, zero evidence records, zero ready content, zero publication-eligible content**. All route/data identities remain unchanged and the internal M3 preview keeps its existing noindex. No metadata, canonical URL, sitemap, robots, structured-data output or public destination is generated here.

## Missing launch inputs and approval workflow

1. Approve a useful launch subset for conditional service/industry pages and supply distinct copy, titles, summaries, H1s and sections. Maintain all canonical candidate identities even when unselected.
2. Supply approved commercial scope, pricing or custom/TBF disclosure policy, deliverables, quantities, limitations and external-cost explanations in canonical sources. Existing conservative entity publication gates remain in force; this milestone does not relax them to launch incomplete offers.
3. Supply unique SEO metadata, reviewed canonical/indexing decisions, production origin, social assets and truthful structured-data facts as applicable. Open Graph/rendered metadata and schema remain later implementation/QA work.
4. Provide source and permission references for actual supplied proof and claims. Approve or omit evidence rather than fabricate it.
5. Have responsible reviewers approve factual content and applicable legal wording. Names of reviewers, policies and company facts remain TBF until supplied.
6. Implement destinations and verify the relevant enquiry journeys. Operational-review attestation must be backed by real integration/receipt checks, never a prototype claim.
7. Record explicit decisions/approval references, publish only after all readiness gates pass and verify rendered content, links, semantics, accessibility and SEO before launch.

Prices, quantities, delivery promises, policies, legal wording, production origin, integration/provider choices and mappings remain TBF unless already approved in their existing canonical sources. Advertising/media spend and external software/platform costs retain their separate treatment. The conversion model remains enquiry/proposal-first.

## Verification and version guidance

Twelve focused Node built-in tests use the existing in-memory TypeScript convention. They cover identity/entity coverage, immutable draft/TBF data, lookups, duplicates/dangling references, separate content/route publication, copy/metadata/canonical approvals, page-type requirements, section/link integrity, evidence/permission requirements, claims, operational attestations, origin/SEO gates, purity and serialization. Synthetic fixtures are clearly marked test-only; reserved `example.invalid` origins and synthetic metadata/evidence never populate the registry.

Run `node lib/data/content.test.mjs` and all existing services, industries, packages, relationships and routes suites. Also run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, `git diff --check`, new-file whitespace checks and preservation/status checks. No package script or dependency is changed.

Installed Next.js 16 guides consulted include `01-app/01-getting-started/05-server-and-client-components.md` and `01-app/01-getting-started/14-metadata-and-og-images.md` under `node_modules/next/dist/docs/`: keep serializable public data separate from secrets and implement metadata in Server Components when that later work is authorized. This milestone introduces no version-sensitive rendering API or client boundary. Functions remain module APIs, not serialized client props. These checks are for trusted typed repository data, not validation of arbitrary CMS/API input.

## Remaining decisions and next milestone

The main remaining inputs are content owners/approvals, unique launch copy, commercial completeness, verified proof, origin/SEO assets, legal review and operational integrations. They block publication, not completion of this draft registry. No existing domain contract or dependency change is needed.

Recommended next step: explicitly authorize the remaining M4 architecture/freeze-readiness review and reconcile launch inputs before M5 production UX. No exact M4.10 specification is established by existing sources; obtain its scope rather than invent it. Production content population and pages remain separately authorized work.
