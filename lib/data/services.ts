import type {
  ExternalCosts,
  Service,
  ServiceFamily,
  ServiceFamilySlug,
} from "@/lib/domain";

/**
 * Approved taxonomy only. Source: MVP requirements v3.0 §5;
 * slugs: information architecture §9. Draft data is not publishable content.
 */
const tbf = Object.freeze({ state: "tbf" } as const);
const draftFamilyFields = {
  publication: Object.freeze({ status: "draft" } as const),
  availability: "tbf",
  targetSegments: tbf,
  content: Object.freeze({
    shortDescription: tbf,
    fullDescription: tbf,
    category: tbf,
    problemsSolved: tbf,
    process: tbf,
    intendedOutcomes: tbf,
    faqs: tbf,
    cta: tbf,
  }),
  scope: Object.freeze({
    deliverables: tbf,
    limits: tbf,
    inclusions: tbf,
    exclusions: tbf,
    timeline: tbf,
    reporting: tbf,
    support: tbf,
    clientResponsibilities: tbf,
    terms: tbf,
  }),
} as const;

/** Mapped keys ensure complete taxonomy coverage and correlated identity/slug pairs. */
const familyRecords = {
  "strategy-consulting": {
    ...draftFamilyFields,
    id: "family:strategy-consulting",
    slug: "strategy-consulting",
    name: "Strategy & Consulting",
  },
  "seo": {
    ...draftFamilyFields,
    id: "family:seo",
    slug: "seo",
    name: "SEO",
  },
  "local-seo-google-business-profile": {
    ...draftFamilyFields,
    id: "family:local-seo-google-business-profile",
    slug: "local-seo-google-business-profile",
    name: "Local SEO / Google Business Profile",
  },
  "ai-search-aeo-geo": {
    ...draftFamilyFields,
    id: "family:ai-search-aeo-geo",
    slug: "ai-search-aeo-geo",
    name: "AI Search / AEO / GEO",
  },
  "authority-digital-pr": {
    ...draftFamilyFields,
    id: "family:authority-digital-pr",
    slug: "authority-digital-pr",
    name: "Authority / Digital PR",
  },
  "paid-advertising-ppc": {
    ...draftFamilyFields,
    id: "family:paid-advertising-ppc",
    slug: "paid-advertising-ppc",
    name: "Paid Advertising / PPC",
  },
  "platform-advertising": {
    ...draftFamilyFields,
    id: "family:platform-advertising",
    slug: "platform-advertising",
    name: "Platform-specific advertising",
  },
  "social-media-management": {
    ...draftFamilyFields,
    id: "family:social-media-management",
    slug: "social-media-management",
    name: "Social Media Management",
  },
  "content-marketing": {
    ...draftFamilyFields,
    id: "family:content-marketing",
    slug: "content-marketing",
    name: "Content Marketing",
  },
  "branding-graphic-design": {
    ...draftFamilyFields,
    id: "family:branding-graphic-design",
    slug: "branding-graphic-design",
    name: "Branding & Graphic Design",
  },
  "video-creative-production": {
    ...draftFamilyFields,
    id: "family:video-creative-production",
    slug: "video-creative-production",
    name: "Video / Creative Production",
  },
  "website-design-development": {
    ...draftFamilyFields,
    id: "family:website-design-development",
    slug: "website-design-development",
    name: "Website Design & Development",
  },
  "app-mvp-design-development": {
    ...draftFamilyFields,
    id: "family:app-mvp-design-development",
    slug: "app-mvp-design-development",
    name: "App / MVP Design & Development",
  },
  "website-care-maintenance": {
    ...draftFamilyFields,
    id: "family:website-care-maintenance",
    slug: "website-care-maintenance",
    name: "Website Care / Maintenance",
  },
  "cro": {
    ...draftFamilyFields,
    id: "family:cro",
    slug: "cro",
    name: "CRO",
  },
  "email-sms-marketing": {
    ...draftFamilyFields,
    id: "family:email-sms-marketing",
    slug: "email-sms-marketing",
    name: "Email / SMS Marketing",
  },
  "crm-marketing-automation": {
    ...draftFamilyFields,
    id: "family:crm-marketing-automation",
    slug: "crm-marketing-automation",
    name: "CRM & Marketing Automation",
  },
  "ai-automation": {
    ...draftFamilyFields,
    id: "family:ai-automation",
    slug: "ai-automation",
    name: "AI Automation",
  },
  "b2b-marketing-lead-generation": {
    ...draftFamilyFields,
    id: "family:b2b-marketing-lead-generation",
    slug: "b2b-marketing-lead-generation",
    name: "B2B Marketing / Lead Generation",
  },
  "analytics-tracking-reporting": {
    ...draftFamilyFields,
    id: "family:analytics-tracking-reporting",
    slug: "analytics-tracking-reporting",
    name: "Analytics / Tracking / Reporting",
  },
  "business-integrations": {
    ...draftFamilyFields,
    id: "family:business-integrations",
    slug: "business-integrations",
    name: "Business Integrations",
  },
  "enterprise-marketing-growth-leadership": {
    ...draftFamilyFields,
    id: "family:enterprise-marketing-growth-leadership",
    slug: "enterprise-marketing-growth-leadership",
    name: "Enterprise Marketing / Growth Leadership",
  },
} as const satisfies {
  readonly [S in ServiceFamilySlug]: Extract<ServiceFamily, { slug: S }>;
};

/** One canonical record per family, in approved baseline order. */
export const serviceFamilies: readonly ServiceFamily[] = Object.freeze(
  Object.values(familyRecords).map((family) => Object.freeze(family)),
);

/**
 * No independently approved child service identities/parent mappings are supplied.
 * Empty means no records populated yet; it does not mean approved absence of services.
 */
export const services: readonly Service[] = Object.freeze([]);

/**
 * Baseline cost treatment, not an offer or price.
 * Any approved inclusion must be explicitly represented in the relevant future offer.
 */
export const serviceExternalCosts = Object.freeze({
  "advertising-media-spend": Object.freeze({ treatment: "separate" } as const),
  "third-party-tools": Object.freeze({ treatment: "separate" } as const),
  hosting: Object.freeze({ treatment: "separate" } as const),
  "premium-assets": Object.freeze({ treatment: "separate" } as const),
  production: Object.freeze({ treatment: "separate" } as const),
  "other-external": Object.freeze({ treatment: "separate" } as const),
}) satisfies ExternalCosts;

/** Exact lookups: no aliases, normalization or fallback to a different family. */
export function getServiceFamilyById(id: string): ServiceFamily | undefined {
  return serviceFamilies.find((family) => family.id === id);
}

export function getServiceFamilyBySlug(slug: string): ServiceFamily | undefined {
  return serviceFamilies.find((family) => family.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getServicesByFamily(familyId: string): readonly Service[] {
  return services.filter((service) => service.familyId === familyId);
}
