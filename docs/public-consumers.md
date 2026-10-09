# M4.12.1 — Publication-safe consumer contract

This milestone addresses the two M4.12 audit findings without implementing M5 UI. Approved MVP v3.0, canonical identities, domain contracts and commercial decisions remain unchanged. The 22 families, 11 industries, six tiers, custom Enterprise, 53 routes and 53 content records remain draft. All public consumer results currently exclude them.

## Public entry point

Pages, components and application utilities import runtime data only through `@/lib/data/public-consumers`. Public domain types may still be imported with `import type`. Raw registries and route-only APIs remain available inside `lib/data` and integrity tests for compatibility and editorial inspection. They are not proof of public eligibility.

| Adapter | Contract |
| --- | --- |
| `getPublicationSafeRouteById(id, sources?)` | Exact route ID lookup requiring eligible route and content; otherwise undefined |
| `getPublicationSafeRouteByPath(path, sources?)` | Exact canonical full path; no alias/query/fragment/case coercion |
| `getPublicationSafeContentByRouteId(id, sources?)` | Associated eligible content with an eligible route; otherwise undefined |
| `resolvePublicationSafeConsumerCTA(cta, sources?)` | Existing content-safe CTA validation plus nonempty label; normalized path and separate verified fragment, or undefined |
| `getPublicationSafeNavigation(groups?, sources?)` | Validates candidate IDs/references/cycles/fragments and excludes destinations lacking eligible content; removes empty groups and converts childless disclosures into links |
| `getPublicationSafeBreadcrumbs(id, sources?)` | Existing canonical parent traversal, cycle detection and route checks plus eligible content for every item; current item remains unlinked |
| `getPublicationSafeSitemapRoutes(sources?)` | Eligible route/content intersection with approved origin and explicit index/sitemap decisions; candidates only |

`PublicConsumerSources` optionally supplies trusted readonly content, routes, proofs, origin and relationship data for tests or repository editorial review. Defaults use the canonical registries. It is not a CMS parser, external-input validator, override of publication policy or mechanism for sending private enquiry data to clients.

## Shared governance and fragments

The adapters reuse `getPublicationEligibleContent` and the existing finite content dependency review; there is no second publication algorithm or circular import. That review enforces content/route approvals, page-type completeness, evidence/permissions, SEO, parent content and CTA/proof destinations. Complete published self-links and mutual CTA links are allowed. Missing approval, invalid references or incomplete dependency cycles cannot manufacture eligibility. Invalid registry data fails public results closed.

Navigation receives both the eligible-content predicate and a verified-fragment callback. Breadcrumb route validation receives the same callback. This fixes the former false rejection of routes whose primary CTA contains a verified section anchor. A fragment must be a syntax-valid section ID on eligible content with approved sections. Merely finding an anchor in draft data does not approve it. Invalid navigation fragments reject the candidate navigation rather than quietly emitting a broken link.

CTA handling delegates to the existing content-safe resolver, retaining enquiry selections, evidence and operational gates. Submit actions are not links and remain future server workflow work. Optional proof destinations stay optional; supplied published proof destinations require eligible route/content under M4.11 governance. External destinations are not represented by the existing contract and remain unpopulated.

Each adapter reviews the current readonly sources on invocation; no process-wide eligibility cache or mutable approval snapshot is introduced. There is no promise of measured runtime performance. Future rendering should avoid redundant calls and measure representative consumer cost before adding scoped memoization. Helper functions are module APIs, not serializable client props; future server components pass only the necessary public result data.

## Import-boundary regression guard

`public-consumers.test.mjs` inspects application TypeScript/JavaScript outside internal `lib/data` and `lib/domain`, excluding tests/generated/dependency directories. Literal imports, re-exports, dynamic imports and `require` calls into lower-level data modules fail the suite; the safe entry point and explicit type-only imports remain allowed. Synthetic violations test the guard itself. New public application consumers must keep this suite passing.

This is a regression gate, not a security sandbox or an ESLint configuration change. Run it during every relevant checkpoint; deliberately computed module specifiers and code outside the scanned source conventions require review. No production consumer exists yet. Later modules must not hide unsafe raw-data access behind a wrapper to bypass the boundary.

## Verification and remaining work

Run the seven Node integrity modules under `lib/data/*.test.mjs` directly, plus `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, `git diff --check` and scope/status checks. The new suite uses the existing installed TypeScript in-memory loader and Node built-ins, with clearly synthetic fixtures and the reserved `example.invalid` origin. No dependency, test framework or generated test file is added.

Installed Next.js 16 Server/Client Component and metadata guides were consulted: Server Components remain the default, client props must be serializable and metadata adapters belong on the server. This milestone emits no metadata, absolute canonicals, sitemap handler, robots rules, route or UI.

Content, commercial scope/pricing, mappings, production origin, proof/permissions, legal wording, provider choices and operational approvals remain TBF. Source approval references do not establish factual truth or actual enquiry delivery. Manual responsive/keyboard/accessibility/metadata/performance QA remains outstanding. M4 Final Re-audit, explicit checkpoint authorization and the M5.1 specification precede M5 development.

Historical M4.8/M4.9 documents describe their original route-only boundaries. This document and the current README/AGENTS describe the M4.12.1 public consumer contract; those historical milestone records are not rewritten.
