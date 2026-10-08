import type { PackageSegment, PackageTier, Slug } from "./core";

/** No coercion/default tier; unknown input remains rejected. */
export function isPackageSegment(value: unknown): value is PackageSegment {
  return value === "startup" || value === "growing-business";
}

export function isPackageTier(value: unknown): value is PackageTier {
  return value === "basic" || value === "standard" || value === "premium";
}

/** Syntax only; namespace reservations, uniqueness and publication need registry checks. */
export function parseSlug(value: unknown): Slug | null {
  if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    return null;
  }
  return value as Slug;
}
