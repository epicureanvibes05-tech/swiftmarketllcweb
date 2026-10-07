# Swift Market LLC — Website QA Checklist

This is a reusable milestone and pre-launch verification checklist, not a current QA report. All items start unchecked. Apply A at every development checkpoint, B to each implemented page/feature, and C–G to the relevant specialist checks. H is the pre-launch gate; I is the post-deployment smoke check.

Record evidence, environment, and limitations in the result template. Mark inapplicable checks N/A with a reason and unrun checks NOT RUN; neither means passed. Documentation-only changes require content, encoding, whitespace, and scope review rather than unnecessary application builds. Future integrations are checked when approved and implemented. Accessibility review does not automatically establish certification or conformance.

## A. Every Development Checkpoint

### Scope / Change Control

- [ ] Authorized scope followed; no unrelated implementation included.
- [ ] `AGENTS.md` reviewed.
- [ ] Approved MVP requirements relevant to the task reviewed.
- [ ] Unrelated and uncommitted work preserved.
- [ ] No invented TBF values or commercial/business facts.
- [ ] Changed files reviewed against the authorized list.

### Code Quality

- [ ] `pnpm lint` completed when applicable; result recorded.
- [ ] `pnpm build` completed when applicable; result recorded.
- [ ] TypeScript/build errors absent for applicable application changes.
- [ ] `git diff --check` completed for the authorized changes.
- [ ] `git diff` reviewed; new/untracked file contents reviewed separately.
- [ ] `git status --short` reviewed.
- [ ] No unexpected generated or tracked files introduced.
- [ ] Documentation is accurate, readable, correctly encoded, and linked to current sources.

### Dependency Safety

- [ ] No unintended package/dependency changes.
- [ ] Any lockfile changes justified and within authorized scope.
- [ ] Framework-sensitive implementation checked against relevant installed Next.js documentation where applicable.

## B. Page / Feature QA

### Functional

- [ ] Navigation reaches intended destinations.
- [ ] Internal/external links work and have clear destinations.
- [ ] CTAs follow the approved conversion journey.
- [ ] Forms function end-to-end when present.
- [ ] Loading, success, and error states are accurate and recoverable.
- [ ] Validation handles missing, invalid, and boundary inputs.
- [ ] No dead controls or false claims of submission receipt.

### Responsive

Use representative categories, not claims of exact device certification. Example widths follow the approved baseline.

- [ ] Small mobile reviewed (for example, 320px).
- [ ] Large mobile reviewed (for example, 375px).
- [ ] Tablet reviewed (for example, 768px).
- [ ] Laptop reviewed (for example, 1024px).
- [ ] Desktop reviewed (for example, 1440px).
- [ ] Wide desktop reviewed (for example, 1920px).
- [ ] Intermediate widths and long content reviewed.
- [ ] No unintended horizontal overflow or clipped content.
- [ ] Typography remains readable at each category.
- [ ] Spacing remains efficient on mobile and breathable at larger widths.
- [ ] Grids/cards collapse gracefully without device-specific hacks.
- [ ] Navigation remains usable across widths.
- [ ] Forms remain readable and usable where implemented.

### Accessibility

- [ ] Semantic landmarks present, including main content and fallback pages.
- [ ] Heading hierarchy is logical and descriptive.
- [ ] Keyboard navigation works with logical order and no traps.
- [ ] Focus is visible and unobscured; modal/menu focus behavior reviewed when present.
- [ ] Skip link works and reaches the main-content target.
- [ ] Fields have accessible labels and instructions.
- [ ] Controls and links have clear accessible names.
- [ ] Errors are associated with fields; relevant status changes are announced.
- [ ] Text, controls, and interaction states meet applicable contrast requirements; meaning is not conveyed by color alone.
- [ ] Reduced-motion preference is respected.
- [ ] Zoom/reflow and touch targets remain usable.
- [ ] Content images have meaningful alt text when images exist.
- [ ] Decorative images are handled appropriately.
- [ ] Manual keyboard/browser review complements automated checks; evidence and limitations recorded.

