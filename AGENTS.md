<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Swift Market LLC project rules

## Scope and authority

These rules apply throughout this repository. Follow the user's current authorized scope and preserve unrelated work. Inspect the repository and relevant installed Next.js documentation before implementation; do not assume APIs or conventions from older versions. Keep the managed Next.js block above intact. `CLAUDE.md` delegates to this file.

For Step 0.5 synchronization, edit only this root `AGENTS.md`. Do not change application code, CSS, TSX, configuration, README, package manifests, lockfiles, or any other file; do not create files or install/update/remove packages. Do not stage, commit, push, restore, reset, or discard anything. Preserve the managed Next.js block exactly and preserve unrelated rules and uncommitted M3 work. The standards below govern subsequent authorized implementation; they do not authorize implementing later milestones now.

## Inspected repository baseline

At the foundation review, the repository is a create-next-app starter on `main`, with a clean working tree and latest commit `c779505` (`chore: initialize Swift Market Next.js application`). Recheck Git state before every task; this is a historical baseline, not an ongoing guarantee.

- `package.json`: Next.js 16.3.8, React and React DOM 19.2.8; pnpm 12.9.1. Installed Tailwind CSS is 4.3.3, TypeScript 5.9.3, and ESLint 9.39.5. Preserve installed versions and declared constraints.
- Scripts: `pnpm dev`, `pnpm lint` (ESLint), `pnpm build` (production build), and `pnpm start`. No test script is currently defined.
- `tsconfig.json`: strict mode, no emit, bundler module resolution, Next.js plugin, and root alias `@/*`. Generated Next.js route types are included.
- `next.config.ts`: typed starter configuration with no custom options.
- `eslint.config.mjs`: flat configuration using Next.js Core Web Vitals and TypeScript rules; generated output is ignored.
- `postcss.config.mjs` and `app/globals.css`: Tailwind v4 PostCSS integration, CSS-first `@import "tailwindcss"`, and `@theme inline`. Do not introduce legacy Tailwind configuration by habit.
- `app/layout.tsx`: root Server Component, generated `LayoutProps`, English document language, starter metadata, and Geist/Geist Mono through `next/font/google`.
- `app/page.tsx`: default starter homepage. `app/globals.css` still has starter colors and automatic system dark mode; these are not approved brand decisions.
- `public/`: five starter SVG assets; `app/favicon.ico` is also a starter asset. No licensed Neue Haas Grotesk files, approved brand assets, business content collections, reusable component system, lead backend, sitemap, or robots implementation are present.
- `README.md`: starter instructions. `.gitignore` excludes dependencies, build output, environment files, and generated types. `next-env.d.ts` is generated and must not be hand-edited.
- `pnpm-workspace.yaml`: build scripts for `sharp` and `unrs-resolver` are disabled. Preserve this policy unless an authorized task requires a reviewed change.
- `pnpm-lock.yaml` contains two YAML documents: package-manager tooling first and application dependencies second. Account for both during future dependency/reproducibility checks; do not rewrite it as part of this documentation task.
- `node_modules/` and `.next/` are installed/generated artifacts, not application source. Bundled Next.js project-structure, Server/Client Component, and CSS guides were consulted, and the agent-file generator was inspected to verify managed-block behavior.

## Current approved baseline and milestone status

MVP Requirements v3.0 are approved. The historical starter snapshot above records the initial inspection only; it does not supersede the current approved business, design, and delivery baseline below.

