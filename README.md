# Swift Market LLC Website

This repository contains the official Swift Market LLC website application being developed for a U.S.-market digital growth, marketing, creative, web/app, AI/automation, and technology consultancy/services platform.

The MVP is consultation/enquiry/proposal-first, not ecommerce-first. It supports Startup, Growing Business, Enterprise, Individual Services, One-Time Projects, Add-ons, and agency/partnership opportunities.

## Project Status

- M0 environment/setup: complete.
- M1 Git/GitHub foundation: complete.
- M2 Next.js foundation: complete.
- M3 design-system foundation: preserved at the Step 0 checkpoint; rendered QA remains outstanding.
- MVP Requirements v3.0: approved.
- Step 0 synchronization/freeze: checkpoint `baf5213` complete.
- M4.1–M4.9: architecture and centralized data implemented at `4f0cafb`.
- M4.10: read-only audit returned PARTIAL; M4.11 addresses its verified publication defects. Its changes require validation and a separately authorized checkpoint.
- Production pages: not yet implemented.
- Current `/`: temporary internal `noindex` design-system preview.

The website is not production ready. Preserve the existing M3 foundation and approved architecture. All 53 route/content candidates remain draft and publication-ineligible; launch content, commercial and operational inputs remain TBF.

## Approved Product Baseline

- [AGENTS.md](AGENTS.md) defines engineering standards, agent instructions, scope discipline, and repository conventions.
- [MVP Requirements v3.0](docs/mvp-requirements-v3.0.md) defines approved product requirements, commercial architecture, acceptance requirements, and pending decisions.

Implementation must not silently override approved requirements. Resolve conflicts through explicit direction and separately authorized baseline updates.

## Technology Stack

| Technology | Current baseline |
| --- | --- |
| Next.js | 16.3.8, App Router |
| React / React DOM | 19.2.8 |
| TypeScript | Strict mode |
| Tailwind CSS | 4, CSS-first configuration |
| ESLint | Next.js Core Web Vitals and TypeScript rules |
| pnpm | 12.9.1 |
| Node.js | 24 development baseline |
| Version control | Git/GitHub |

## Local Development

With the approved Node.js and pnpm versions available, run these commands from the repository root. They work in PowerShell and other common shells:

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To check the application and run its production build locally:

```sh
pnpm lint
pnpm build
pnpm start
```

`pnpm start` requires a successful production build. These setup instructions do not authorize dependency changes during a scoped task.

## Runtime Convention

- `.node-version` records Node major version `24`.
- `package.json` declares `engines.node` as `>=24 <25`.
- `package.json` declares `packageManager` as `pnpm@12.9.1`.

The convention permits Node 24 patch releases. Hosting/runtime configuration remains TBF; no deployment runtime is established by these files.

## Environment Configuration

No runtime variables are currently required by application code. [`.env.example`](.env.example) documents future configuration categories without credentials or fabricated variable names. Provider/integration configuration remains **TBF (To Be Finalized)**.

When real configuration becomes necessary, copy the example to an uncommitted local environment file. In PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Never commit `.env.local` or other real environment files. The ignore policy protects `.env*` files and allows only `.env.example`. The example must never contain secrets.

Secrets must never use `NEXT_PUBLIC_`: those values are browser-visible and exposed/inlined at build time. Keep credentials server-only in uncommitted environment files or approved hosting secret storage. Separate development, preview, and production configuration. Production origin, email/receiving configuration, analytics, CRM, support/chatbot, spam protection, rate-limit persistence, and monitoring remain unresolved.

## Current Repository Structure

| Path | Current purpose |
| --- | --- |
| `app/` | App Router layout, global styles, temporary design-system page, accessible not-found page, and starter favicon |
| `public/` | Current static assets, including starter SVGs; production assets require approval |
| `docs/` | Approved MVP requirements, M4 architecture/data/publication references, and reusable QA checklist |
| `lib/domain/` | Shared public domain types/helpers and separately imported private enquiry contracts |
| `lib/data/` | Canonical draft registries, publication/integrity helpers and dependency-free tests |
| `AGENTS.md` | Engineering and agent rules |
| `README.md` | Repository setup, conventions, and delivery overview |
| `.env.example` | Non-secret environment documentation |
| `.gitattributes` | Text line-ending and binary asset policy |
| `.node-version` | Node major version convention |
| `package.json` | Scripts, dependencies, package manager, and runtime constraint |

Production components and integrations remain later milestone work.

## Publication Governance (M4.11)

`lib/data/content` is the public content eligibility boundary. `getContentReadiness`, `validateContentRegistry` and `getPublicationEligibleContent` share a two-pass review: independently verify content/route/evidence/SEO approvals, then remove candidates whose CTA, proof-detail or ancestor destinations lack eligible published content. The finite pruning pass allows complete published mutual links and self-links without recursive readiness calls. A self-link never grants missing approval. Approved-but-unpublished content may pass editorial readiness, but cannot resolve as a public destination.

M4.12.1 provides the public application entry point `lib/data/public-consumers`; use its route/content lookups, navigation, breadcrumb, CTA and sitemap-candidate adapters. They join route eligibility to the existing eligible-content review. The CTA adapter delegates to `content.resolvePublicationSafeCTA`; route-only `navigation.resolvePublicCTA` remains internal compatibility code. A published route alone is insufficient. Verified section anchors work across all adapters; unverified fragments fail closed. Submit actions are not link results. Existing contracts contain only internal destinations, so no external URL/provider or external publication rule is introduced. See [the safe consumer contract](docs/public-consumers.md) for APIs and import-boundary enforcement.

