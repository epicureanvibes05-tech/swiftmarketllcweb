import type {
  AddOnId,
  Availability,
  Decision,
  PackageId,
  PackageSegment,
  PackageTier,
  PartnershipId,
  ProjectId,
  Publication,
  RouteId,
  ServiceId,
  Slug,
} from "./core";
import type { CommercialTerms, OfferScope } from "./commercial";
import type { CTA } from "./routes";
import type { FAQ } from "./services";

type OfferIdentity<Id extends string> = Readonly<{
  id: Id;
  slug: Slug;
  name: string;
  publication: Publication;
  availability: Availability;
  routeId?: RouteId;
  positioning: Decision<string>;
  targetCustomer: Decision<string>;
  objective: Decision<string>;
  commercial: CommercialTerms;
  faqs: Decision<readonly FAQ[]>;
  cta: Decision<CTA>;
}>;

export type PackageFor<S extends PackageSegment, T extends PackageTier> =
  OfferIdentity<PackageId<S, T>> & Readonly<{
    kind: "package";
    segment: S;
    tier: T;
  }>;

export type Package = {
  [S in PackageSegment]: {
    [T in PackageTier]: PackageFor<S, T>;
  }[PackageTier];
}[PackageSegment];

/** A complete catalog requires three specific records for each specific segment. */
export type PackageCatalog = {
  readonly [S in PackageSegment]: {
    readonly [T in PackageTier]: PackageFor<S, T>;
  };
};

export type PackageServiceRelationship =
  | Readonly<{
      kind: "included";
      packageId: PackageId;
      serviceId: ServiceId;
      scope: OfferScope;
      approvalReference: string;
    }>
  | Readonly<{
      kind: "excluded" | "related";
      packageId: PackageId;
      serviceId: ServiceId;
      explanation: Decision<string>;
    }>;

export type OneTimeProject = OfferIdentity<ProjectId> & Readonly<{
  kind: "one-time-project";
  services: Decision<readonly ServiceId[]>;
}>;

export type AddOn = OfferIdentity<AddOnId> & Readonly<{
  kind: "add-on";
  services: Decision<readonly ServiceId[]>;
}>;

export type EnterpriseOffering = Readonly<{
  kind: "enterprise";
  segment: "enterprise";
  tier?: never;
  routeId: "route:enterprise";
  name: string;
  publication: Publication;
  availability: Availability;
  serviceOptions: Decision<readonly ServiceId[]>;
  scoping: "consultation-led";
  pricing: Readonly<{ state: "custom-quote"; note?: string }>;
  externalCosts: CommercialTerms["externalCosts"];
  scope: OfferScope;
  cta: Decision<CTA>;
}>;

export type PartnershipOffering = Readonly<{
  id: PartnershipId;
  kind: "agency-partnership";
  publication: Publication;
  routeId: "route:partnerships";
  description: Decision<string>;
  collaborationOptions: Decision<readonly string[]>;
  terms: Decision<string>;
  cta: Decision<CTA>;
}>;