### Content

- [ ] Spelling and grammar reviewed in professional U.S. English.
- [ ] Production content has no unintended placeholders or lorem ipsum; internal previews are clearly identified.
- [ ] No fabricated claims, metrics, testimonials, or business facts.
- [ ] No accidental TBF values presented as final offers; unresolved production content approved, disclosed, omitted, or deferred.
- [ ] CTA language and destinations are consistent.
- [ ] Package/service naming agrees with centralized approved content.
- [ ] Legal/business facts verified against approved sources.

### Visual / UX

- [ ] Alignment and container widths are consistent.
- [ ] Spacing rhythm is consistent.
- [ ] Typography hierarchy is clear; primary headings are solid navy without decorative outlines.
- [ ] Layout is breathable with controlled reading width.
- [ ] Cards, where useful, are consistent; borders/shadows remain restrained.
- [ ] Primary/secondary/disabled button states are distinguishable and accessible.
- [ ] Hover, focus, and active states are visible and consistent.
- [ ] Motion is restrained and purposeful where present.
- [ ] Asset dimensions reserve space; no obvious sizing-related layout shifts.

## C. SEO QA

- [ ] Indexable pages have unique descriptive titles.
- [ ] Meta descriptions are unique and accurate.
- [ ] Canonicals use the verified production origin when configured; no localhost or invented URLs.
- [ ] Index/noindex intent is deliberate; internal previews remain noindex until replaced.
- [ ] Heading hierarchy supports meaningful page structure.
- [ ] Internal links are semantic and descriptive.
- [ ] Navigation is crawlable.
- [ ] Sitemap includes intended public canonical routes only.
- [ ] Robots behavior agrees with indexing intent; it is not treated as access control.
- [ ] Open Graph/social metadata matches verified content and assets.
- [ ] Structured data uses verified facts and matches visible content.
- [ ] Breadcrumbs implemented and verified where appropriate.
- [ ] Service/industry internal linking supports relevant discovery.
- [ ] No accidental duplicate, thin, or doorway pages.

## D. Performance QA

- [ ] Production build tested in a representative environment.
- [ ] Images optimized with appropriate formats/dimensions.
- [ ] Responsive image sizing reviewed.
- [ ] Noncritical assets lazy-loaded where appropriate; likely LCP assets handled intentionally.
- [ ] Unnecessary Client Components avoided.
- [ ] Unnecessary third-party JavaScript avoided.
- [ ] Font loading, licensing, and fallbacks reviewed.
- [ ] Animation performance reviewed where motion exists.
- [ ] Core Web Vitals measured on representative production-like pages before launch; conditions and limitations recorded.
- [ ] Results compared with approved targets (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1); no invented score targets or achieved results.

## E. Forms / Lead QA

Apply when enquiry/lead handling is implemented; missing implementation is not a passing result.

- [ ] Required fields enforced and clearly indicated.
- [ ] Server-side type, format, and length validation tested.
- [ ] Untrusted values sanitized/handled safely, including selections and attribution.
- [ ] Spam protection tested, including accessible failure/recovery behavior.
- [ ] Rate limiting tested with approved persistence and hosting behavior.
- [ ] Success state corresponds to actual receipt.
- [ ] Failure state is accurate, safe, and recoverable.
- [ ] Duplicate submission handling verified where appropriate.
- [ ] Email/internal notification delivery verified.
- [ ] Source/attribution captured only where approved.
- [ ] Package/service context carried into the enquiry and validated.
- [ ] No credentials or secrets exposed client-side.
- [ ] Sensitive information minimized in collection, logs, and notifications.

## F. Security / Privacy QA