- M0 environment/setup, M1 Git/GitHub foundation, and M2 Next.js foundation are complete.
- M3 design-system foundation and the Step 0 repository checkpoint are preserved at `baf5213`. Rendered visual/accessibility QA remains outstanding; checkpoint completion does not establish production readiness.
- M4.1–M4.9 architecture and centralized data are implemented; the committed checkpoint is `4f0cafb`. M4.10 audited that checkpoint with a PARTIAL verdict. M4.11 refines the verified publication defects; recheck validation and Git state before treating its changes as a new checkpoint.
- The registries retain 22 service families, 11 industries, six package tiers, custom Enterprise, 53 routes and 53 content records. Current route/content records are draft and publication-ineligible; commercial/content/integration unknowns remain TBF.
- M3 uses approved centralized brand tokens, fluid typography, spacing, responsive containers/grids, visible focus states, reduced-motion handling, and the approved system fallback font stack. Google/Geist font loading and the starter automatic dark theme are no longer the active implementation.
- `app/layout.tsx` provides Swift Market metadata, `en-US`, light color scheme, and a skip link. `app/page.tsx` is an **internal temporary design-system preview**, not the production homepage; preserve its `noindex` until replaced by the production homepage.
- Lint and production build previously passed. Rendered visual/accessibility QA remains outstanding; do not claim it passed from source checks alone.
- Public M5 consumers must use `lib/data/content` publication eligibility and `resolvePublicationSafeCTA`. M4.8 route-only lookups/resolution remain architectural building blocks and do not establish content approval. Destination content, proof targets, ancestors, evidence, SEO and operational approvals must pass the shared content dependency review before public use. Verified section anchors are permitted; unverified fragments remain rejected.
- M4.12.1 centralizes public application access through `lib/data/public-consumers`. Use its safe route/content, navigation, breadcrumb, CTA and sitemap-candidate adapters; do not import raw data modules or route-only helpers into pages, components or application utilities. The public-consumer integrity suite checks this import boundary. Internal data modules and tests retain compatibility access. No M5 UI or publication is authorized by this layer.

## Business and conversions

Swift Market LLC is building a U.S.-market consultancy/services website covering digital growth, marketing, creative, web/app development, AI/automation, and technology solutions. Use professional U.S. English and clear, helpful, conversion-focused copy.

The primary MVP goal is a professional lead-generation, consultation, enquiry, and proposal-request platform. The conversion contract is:

Visitor discovers a service, industry, or package -> evaluates an appropriate solution -> selects or references a package/service -> submits a consultation/enquiry/proposal request -> Swift Market receives and manages the lead -> proposal and onboarding happen operationally.

The MVP is enquiry/proposal-first, not ecommerce-first. Do not implement online checkout or payment unless explicitly approved later.

Primary conversion paths are **Explore Services**, **Compare Packages**, **Request a Consultation**, **Request a Proposal**, and **Send a Project Brief**. Use clear CTA labels, destinations, and relevant next steps. Do not publish dead controls or claim a submission was received without a functioning backend.

Package structure:

| Business segment | Tiers |
| --- | --- |
| Startup Business | Basic, Standard, Premium |
| Growing Business | Basic, Standard, Premium |
| Enterprise | Consultation-led custom Build Your Growth Stack; custom proposal/quote |

The commercial structure also supports Individual Services, One-Time Projects, and Add-ons. Enterprise requirements/services are selected according to the client and support consultation and custom proposal creation; do not force enterprise users into one fixed predefined package.

Model segment and tier separately in typed data. Keep inclusions, exclusions, scope, billing cadence, and verified pricing consistent across cards, comparison tables, pages, and enquiry forms. Advertising/media spend is separate from management/service fees unless explicitly stated otherwise in an approved offer. Third-party paid tools, software subscriptions, hosting, premium assets, production costs, and other external costs are separate unless explicitly included in an approved offer. State these distinctions consistently in packages, comparisons, and proposals.

Never invent prices, setup fees, post quantities, campaign quantities, ad budgets, service limits, contract durations, turnaround times, guarantees, discounts, performance claims, deliverables, or contractual terms. Use **TBF / To Be Finalized / Custom Quote** where appropriate until approved data exists. Represent unknowns explicitly rather than filling them with fabricated defaults.

## Service and industry architecture

The centralized service architecture must be capable of supporting these families; this list does not authorize implementing every family immediately:

- Strategy & Consulting.
- SEO.
- Local SEO / Google Business Profile.
- AI Search / AEO / GEO.
- Authority / Digital PR.
- Paid Advertising / PPC.
- Platform-specific advertising.
- Social Media Management.
- Content Marketing.
- Branding & Graphic Design.
- Video / Creative Production.
- Website Design & Development.
- App / MVP Design & Development.
- Website Care / Maintenance.
- CRO.
- Email / SMS Marketing.
- CRM & Marketing Automation.
- AI Automation.
- B2B Marketing / Lead Generation.
- Analytics / Tracking / Reporting.
- Business Integrations.
- Enterprise Marketing / Growth Leadership.

Advertising/social channels may include Google, Meta, TikTok, YouTube, Snapchat, Spotify, and other approved channels according to client requirements. Do not treat channel names as evidence of partnerships, certifications, approved integrations, or inclusion in every offer.

