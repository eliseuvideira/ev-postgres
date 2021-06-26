import { PackageProps } from "./PackageProps";

export const fields = [
  "name",
  "version",
  "license",
  "description",
  "created_at",
  "updated_at",
  "homepage",
  "repository",
  "downloads",
] as (keyof PackageProps)[];