- [ ] No secrets committed or included in documentation/tool output.
- [ ] No secrets exposed through `NEXT_PUBLIC_`, client props, or browser bundles.
- [ ] Development, preview, and production environment configuration separated.
- [ ] Production transport uses HTTPS.
- [ ] Headers/CSP reviewed once hosting and integrations are known; required behavior remains functional.
- [ ] Error responses do not expose sensitive internals or raw provider failures.
- [ ] Dependencies reviewed for relevant security risks; changes require authorization.
- [ ] Privacy/legal pages reviewed and approved before launch.
- [ ] Data collection matches disclosed purpose and approved consent requirements.
- [ ] Retention/CRM policies and operational access verified once approved.

## G. Analytics QA

Apply once the provider, events, and privacy behavior are approved. Distinguish intent, attempts, successful receipt, and qualified leads; avoid submitted messages and unnecessary personal data.

- [ ] Page views verified.
- [ ] CTA events verified.
- [ ] Package interest/comparison behavior verified where approved.
- [ ] Service interest verified.
- [ ] Consultation start verified.
- [ ] Consultation submission verified, including success/failure distinctions.
- [ ] Proposal start verified.
- [ ] Proposal submission verified, including success/failure distinctions.
- [ ] Enterprise enquiry tracking verified.
- [ ] Conversion attribution verified across relevant journeys.
- [ ] Web Vitals reporting verified where approved.
- [ ] No duplicate events.
- [ ] Consent/privacy behavior reviewed where applicable.

## H. Pre-Launch QA

- [ ] Production domain/origin verified.
- [ ] Required environment variables configured securely for production.
- [ ] Real receiving email tested with actual test enquiries.
- [ ] Approved integrations tested end-to-end.
- [ ] All production routes and conversion paths tested.
- [ ] 404 behavior, semantics, and skip link tested.
- [ ] Sitemap contents and availability tested.
- [ ] Robots contents and indexing behavior tested.
- [ ] Canonical URLs tested against the verified origin.
- [ ] Social previews tested.
- [ ] Favicon/assets verified for identity, rights, and delivery.
- [ ] Mobile and representative browser smoke tests completed.
- [ ] Accessibility review completed; material issues resolved and evidence recorded.
- [ ] Performance measured; material findings addressed.
- [ ] Security/privacy review completed.
- [ ] Backup/recovery and rollback path understood and documented for approved infrastructure.
- [ ] Authorized Git production checkpoint exists and is traceable to the deployment.
- [ ] TBF content audit completed; unknowns approved, disclosed, omitted, or deferred.

## I. Post-Deployment Smoke QA

- [ ] Homepage loads and presents approved production content.
- [ ] Primary navigation works.
- [ ] Important service/package/industry routes work.
- [ ] Contact/enquiry flow reaches the intended operational process.
- [ ] Enterprise flow works.
- [ ] 404 response and page behavior work.
- [ ] HTTPS works without mixed content.
- [ ] Canonical host behavior matches approved deployment settings.
- [ ] Sitemap/robots available and correct.
- [ ] Analytics event smoke test completed where approved.
- [ ] Email notification smoke test completed.
- [ ] Console/network errors reviewed.
- [ ] Responsive smoke test completed.
- [ ] Monitoring/error reporting checked when implemented.

## QA Result Template

Copy this template for each checkpoint. Leave results unfilled until verified. For individual checks use PASS, FAIL, NOT RUN, or N/A with evidence/reason. The overall result must reflect known issues and blockers.

| Field | Record |
| --- | --- |
| Date |  |
| Milestone |  |
| Commit | Include commit identifier and any uncommitted changes tested |
| Environment | Include URL/runtime/build details as applicable; no secrets |
| Tester |  |
| Lint |  |
| Build |  |
| Functional |  |
| Responsive |  |
| Accessibility |  |
| SEO |  |
| Performance |  |
| Security |  |
| Forms/Leads |  |
| Analytics |  |
| Known Issues | Include evidence, impact, and follow-up |
| Blockers |  |
| Result | Choose PASS / PASS WITH NOTES / FAIL after review |