Support scalable industry/niche targeting through shared architecture and centralized content/data, without duplicating the entire site. Priority/representative sectors are Healthcare; Real Estate; Home Services; E-commerce; SaaS / AI / Technology; Restaurants / Franchises; Legal; Education; Finance; Automotive; and B2B / Professional Services. Additional industries may be added through the centralized sources. An e-commerce client industry does not change this website's enquiry-first conversion model.

## Content, route intent, and data contracts

Production architecture is expected to support Home; About; Services and service detail; Plans / Packages, package detail, and package comparison; Enterprise; Industries and industry detail; Case Studies / Portfolio; Insights / Blog; Contact / Consultation / Proposal request; and Legal pages. Final route names and implementation belong to M4+ architecture decisions; do not fabricate business facts or legal policies to fill routes.

Services, packages, industries, deliverables, availability, add-ons, FAQs, and related commercial content must eventually use centralized typed data/content sources instead of duplicated hard-coded copies. Package/data models must support:

- Unique identifiers, segment/tier, and linked services.
- Deliverables, approved measurable quantities/frequency, and scope limits.
- Pricing/billing basis, setup fee where applicable, and external costs.
- Timeline where approved, reporting/support, and client responsibilities.
- Exclusions, add-ons, availability/status, and approved terms.
- TBF/custom values without fabricated defaults.

Build these models within the authorized architecture milestone. Preserve unknown values and the distinction between recurring packages, individual services, one-time projects, add-ons, and custom enterprise requirements.

## Brand and design system

Light mode is the approved initial website mode. Dark contrast sections may support the design; an optional full dark theme requires intentional scope and verification.

Approved core colors are **Warm Red #FF4E45**, **Outer Space #11182F**, and **Perfect White #FFFFFF**. Warm Red is primarily an energetic accent/action color, Outer Space/deep navy carries primary text and dark contrast, and Perfect White is the primary canvas. Keep these values centralized in semantic tokens; do not scatter hard-coded colors across components. Warm Red must not be assumed safe for arbitrary small text on white. Validate supporting colors and every relevant text/control state for contrast.

Centralize typography, spacing, container widths, grid gaps, radii, borders, focus styles, and motion tokens. Use semantic CSS variables and the existing Tailwind v4 CSS-first integration. Avoid scattering literal brand colors across components.

Preferred brand typeface: Neue Haas Grotesk only when legally/licensably available to the project. Do not download, bundle, redistribute, or fabricate font files. Until approved font assets are available, preserve the approved fallback stack: `"Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif`. Naming a locally available font does not grant redistribution rights. Any future approved asset integration must follow its license and installed Next.js guidance; retain fallbacks.

The site must feel premium, modern, energetic, balanced, aligned, breathable, professional, trustworthy, and conversion focused. Establish visual hierarchy through typography, whitespace, alignment, and restrained accent use. Avoid a generic agency-template appearance and do not fill every region with cards.

Avoid visual clutter, excessive gradients or shadows, unnecessary glassmorphism, excessive animations, scroll hijacking, autoplay background videos, fake counters, and unsupported performance claims.

## Stack and architecture

Preserve the existing Next.js App Router, React, TypeScript, Tailwind CSS, and package manager. Do not replace the framework or upgrade/downgrade dependencies without approval. Add packages only for a clear, justified need; prefer platform and CSS capabilities for simple functionality.

Use Server Components by default. Add `"use client"` only at the smallest practical boundary for state, event handlers, or browser APIs. Keep credentials, server validation, and integrations on the server. Read the relevant bundled guide before using routing, caching, metadata, images, fonts, forms, or other version-sensitive APIs, and heed deprecations.

Keep route files focused on composing sections and metadata. Extract cohesive reusable components and typed data instead of giant pages, repeated markup, or premature frameworks. Introduce directories only when needed, following areas such as:

- `components/layout` and `components/navigation` for shared shells, containers, header, menus, and footer.
- `components/ui`, `components/cards`, and `components/sections` for reusable primitives and composed content.
- `components/forms` and `components/seo` for inquiry interfaces and safe SEO helpers.
- `data` for verified service/package/navigation content and `lib` for focused utilities and server integrations.

Use the existing `@/*` alias consistently. Keep shared service and package definitions data driven, with stable identifiers and explicit types. Preserve working behavior and avoid unnecessary migration to another source-directory structure.

## TypeScript and code quality

