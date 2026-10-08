import type {
  Decision,
  Industry,
  IndustryPackageRelationship,
  IndustryServiceRelationship,
} from "@/lib/domain";
import { parseSlug } from "@/lib/domain/helpers";

const tbf = Object.freeze({ state: "tbf" } as const);
const draftIndustryFields = {
  publication: Object.freeze({ status: "draft" } as const),
  description: tbf,
  problems: tbf,
  faqs: tbf,
  cta: tbf,
} as const;

/** Syntax validation does not grant publication or approve any relationship. */
function draftIndustry(rawSlug: string, name: string): Industry {
  const slug = parseSlug(rawSlug);
  if (slug === null) throw new Error(`Invalid industry inventory slug: ${rawSlug}`);
  return Object.freeze({
    ...draftIndustryFields,
    id: `industry:${slug}`,
    slug,
    name,
  });
}

/**
 * Canonical candidates in requirements v3.0 §6 order.
 * Slugs preserve M4.1 §17 / M4.2 §38; these are not public pages.
 */
export const industries: readonly Industry[] = Object.freeze([
  draftIndustry("healthcare", "Healthcare"),
  draftIndustry("real-estate", "Real Estate"),
  draftIndustry("home-services", "Home Services"),
  draftIndustry("ecommerce", "E-commerce"),
  draftIndustry("saas-ai-technology", "SaaS / AI / Technology"),
  draftIndustry("restaurants-franchises", "Restaurants / Franchises"),
  draftIndustry("legal", "Legal"),
  draftIndustry("education", "Education"),
  draftIndustry("finance", "Finance"),
  draftIndustry("automotive", "Automotive"),
  draftIndustry("b2b-professional-services", "B2B / Professional Services"),
]);

/** Unknown mappings are not approved empty lists or implicit all-to-all relevance. */
export const industryServiceRelationships:
  Decision<readonly IndustryServiceRelationship[]> = tbf;

/** Suitability is separate from package inclusion; no recommendation is approved. */
export const industryPackageRelationships:
  Decision<readonly IndustryPackageRelationship[]> = tbf;

/** Exact identity lookup, including drafts; callers must enforce publication gates. */
export function getIndustryById(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id);
}

/** No aliases, case folding, URL coercion or fallback industry. */
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
