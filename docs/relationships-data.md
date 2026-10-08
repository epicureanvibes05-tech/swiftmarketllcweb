# Swift Market LLC — Cross-Registry Relationships and Integrity

M4.7 implements the user-authorized relationship/integrity layer. Authority: [MVP requirements v3.0](mvp-requirements-v3.0.md), [information architecture](information-architecture.md), [route architecture](route-architecture.md), [domain models](domain-models.md), [services data](services-data.md), [industries data](industries-data.md), [packages data](packages-data.md), and [AGENTS.md](../AGENTS.md).

## Files and unchanged sources

- [relationships.ts](../lib/data/relationships.ts): immutable references to existing registries, integrity diagnostics, and typed forward/reverse lookups.
- [relationships.test.mjs](../lib/data/relationships.test.mjs): Node built-in tests with trusted TypeScript modules transpiled in memory.
- This document: semantics, implemented checks, publication boundaries and pending decisions.

All existing files remain unchanged, including domain contracts, source data/tests, M3, configuration, dependencies and lockfile. The preserved inventory is 22 service families, 11 industries, six package tiers (three per segment), one custom Enterprise offering, and zero individual service records. Projects, add-ons, individual-plan selections and all relationship decisions remain TBF. No relationship, commercial value, service or content record is populated by M4.7.

## Existing relationship model

`RelationshipRegistry` is a readonly input bundle of existing domain contracts, not a replacement schema. The exported `relationshipRegistry` references the existing frozen source objects/arrays. No records are copied or independently maintained. Default helpers use that canonical bundle; an optional explicit bundle supports isolated tests and future trusted content review.

| Source | Existing contract / meaning |
| --- | --- |
| Industry ↔ service | `IndustryServiceRelationship`: industry/service IDs, editorial relevance and association publication |
| Package ↔ service | `PackageServiceRelationship`: included scope with approval, excluded scope, or related discovery; these meanings stay distinct |
| Industry ↔ package | `IndustryPackageRelationship`: suitability and publication; not package inclusion |
| Enterprise → service | `EnterpriseOffering.serviceOptions`: consultation-led choices, not predefined tiers or finalized scope |
| Individual plans → service | Existing `Decision<readonly ServiceId[]>`; canonical service commercial terms and approved individual engagement mode |
| Project / add-on → service | Existing `OneTimeProject.services` / `AddOn.services` decisions |
| Add-on → service / package | Existing `AddOnCompatibility`: explicit approved compatible target, not automatic inclusion |
| Service → family / related services | Existing `familyId` / `relatedServiceIds`; peer references are directed, not assumed reciprocal |

Forward and reverse views derive from the same association source. The package module already re-exports the industry recommendation decision: `industryPackages` and `packageIndustries` retain those existing references. Integrity checks compare their decision/approval and relationship semantics to detect a stale or inconsistent view; ordering differences alone do not make them inconsistent. No separate reverse list is introduced for the other relationships.

Global entity IDs remain distinct from route slugs. Package IDs are `package:segment:tier`, while Basic/Standard/Premium slugs repeat legally across segments. Slug uniqueness is scoped by package segment or individual-service family; family, industry, project and add-on slugs are checked within their respective collections. No routes or aliases are resolved by this layer.

## Lookups and result semantics

Import from `@/lib/data/relationships`. Lookup results are a discriminated union:

- `state: tbf`: unresolved source decision, preserving its original note/reference object. It is not a confirmed empty mapping.
- `state: resolved`: an immutable `items` array of matching published records/associations. It may be empty because there are no matching public relationships, even when editorial records exist.
- `state: invalid`: immutable integrity issues. Invalid registries or unknown subjects in a known registry produce no usable items.

All lookups first validate the supplied registry and fail closed on any issue. Diagnostics contain only a code and structural path, with no record contents or personal information. No alias normalization, default tier, substitute ID or inferred relationship is supplied.

| Helper | Returned items / direction |
| --- | --- |
| `getServiceRelationshipsForIndustry(industryId)` | Industry-service associations from an industry |
| `getIndustryRelationshipsForService(serviceId)` | The same associations from a service |
| `getServiceRelationshipsForPackage(packageId)` | Package-service associations, preserving included/excluded/related kind |
| `getPackageRelationshipsForService(serviceId)` | The same associations from a service |
| `getPackageRelationshipsForIndustry(industryId)` | Industry-package recommendations from an industry |
| `getIndustryRelationshipsForPackage(packageId)` | The same recommendations from a package |
| `getServicesForOffer(query)` | Canonical services for Enterprise, a project or an add-on |
| `getOffersForService(kind, serviceId)` | Canonical Enterprise/project/add-on records referencing that service |
| `getAddOnCompatibility(query)` | Shared compatibility records queried by add-on, service or package ID |

`ServiceOfferQuery` discriminates `{ kind: enterprise }`, `{ kind: one-time-project, id: ProjectId }` and `{ kind: add-on, id: AddOnId }`. `CompatibilityQuery` likewise correlates query kind with the target ID type. Result entities/associations use the existing domain models. Package lookups require globally unique package IDs; a bare `basic` slug cannot identify a package.

When a future project/add-on catalog is TBF, a correctly typed query for that category stays TBF rather than pretending the requested identity exists or definitely does not exist. Once a catalog is approved, a missing identity is invalid. A nonexistent service in the known service collection is invalid even if the relevant relationship source is unresolved. Individual-plan membership is validated without creating a parallel commercial plan record.

