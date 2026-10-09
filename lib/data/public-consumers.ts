import type { CTA, Decision, NavigationGroup, Proof, RouteDefinition } from "@/lib/domain";
import { parseSlug } from "@/lib/domain/helpers";
import { content, getPublicationEligibleContent, proofs, resolvePublicationSafeCTA } from "@/lib/data/content";
import type { PageContent } from "@/lib/data/content";
import { filterPublicNavigation, navigationGroups } from "@/lib/data/navigation";
import { relationshipRegistry } from "@/lib/data/relationships";
import type { RelationshipRegistry } from "@/lib/data/relationships";
import { getPublicRouteById, getRouteByPath, getSitemapRoutes, resolveBreadcrumbs, routes, siteOrigin } from "@/lib/data/routes";
import type { BreadcrumbResult, RouteFragmentValidator } from "@/lib/data/routes";

/** Trusted readonly repository data only; never CMS input or private lead payloads. */
export type PublicConsumerSources = Readonly<{
  content?: readonly PageContent[];
  routes?: readonly RouteDefinition[];
  proofs?: readonly Proof[];
  origin?: Decision<string>;
  relationships?: RelationshipRegistry;
}>;

function sources(input: PublicConsumerSources) {
  return { content: input.content ?? content, routes: input.routes ?? routes,
    proofs: input.proofs ?? proofs, origin: input.origin ?? siteOrigin,
    relationships: input.relationships ?? relationshipRegistry };
}
/** Reuse the existing dependency review; no separate publication algorithm or shared cache. */
function view(input: PublicConsumerSources) {
  const data = sources(input);
  const eligible = new Map<string, PageContent>(getPublicationEligibleContent(data.content, data.routes, data.proofs, data.origin, data.relationships)
    .map((record) => [record.routeId, record]));
  const fragmentExists: RouteFragmentValidator = (id, fragment) => {
    const record = eligible.get(id);
    return parseSlug(fragment) !== null && record?.sections.state === "approved"
      && record.sections.value.some((section) => section.id === fragment);
  };
  const routeById = (id: string) => eligible.has(id)
    ? getPublicRouteById(id, data.routes, data.relationships, fragmentExists) : undefined;
  return { data, eligible, fragmentExists, routeById };
}

export function getPublicationSafeRouteById(id: string, input: PublicConsumerSources = {}): RouteDefinition | undefined {
  return view(input).routeById(id);
}
export function getPublicationSafeRouteByPath(path: string, input: PublicConsumerSources = {}): RouteDefinition | undefined {
  const checked = view(input);
  const route = getRouteByPath(path, checked.data.routes);
  return route ? checked.routeById(route.id) : undefined;
}
export function getPublicationSafeContentByRouteId(id: string, input: PublicConsumerSources = {}): PageContent | undefined {
  const checked = view(input);
  const route = checked.routeById(id);
  return route ? checked.eligible.get(route.id) : undefined;
}
export function resolvePublicationSafeConsumerCTA(cta: CTA, input: PublicConsumerSources = {}) {
  const data = sources(input);
  if (!cta.label.trim()) return undefined;
  return resolvePublicationSafeCTA(cta, data.content, data.routes, data.proofs, data.origin, data.relationships);
}
export function getPublicationSafeNavigation(groups: readonly NavigationGroup[] = navigationGroups, input: PublicConsumerSources = {}): readonly NavigationGroup[] {
  const checked = view(input);
  return filterPublicNavigation(groups, checked.data.routes, checked.data.relationships,
    checked.fragmentExists, (id) => checked.eligible.has(id));
}
export function getPublicationSafeBreadcrumbs(id: string, input: PublicConsumerSources = {}): BreadcrumbResult {
  const checked = view(input);
  const result = resolveBreadcrumbs(id, checked.data.routes, "public", checked.data.relationships, checked.fragmentExists);
  if (result.state === "invalid") return result;
  return result.items.every((item) => checked.eligible.has(item.routeId)) ? result
    : Object.freeze({ state: "invalid", reason: "unpublished" });
}
/** Candidates only: no sitemap handler, absolute URL or guessed origin is emitted. */
export function getPublicationSafeSitemapRoutes(input: PublicConsumerSources = {}): readonly RouteDefinition[] {
  const checked = view(input);
  return Object.freeze(getSitemapRoutes(checked.data.routes, checked.data.origin, checked.data.relationships, checked.fragmentExists)
    .filter((route) => checked.eligible.has(route.id)));
}
