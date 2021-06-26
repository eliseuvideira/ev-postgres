export interface PackageProps {
  package_id?: number;
  name: string;
  version: string;
  license: string;
  description: string;
  created_at: string;
  updated_at: string;
  homepage: string;
  repository: string;
  downloads: number;
}