Proof destinations remain optional. When a published proof supplies an internal route reference, that route and its associated content must be eligible. Existing source, permission and factual-review requirements remain mandatory. CTA equivalence compares current semantic fields: kind, intent, label, destination/fragment, audit offer and selection context. Object property order is ignored; selection ID lists compare by membership, with duplicate/invalid IDs still rejected by integrity checks. Tracking properties do not exist in the current CTA contract and must not be invented.

All current candidates remain draft. These checks do not prove business truth, legal correctness, actual enquiry delivery or rendered QA. Supply verified content/origin and operational approvals before publication. Historical M4 documents describe earlier milestones; this section and current helpers describe the M4.11 refinements.

Run integrity suites with `node lib/data/services.test.mjs`, `node lib/data/industries.test.mjs`, `node lib/data/packages.test.mjs`, `node lib/data/relationships.test.mjs`, `node lib/data/routes.test.mjs` and `node lib/data/content.test.mjs`, alongside TypeScript, lint, build and whitespace checks. No test framework or package script is added.

Also run `node lib/data/public-consumers.test.mjs` for M4.12.1 consumer regressions and the public application import boundary. M4 Final Re-audit and a separately authorized Git checkpoint precede the M5.1 specification and M5 development; this consumer implementation creates no public pages.

## Design System Foundation

The approved initial mode is light, with white as the primary canvas, navy as primary typography, and red as an energetic accent/action color:

| Brand color | Value |
| --- | --- |
| Warm Red | `#FF4E45` |
| Outer Space | `#11182F` |
| Perfect White | `#FFFFFF` |

Use Neue Haas Grotesk only when legally licensed/available. Until approved font assets exist, the fallback stack remains valid: `"Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif`. No licensed font assets are bundled.

M3 lives primarily in `app/globals.css` (tokens, typography, spacing, responsive layouts, and interaction styles), `app/layout.tsx` (root document, metadata, light scheme, and skip link), and `app/page.tsx` (internal examples). The root preview remains temporary and `noindex`; source checks do not establish completion of rendered QA.

## Commercial Architecture

| Segment | Approved structure |
| --- | --- |
| Startup Business | Basic / Standard / Premium |
| Growing Business | Basic / Standard / Premium |
| Enterprise | Build Your Growth Stack; consultation-led custom scope and proposal |

Individual Services, One-Time Projects, Add-ons, and Agency/Partnership enquiries are also supported by the approved baseline. Ad/media spend and third-party paid tools or other external costs are separate unless explicitly included in an approved offer. Unknown commercial values remain TBF or Custom Quote. Detailed requirements belong in the approved product document.

## Development Workflow

1. Inspect the repository and current Git state.
2. Read `AGENTS.md`.
3. Read the approved requirements relevant to the task.
4. Consult relevant installed Next.js guidance in `node_modules/next/dist/docs/` before framework-sensitive implementation.
5. Implement only the authorized scope.
6. Preserve unrelated work, including uncommitted changes.
7. Run lint, build, and meaningful tests appropriate to the scope.
8. Inspect the diff, whitespace, and final Git state.
9. Report changed files, actual checks, limitations, and blockers.
10. Stage, commit, or push only when explicitly authorized.

## Quality Gates

Use [the QA checklist](docs/qa-checklist.md) for milestone evidence and launch verification. Recurring application engineering checks are:

```sh
pnpm lint
pnpm build
git diff --check
git status --short
git diff
```

Documentation-only tasks require content, encoding, whitespace, and scope review; lint/build need not be rerun unless warranted. No automated test script is currently defined. Later milestones require applicable browser, accessibility, SEO, performance, form/lead, security, and production QA. Record unrun checks as outstanding rather than passed.

## Git / Line Endings

`.gitattributes` defines the repository policy: automatically identified text files target LF, and listed binary assets remain binary. Do not broadly normalize existing files or change Git line-ending configuration without an explicit maintenance task. Review any line-ending warning against the actual diff and policy before taking action.

## Security Rules

- Keep secrets out of source control, documentation, client props, and logs.
- Never place secrets in `NEXT_PUBLIC_` variables.
- Future public forms require server-side validation and safe input handling.
- Spam protection and rate limiting must be verified before public production enquiries operate.
- Return safe errors without sensitive provider or system details.
- Provider selection, hosting details, and unresolved integrations remain TBF. Headers/CSP must be reviewed alongside approved integrations and deployment decisions.

## Planned Delivery

| Milestone | Planned scope |
| --- | --- |
| M4 | Architecture, route decisions, centralized typed content/data |
| M5 | Production homepage and core conversion UX |
| M6 | Services and packages |
| M7 | Industries and authority content |
| M8 | Enterprise, lead operations, enquiries, and chatbot as approved |
| M9 | SEO, analytics, security, and privacy |
| M10 | QA, performance verification, and deployment |
| M11 | Operational launch and verified ownership/workflows |

Accessibility, content integrity, security, and performance apply throughout implementation. This roadmap does not authorize starting later milestones.

## Contribution / Change Control

Respect the approved baseline and current authorized milestone. Never invent commercial facts, quantities, prices, claims, or provider decisions. TBF remains TBF until explicitly approved; launch-facing unknowns require approval, disclosure, omission, or deferral. Do not mix unrelated changes into milestone work. Preserve existing work and report conflicts before changing approved requirements.