Maintain strict TypeScript. Use explicit domain models, component props, integration boundaries, and validation result types; allow useful local inference. Avoid `any` unless technically unavoidable and documented. Treat external input as `unknown` and narrow or validate it before use. Do not silence compiler or lint errors to make checks pass.

Prefer simple, readable, maintainable code with focused responsibilities. Avoid duplicated markup, clever abstractions, speculative configuration, and dependencies for features easily implemented with the platform or CSS.

Prioritize progressive enhancement and clear conversion UX alongside semantic HTML, accessibility, mobile-first responsiveness, performance/Core Web Vitals, technical SEO, maintainability, security, balanced layout, purposeful restrained motion, and verified claims. Do not add heavy libraries merely for visual effects.

## Responsive layout

Build mobile-first for small phones, modern phones, tablets, laptops, desktops, and wide screens. Use a consistent max-width container and grid system, strong whitespace, readable line lengths, and fluid typography/spacing where appropriate. Let content determine breakpoints; avoid fixed-width assumptions and layouts that only work at selected breakpoints.

Check narrow screens, intermediate widths, large screens, long content, text zoom, navigation, package comparisons, and forms. Prevent unintended horizontal scrolling, clipped content, crowded controls, and oversized empty spaces. Keep conversion paths usable at every size.

## Accessibility

Target WCAG 2.2 AA principles throughout implementation and QA:

- Use semantic landmarks, logical headings, native links/buttons, and a skip link for repeated navigation.
- Support keyboard navigation with visible focus, logical tab order, and focus that is not obscured by sticky UI.
- Make menus accessible: named controls, accurate expanded state, appropriate keyboard behavior, and focus management for modal interactions.
- Give every form field an accessible label; associate instructions and validation messages with the field, and announce relevant status changes.
- Validate text and UI contrast, including focus, hover, disabled, and error states. Do not communicate meaning through color alone.
- Provide meaningful alternative text for content images; use empty alt text or appropriate hiding for decorative visuals.
- Respect reduced motion, support zoom/reflow, and provide usable touch targets.
- Use ARIA only when native semantics do not provide the required behavior.

Do not claim accessibility conformance based solely on automated checks; include manual keyboard and responsive review.

## Performance, images, and animation

Treat performance as a first-class requirement. Target good Core Web Vitals: LCP <= 2.5 seconds, INP <= 200 ms, and CLS <= 0.1. These are measurable goals, not results to claim before measurement; a successful build alone does not establish them.

Minimize client-side JavaScript and unnecessary dependencies. Keep noninteractive content server rendered. Optimize images, fonts, and third-party scripts; lazy-load noncritical assets. Reserve dimensions for images, embeds, and async UI to prevent layout shifts.

Use `next/image` where appropriate, following the installed version's guide for dimensions, responsive `sizes`, remote sources, and loading behavior. Avoid lazy-loading the likely LCP image; prioritize only assets justified by measurement. Use meaningful alt text and keep decorative imagery out of accessibility output. Use verified, licensed assets and avoid misleading representations of clients or staff.

Motion must support comprehension and polish. Prefer CSS for simple transitions, honor `prefers-reduced-motion`, and avoid scroll-jacking, heavy animation systems, and autoplay background video. Introduce an animation library only for a justified requirement.

## SEO and content integrity

Use Next.js metadata APIs. Every indexable page must have a unique title, unique meta description, canonical URL, descriptive H1, logical heading hierarchy, useful internal links, Open Graph metadata, appropriate truthful structured data, and crawlable semantic content.

Keep the verified production origin centralized for canonical and social URLs; do not invent a domain or deploy with localhost canonicals. Architecture must support `app/sitemap.ts`, `app/robots.ts`, service pages, industry pages, case studies, insights/articles, and breadcrumbs. Include only intended public canonical pages in sitemaps. Keep drafts and unverified placeholders out of production indexing; do not use robots directives as security controls.

Structured data must match visible, verified content. Never fabricate canonical production origins, structured business facts, reviews, ratings, case-study metrics, client logos, awards, addresses, phone numbers, social URLs, locations, or organization credentials. SEO implementation must use verified business information. Avoid keyword stuffing, doorway pages, fake locations, hidden text, and fabricated schema. Industry/location content must provide distinct verified value rather than duplicated keyword pages.

Never invent clients, reviews, testimonials, awards, certifications, partnerships, revenue, rankings, case-study metrics, years of experience, team members, or office locations. Do not publish fake client logos or certification badges. Use clearly marked placeholders when verified content is unavailable, track what needs confirmation, and resolve or omit placeholders before launch. Do not turn performance goals or hypothetical examples into claims of achieved results.

