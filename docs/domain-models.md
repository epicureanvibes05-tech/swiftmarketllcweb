# Swift Market LLC — Domain Models

M4.3 implements a type foundation only. Authority: [MVP Requirements v3.0](mvp-requirements-v3.0.md), [AGENTS.md](../AGENTS.md), [M4.1](information-architecture.md), and [M4.2](route-architecture.md). Existing application files and those documents remain unchanged. There are no populated service/package/industry/route records, production pages, forms, endpoints, providers, secrets or payment behavior.

## Files and imports

The repository uses root app/ and a root-based @/* alias, so lib/domain fits without a src migration.

| File | Responsibility |
| --- | --- |
| [core.ts](../lib/domain/core.ts) | Approved family-slug taxonomy, distinguishable IDs, business segments/tiers, correlated package selections, decisions, publication, availability and public selection references |
| [commercial.ts](../lib/domain/commercial.ts) | Money shape, pricing states, billing basis, setup fees, quantities, deliverables, explicit limits, scope and external-cost treatments |
| [services.ts](../lib/domain/services.ts) | Families, individual services, industries, FAQs and shared industry/service/package/add-on associations |
| [offers.ts](../lib/domain/offers.ts) | Packages and six-slot catalog, package-service scope, projects, add-ons, custom Enterprise and agency partnership content contracts |
| [routes.ts](../lib/domain/routes.ts) | Concrete route manifest contract, navigation, CTA intent/destination variants, SEO and indexability |
| [content.ts](../lib/domain/content.ts) | Conditional articles/guides/topics/company/legal content and verified proof capabilities |
| [enquiries.ts](../lib/domain/enquiries.ts) | Private conceptual enquiry/contact/budget/attribution contracts, operational lead status and safe outcomes |
| [helpers.ts](../lib/domain/helpers.ts) | Three pure syntax guards: isPackageSegment, isPackageTier, parseSlug |
| [index.ts](../lib/domain/index.ts) | Public type-only exports; intentionally excludes private enquiry/contact/lead contracts and runtime helpers |
| [contracts.type-test.ts](../lib/domain/contracts.type-test.ts) | Compiler regression assertions; no runtime fixtures or content |

Use import type from @/lib/domain for public contracts. Runtime syntax guards require an explicit import from @/lib/domain/helpers. Private contracts require a direct type import from @/lib/domain/enquiries. All cross-module dependencies are type-only; no Next.js or React dependency is embedded in the domain.

## Installed Next.js guidance

Consulted installed Next.js 16.3.8 documentation:

- node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md: Server Components by default, minimal client boundaries and serializable client props.
- node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md: the client entry boundary and serializable props.
- node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md: async params/searchParams; domain identities are not page-prop or generated route types.

Models contain plain readonly objects, arrays, strings, numbers and booleans. Timestamp values are strings. There are no Date/URL instances, classes, functions, Maps, Sets, runtime enums or symbol-valued fields. Slug's unique-symbol brand is compile-time only; the value remains a serialized string. Optional fields may be omitted; no deliberate undefined payload value is required.

Serializability is not authorization to send data to clients. Enquiries/leads contain personal information and belong to a trusted server workflow. No such data exists in this milestone.

## Entities and relationships

ServiceFamily uses the exact 22 M4.1 family slugs as a closed taxonomy. Each family ID is correlated with its slug, separate from editable display names. No family records or availability claims are populated. Display names must later be checked against the approved requirements rather than invented.

Service belongs to one family and has explicit engagement modes, content, intended outcomes, commercial scope and optional detail route. A capability may be offered individually or as a one-time project without a recurring package. An optional route does not imply unavailability: a family/service can be described in a hub without a separate page.

Industry is extensible rather than restricted to the initial 11 candidates. IndustryServiceRelationship is a centralized many-to-many association; derive reverse links from the same records. IndustryPackageRelationship expresses suitability, not inclusion. Family relevance can be derived from actual approved individual-service associations without assuming that every service in a family applies to an industry.

PackageFor correlates ID, segment and tier. Package is their six-variant union. PackageCatalog requires startup and growing-business, each with basic, standard and premium records. IDs have the shape package:segment:tier; route paths remain separately governed by M4.2. A fresh catalog literal checked with satisfies PackageCatalog rejects missing/extra tier keys and records in the wrong slot. TypeScript structural typing is not a database uniqueness validator; imported/external catalogs still require exact-key and relationship validation later.

PackageServiceRelationship distinguishes included scope (approval required), excluded scope and related discovery. Included family context must never silently include every child service. AddOnCompatibility ties a specific add-on to a service or package with an approval reference. Reverse views should derive from these sources.

OneTimeProject references canonical services; it describes a potential one-time offering, not a completed case study. AddOn describes additional scope; compatibility comes from the shared associations rather than copied lists. Both have optional public routes, consistent with conditional /projects and /add-ons hubs.

EnterpriseOffering has segment enterprise, consultation-led scoping, custom-quote pricing and no tier. Its allowed service options are a Decision so unknown inventory is not mistaken for an approved empty list. EnterpriseSelection can be empty when a visitor seeks guidance; selections express interest and never establish scope, price or a contract.

PartnershipOffering models approved agency collaboration content and unresolved terms. A partnership enquiry shares the lead contract; there are no assumed partners, commissions, white-label capabilities or routing addresses.

Proof supports case-study/testimonial/client-logo evidence capabilities without populating evidence. Published proof requires verified source and publication-permission references as well as publication approval. References alone cannot establish truth; actual evidence review remains necessary. ContentRecord supports conditional resources, factual company/legal content and later topics without creating an editorial program or drafting policies. Topics remain Future as M4.2 specifies.

## Invariants and unknown values

Decision distinguishes TBF from approved values with an approval reference. ScopedValue additionally supports custom scoping and explicit not-applicable treatment. Absence, TBF, approved empty, custom and not-applicable are different meanings; never convert one into another automatically.

Pricing has TBF, custom-quote and approved-amount variants. Only an approved price contains Money. Billing basis is a separate scoped field in CommercialTerms so cadence may remain unknown independently of the amount. No monetary amount or currency default is supplied. Money records a minor-unit amount, currency and minor-unit precision without choosing a currency/provider. Later validation must require finite nonnegative integer amounts, approved currency/precision and consistent formatting. External or budget values are not approved Swift Market prices.

SetupFee can remain TBF/custom, contain an approved amount, or be explicitly not applicable. Approved zero is representable only through the approved amount state; unknown is never free. ScopeLimit supports TBF/custom/not-applicable, an approved maximum or explicitly approved unlimited treatment. No limit, quantity, frequency, duration or timeline default is hardcoded.

OfferScope separately captures deliverables, quantities, limits, inclusions, exclusions, timeline, reporting, support, client responsibilities and terms. A deliverable's quantity/frequency can remain unresolved. A blank array should only be approved when it truly means no items, rather than being used as a shortcut for unknown scope.

ExternalCosts requires all six baseline categories: advertising/media spend, third-party tools, hosting, premium assets, production and other external costs. Separate treatment is the approved baseline; included treatment requires explicit approved scope and an approval reference. No helper silently defaults cost records or invents amounts. Optional pricing on a separate cost is additional approved/TBF information, never evidence that the category is free.

Publication is independent of availability and route scope class. Planned/draft records do not need fabricated approvals or dates. Approved records carry approval; published records carry approval and a factual publication timestamp; retired records carry a factual retirement timestamp. Types do not by themselves prove content sufficiency or authorize publishing a TBF-filled record.

## Routes, SEO, navigation and CTA contracts

RouteDefinition types the M4.2 manifest fields: identity, slug/path, label/type/scope, publication/parent/entity, audience/intent, CTA, indexing/SEO, source/owner/template, generation, prerequisites, relations, aliases, milestone, verification and optional factual modification date.

No 20-route inventory is instantiated here. The fixed count and all M4.1/M4.2 paths remain unchanged. Dynamic filesystem patterns are templates, while path represents a concrete resolved URL. CanonicalPath's leading-slash constraint is intentionally lightweight; validate no double slash, query, fragment, trailing slash, private/system path or namespace violation in later registry checks. Root slug is null; other slugs use the syntax brand. There is no URL normalizer or path builder that could silently rename approved paths.

RouteScope separates mvp-fixed, conditional, future and system from publication status. Indexability prevents noindex + sitemap:true through its union. Actual sitemap eligibility also requires approved production origin, publication, canonicality and existing content. No sitemap/robots/metadata implementation is added.

SeoMetadata contains unresolved or approved title/description and optional factual social-image information. Production origin is not populated; canonical identity derives from origin + route path in later SEO integration. Next Metadata is deliberately not the domain contract: a future server adapter handles metadata merging and framework concerns.

NavigationItem distinguishes a direct link from a disclosure with an independently navigable parent. NavigationGroup can serve header/footer organization from the same sources. All destinations reference central route IDs. Publication filtering, breadcrumb acyclicity, collisions, orphan checks, aliases and reserved names need later registry validation; recursive navigation types alone cannot prove that a graph terminates.

ConversionCTA correlates consultation, proposal, project brief and partnership intents with their M4.2 destination IDs. Conditional audit requires an approved offer ID, never a free claim. A navigation CTA references a route and optional fragment; a submit CTA has no destination, avoiding a self-link disguised as submission. Labels must later be approved and match functioning behavior. Public selection context contains only referenced solution IDs; do not add contact/message/budget fields.

## Enquiry and lead boundaries

EnquiryIntent distinguishes guidance/general/proposal, selected package, individual service, one-time project, Enterprise, partnership and conditional audit. Package/service/audit variants require the relevant identity; project briefs may request scoping without a known project offering. Unknown guidance needs no package. SelectionContext can carry supplementary public references; future server validation must reject contradictions between intent and selected context.

EnquiryDraft is a conceptual private field-capability contract, not a validated submission schema. Contact fields are optional because M4.1/requirements explicitly defer requiredness. This does not authorize accepting empty contact details. Required contact channels, email/phone/website formats, preferred-contact consistency, lengths, consent/disclosure wording and abuse rules must be finalized and enforced server-side in the lead milestone. No fabricated email, phone, person or company is stored.

Enterprise field capabilities include goals, challenges, industry through selection, markets, existing tools, desired start and distinct serviceBudget/advertisingBudget. Visitor timing is a preference, not a delivery guarantee. Budgets are optional unspecified/provided values without bands or minimums. Attachments remain excluded until privacy/type/size/storage decisions are approved.

Attribution is private and untrusted. UTM strings may themselves contain personal information, so they do not belong in public route data or unrestricted analytics/logs. Lead status retains exactly New → Contacted → Proposal Sent → Won / Lost as conceptual stages. Lead requires receipt and time references but no persistence, transition engine, assignment policy, admin UI or operational guarantee exists.

EnquiryOutcome has received versus not-received variants with safe category reasons. A trusted workflow can return received only after actual approved handling succeeds. Receipt references must later be opaque and non-sensitive. Types cannot prove delivery or make a /thank-you visit authoritative. Never send a Lead/EnquiryDraft as page props, publish it, log it, or put it in route URLs. There are no secret/configuration fields in these contracts.

## Pure helpers and validation limits

isPackageSegment and isPackageTier narrow unknown values without coercion, case-folding or defaults. parseSlug accepts lowercase ASCII words/digits separated by single hyphens; it returns null for invalid input and a string brand for valid syntax. It does not approve a namespace, availability, uniqueness, identity, publication or reserved word.

These are the only runtime functions. No functions fetch, mutate, persist, access environment variables, import integrations, generate paths, submit leads or format unapproved prices. All relationships require future runtime lookup/validation; casts and externally parsed JSON can bypass TypeScript. Readonly constrains typed code, not runtime freezing.

## Synthetic test fixtures only — not content

These examples illustrate contracts only. They are not exported production data and must never be copied into published content as facts. No synthetic contacts, testimonials, prices, quantities or policies are supplied.

```ts
import type { PackageSelection, Pricing, Decision } from "@/lib/domain";

// SYNTHETIC TEST FIXTURE ONLY: approved architecture labels, no commercial claim.
const syntheticSelection = {
  packageId: "package:startup:basic",
  segment: "startup",
  tier: "basic",
} as const satisfies PackageSelection;

// SYNTHETIC TEST FIXTURES ONLY: unresolved values, not approved scope or prices.
const syntheticPrice = { state: "tbf" } as const satisfies Pricing;
const syntheticScope = { state: "tbf" } as const satisfies Decision<readonly string[]>;

// Type-invalid examples for future regression tests:
// packageId "package:startup:basic" paired with tier "premium"
// segment "enterprise" in PackageSelection
// tier "ultimate" in PackageCatalog
// { state: "tbf", amount: ... } in a fresh Pricing literal
// { index: false, follow: true, sitemap: true } in Indexability
```

The compile-only contracts test exact segment/tier/catalog shape, identity correlation, excluded Enterprise tiers, custom Enterprise scoping, distinct ID kinds, no amount field on unknown/custom price variants, noindex sitemap exclusion, CTA mapping and published-proof verification. Runtime helper checks can run using the installed TypeScript transpiler in memory without adding a runner or writing generated files. They cover valid/invalid slugs, all allowed segments/tiers, rejection of unknown input and no default/coercion.

## Assumptions, discrepancies and TBF

No business or route-count conflict between requirements, M4.1 and M4.2 was found. Six tier routes, 20 fixed core routes, all 22 families, 11 candidate industries, conditional resources/proof and custom Enterprise are preserved. The closed family taxonomy encodes approved architectural identifiers, not populated service records.

Two scope/status differences are recorded rather than silently resolved:

- README/AGENTS/requirements contain historical Step 0/M3 checkpoint wording; M4.1/M4.2 record the user-confirmed freeze at baf5213. Existing documents stay unchanged. Rendered QA is not inferred from either status.
- M4.2 Section 39 mentions launch inventory selection and broader registry validation in M4.3. This task authorizes domain models without content population. No launch subset, concrete route manifest, commercial records or content ownership is selected. Pure syntax guards and compile-time contracts are implemented; whole-registry validation awaits actual data.

Assumptions: prefixed string IDs are an application convention, not a storage strategy; PackageCatalog describes a complete future approved six-record catalog, not a demand to fabricate records now; optional contact fields describe unresolved capability rather than an operational form; default cost separation comes from the baseline, not a newly invented policy.

TBF remains explicit for prices/currency/cadence/setup, quantities/limits/deliverables, terms/timelines/support, service/package/industry/add-on relationships, launch content and metadata, proof permissions, required enquiry fields/consent/retention/attachments, receipt semantics/assignment, hosting/origin, email/CRM/chatbot/analytics, rate limiting/spam/monitoring and any CMS. No provider/environment/database/API decision is made.

## Proposed mapping to M4.4–M4.11

The governing documents define M4 architecture as a whole, not approved specifications for each remaining substep. The following is a **planning proposal**, not authorization, renumbering of M5–M11, or a claim that those tasks are complete. Future user instructions determine exact substep scope.

| Proposed substep | Domain contracts to consume / review |
| --- | --- |
| M4.4 | Centralized identity/slug registry structure; confirm approved labels and reserved namespaces without fabricating content |
| M4.5 | Service/family contract review and approved relationship-source layout |
| M4.6 | Package catalog/scoping/commercial-state data conventions; retain six records and all TBF facts |
| M4.7 | Industry relevance, project/add-on compatibility and reverse-association conventions |
| M4.8 | Concrete route manifest and shared navigation/CTA/breadcrumb definitions from approved inventory |
| M4.9 | Conditional content/proof publication gates and SEO input conventions; no invented evidence |
| M4.10 | Enquiry context/private boundary design; record unresolved validation/operational decisions for M8 |
| M4.11 | Architecture consistency/registry validation, meaningful type/helper QA and review before page implementation |

Actual page/service/industry/lead/SEO work still follows approved M5–M11 milestones and separately authorized tasks.

## Validation and scope

Required checks: pnpm exec tsc --noEmit, pnpm lint, pnpm build, git diff --check and git status --short. Also inspect the untracked new-file whitespace, type contracts, helper behavior and before/after hashes so M4.1/M4.2, M3, dependencies, lockfile and configuration preservation are verified.

These checks validate architecture/source compatibility, not production lead receipt, rendered accessibility, performance, SEO, publication truth or operational launch. No stage, commit or push is authorized.