Helpers do not mutate input or canonical records. Result objects/arrays/diagnostics are frozen, and items reference the originals. The canonical input graph is deeply frozen. Caller-supplied bundles must honor readonly contracts; helpers do not mutate/freeze caller-owned records to repair them. Pure lookups validate on each call rather than caching potentially stale validation state.

## Implemented integrity checks

`validateRelationshipRegistry(registry?)` returns an immutable issue array. Zero issues means structurally consistent trusted data, not commercial approval or publication readiness.

- Duplicate global entity IDs; wrong entity namespace; malformed/duplicate scoped slugs; family identity/slug correlation; package ID/segment/tier/slug correlation; Enterprise custom structure with no tier.
- Service parents and directed related-service IDs; individual-plan IDs and approved individual engagement mode.
- Industry-service, package-service and industry-package endpoints; Enterprise/project/add-on service lists; add-on compatibility endpoints.
- Duplicate association pairs and service lists. Multiple included/excluded/related records for the same package-service pair are rejected as duplicate/conflicting definitions; maintain one canonical relationship per pair.
- Stale package/industry reverse views, and service compatibility contradicting an explicitly approved add-on service list.
- Empty approval references on approved decisions, included costs, included package associations, compatibility and approved/published publication records.
- Published entities or associations containing nested TBF decisions, TBF availability, or missing publication timestamp. Published associations and published service/offer service links cannot point to missing, draft or unavailable targets; a published service also needs a published available family.
- Published package-service endpoints cannot expose incomplete TBF relationship scope/explanation.

TBF decisions are valid pending data and do not themselves trigger integrity errors. Editorial association approval is independent of public publication. Approved lists can contain valid draft records awaiting content work; helpers filter those out. No approved relationship list is invented simply to satisfy validation.

## Publication and security boundaries

Lookups return only published association/owner/target records with eligible availability. Draft/planned/approved-but-unpublished/retired or unavailable records are excluded. Integrity failures produce no results, and incomplete published records are rejected. All current canonical content remains draft, and no public relationship results are populated.

This layer conservatively rejects nested TBF in published records. Any future explicitly approved policy allowing particular disclosed/omitted unknown fields needs a separately reviewed publication-policy refinement; do not weaken checks to publish current placeholders. Custom scoping/custom quote are intentional existing variants and are not fabricated prices.

Structural approval references and timestamps cannot prove business truth. This is not a validator for arbitrary external input, complete commercial semantics, legal approval, SEO/indexability, actual route existence, enquiry eligibility/delivery or rendered QA. It does not parse every field's schema, approve prices, validate every quantity, or select launch inventory. Route and operational gates remain required before public use.

Installed Next.js 16 guidance under `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` was consulted for server/client separation and serializable data. The registry and result payloads use plain serializable domain records; helper functions themselves are module APIs, not client props. No React/Next rendering code or client boundary is added. Private enquiry/contact/lead contracts are neither imported nor re-exported. There are no secrets, personal data, provider calls, environment settings, routes, navigation UI, forms, payments or checkout workflows.

External cost separation stays in the existing commercial sources: advertising/media spend, third-party tools, hosting, premium assets, production and other external costs remain separate unless explicitly approved in a specific future offer. Relationships do not modify scope, deliverables, cost treatment or enquiries.

## Tests and validation

```sh
node lib/data/relationships.test.mjs
node lib/data/services.test.mjs
node lib/data/industries.test.mjs
node lib/data/packages.test.mjs
pnpm exec tsc --noEmit
pnpm lint
pnpm build
git diff --check
git status --short
```

Ten relationship tests cover canonical counts/source identity/deep immutability; TBF versus resolved empty and invalid subjects; exact forward/reverse association identity; Enterprise/project/add-on service views and compatibility directions; dangling references; duplicate/conflicting pairs and IDs; stale reverse and contradictory associations; published TBF/missing approvals/draft targets; filtering draft/unavailable records; purity and safe diagnostics/serialization. Tests include rejection of bare tier slugs as package IDs and acceptance of the existing six segment-scoped tier identities.

All populated test data is explicitly marked **SYNTHETIC TEST FIXTURE ONLY** within the test module, never imported into production. Synthetic commercial fields use custom/custom-quote states without fabricated amounts or quantities. Tests use existing Node built-ins and TypeScript in memory, allowlisting only trusted public/helper imports; no framework, dependency, private data, script/config change or generated file is introduced. Existing services/industry/package suites remain regression coverage; compiler checks include existing M4.3 contracts and typed registry/helper boundaries.

Review new-file whitespace as well as Git diff, and compare pre/post source hashes to verify preservation. Generated build/cache artifacts are tooling output, not hand-edited source.

## Remaining inputs and M4.8 prerequisites

Pending data: actual individual services/engagement modes, individual-plan eligibility, project/add-on inventories, approved associations/relevance/suitability, compatibility, Enterprise options, all commercial/content fields and launch publication decisions. These gaps are preserved as TBF and do not block the integrity layer.

No domain-contract change or dependency blocker was identified. The submitted M4.7 specification governs this implementation; historical planning tables do not override it.

Before M4.8, provide an explicit authorized scope and file policy. A recommended next architecture step is a concrete route registry with shared CTA/navigation/breadcrumb definitions using M4.1/M4.2 and this integrity layer. Confirm route IDs, parent/path governance, publication filters and draft handling; preserve the 20 fixed route identities and conditional inventories. Production origin/metadata and launch content remain unresolved until approved; route data must not pretend those inputs are complete. Routes, UI, forms, integrations and public publication require their own later authorization. This recommendation is not an approved M4.8 implementation specification.
