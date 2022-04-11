export interface PackageProps {
  name: string;
  version: string;
  license: string;
  description: string;
  created_at: string;
  updated_at: string;
  homepage: string | null;
  repository: string;
  downloads: number;
}
