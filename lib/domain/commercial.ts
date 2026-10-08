import type { ApprovalReference, ScopedValue } from "./core";

/** No defaults: currency, finite nonnegative minor units and precision need validation. */
export type Money = Readonly<{
  amountMinor: number;
  currency: string;
  minorUnitDigits: number;
}>;

export type BillingBasis =
  | Readonly<{ kind: "one-time" }>
  | Readonly<{ kind: "recurring"; interval: string }>
  | Readonly<{ kind: "per-unit"; unit: string }>;

export type Pricing =
  | Readonly<{ state: "tbf"; note?: string }>
  | Readonly<{ state: "custom-quote"; note?: string }>
  | Readonly<{
      state: "approved";
      amount: Money;
      approvalReference: ApprovalReference;
    }>;

export type SetupFee =
  | Pricing
  | Readonly<{ state: "not-applicable"; reason: string }>;

export type Quantity = Readonly<{
  amount: number;
  unit: string;
  frequency: ScopedValue<string>;
}>;

export type Deliverable = Readonly<{
  id: `deliverable:${string}`;
  description: string;
  quantity: ScopedValue<Quantity>;
}>;

export type ScopeLimit =
  | Readonly<{ state: "tbf"; note?: string }>
  | Readonly<{ state: "custom"; note?: string }>
  | Readonly<{
      state: "approved";
      limit:
        | Readonly<{ kind: "maximum"; quantity: Quantity }>
        | Readonly<{ kind: "unlimited"; description: string }>;
      approvalReference: ApprovalReference;
    }>
  | Readonly<{ state: "not-applicable"; reason: string }>;

export type ExternalCostCategory =
  | "advertising-media-spend"
  | "third-party-tools"
  | "hosting"
  | "premium-assets"
  | "production"
  | "other-external";

export type ExternalCostTreatment =
  | Readonly<{ treatment: "separate"; pricing?: Pricing }>
  | Readonly<{
      treatment: "included";
      scope: string;
      approvalReference: ApprovalReference;
    }>;

/** Every offer must account for these categories; inclusion requires explicit approval. */
export type ExternalCosts = Readonly<
  Record<ExternalCostCategory, ExternalCostTreatment>
>;

export type OfferScope = Readonly<{
  deliverables: ScopedValue<readonly Deliverable[]>;
  limits: ScopedValue<readonly ScopeLimit[]>;
  inclusions: ScopedValue<readonly string[]>;
  exclusions: ScopedValue<readonly string[]>;
  timeline: ScopedValue<string>;
  reporting: ScopedValue<string>;
  support: ScopedValue<string>;
  clientResponsibilities: ScopedValue<readonly string[]>;
  terms: ScopedValue<string>;
}>;

export type CommercialTerms = Readonly<{
  pricing: Pricing;
  billingBasis: ScopedValue<BillingBasis>;
  setupFee: SetupFee;
  externalCosts: ExternalCosts;
  scope: OfferScope;
}>;