## Lead forms and integrations

Lead forms must eventually support server-side validation, accessible validation messages, spam protection, rate limiting, UTM attribution, landing-page attribution, email routing, success/error states, and a thank-you flow. Implement these as part of the authorized lead-system scope rather than pretending a prototype is production ready.

Future lead handling follows the enquiry/proposal-first operational workflow: **New -> Contacted -> Proposal Sent -> Won / Lost**. Assignment and internal notes may be added in the relevant milestone. Enterprise enquiries must preserve selected requirements/services for consultation and custom proposal creation. Do not invent providers, credentials, routing addresses, or integrations.

Validate field types, lengths, formats, and allowed values on the server; client validation is a usability aid. Treat attribution fields as untrusted input. Preserve useful entries after errors, prevent accidental duplicate submissions, and report success only after the intended delivery/persistence succeeds. Keep service/package selections consistent with shared data.

Use appropriate server-side spam/rate controls and minimize collection and logging of personal data. Route inquiries through configured server integrations. Never expose API keys, email credentials, or privileged configuration in client code or browser-visible environment variables. Document required environment-variable names without real values.

## Security

Never commit secrets or print them in logs, diffs, documentation, or tool output. Use environment variables, server-side validation, and least-privilege integration access. Never expose secrets through `NEXT_PUBLIC_*` variables or props sent to Client Components. Future provider/API/email credentials must remain server-only. Public forms require server-side validation, spam protection, abuse/rate-limit controls, and safe error handling before production use; do not invent providers or credentials.

Avoid unsafe HTML and untrusted `dangerouslySetInnerHTML`; validate and safely encode structured data and any content requiring HTML serialization. Review external URLs and dependencies for their concrete use. Do not introduce packages without a clear need or change build-script permissions casually. Preserve existing secret ignores and do not edit generated files by hand.

## Development and verification workflow

Before implementing a requested feature:

1. Inspect Git state, related existing files, configuration, and the current architecture.
2. Read the relevant guides in `node_modules/next/dist/docs/`, including deprecation notices for the installed version.
3. Plan the smallest maintainable change within the user's scope.
4. Reuse existing components, tokens, and verified content/data.
5. Preserve working behavior and unrelated changes.

For every milestone, implement only approved scope, run appropriate lint/type/build/tests, inspect the diff, and report changed files and actual validation. Do not commit or push unless explicitly authorized.

After meaningful application implementation:

1. Run `pnpm lint` and `pnpm build` using the installed tooling.
2. Fix errors introduced by the change before declaring completion. If an external/preexisting blocker prevents a check, report the precise blocker and the unverified outcome; do not mask failures or change dependencies without authorization.
3. Perform responsive, keyboard, form, metadata, and performance checks appropriate to the feature. Add focused tests for meaningful logic or risky behavior; do not create tests that simply mirror static markup.
4. Review the final diff for scope, secrets, fabricated content, and accidental generated-file changes.
5. Report what changed, what was verified, and any material remaining limitations.

For documentation-only work, verify content, the managed block, whitespace, and Git diff scope; lint and production builds are not required solely for changing this file. Do not report checks as passed unless they were actually run.

Do not perform destructive Git operations, force push, overwrite unrelated work, or delete working functionality without an explicit reason. Commit, publish, or deploy only within the user's authorized scope.

## Planned delivery sequence

The approved sequence supersedes the earlier general four-day checklist. Keep future enhancements from blocking MVP launch and do not implement a later milestone merely because its requirements are documented here.

| Stage | Scope |
| --- | --- |
| Step 0 | Repository synchronization/freeze |
| M4 | Architecture and centralized data |
| M5 | Core conversion UX / production homepage |
| M6 | Services and packages |
| M7 | Industries and authority content |
| M8 | Enterprise, lead operations, enquiry system, chatbot as approved |
| M9 | SEO, analytics, security/privacy integration |
| M10 | QA, performance, deployment |
| M11 | Operational launch |

Keep the MVP focused on verified content and working conversion paths. Before launch, replace starter identity/metadata and the internal preview, preserve approved brand tokens and verify font rights, confirm production configuration, verify enquiry delivery, and complete appropriate accessibility, responsive, SEO, and performance checks. Deferred enhancements must not become speculative launch dependencies.
