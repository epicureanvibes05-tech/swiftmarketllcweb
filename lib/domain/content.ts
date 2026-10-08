import type {
  ContentId,
  Decision,
  ProofId,
  Publication,
  RouteId,
  Slug,
  SolutionReference,
  Timestamp,
} from "./core";
import type { CTA } from "./routes";

/** No evidence content may be described as verified without an approval reference. */
export type EvidenceVerification =
  | Readonly<{ status: "unverified" }>
  | Readonly<{
      status: "verified";
      sourceReference: string;
      publicationPermissionReference: string;
    }>;

type ProofContent = Readonly<{
  id: ProofId;
  kind: "case-study" | "testimonial" | "client-logo";
  title: Decision<string>;
  content: Decision<string>;
  assetPath?: string;
  routeId?: RouteId;
  relatedEntities: readonly SolutionReference[];
}>;

export type Proof = ProofContent & (
  | Readonly<{
      publication: Exclude<Publication, { status: "published" }>;
      verification: EvidenceVerification;
    }>
  | Readonly<{
      publication: Extract<Publication, { status: "published" }>;
      verification: Extract<EvidenceVerification, { status: "verified" }>;
    }>
);

export type ContentRecord = Readonly<{
  id: ContentId;
  kind: "article" | "guide" | "topic" | "company" | "legal";
  slug: Slug;
  publication: Publication;
  routeId?: RouteId;
  title: Decision<string>;
  summary: Decision<string>;
  body: Decision<string>;
  author?: Decision<string>;
  modifiedAt?: Timestamp;
  relatedEntities: readonly SolutionReference[];
  proofIds: readonly ProofId[];
  cta: Decision<CTA>;
}>;
