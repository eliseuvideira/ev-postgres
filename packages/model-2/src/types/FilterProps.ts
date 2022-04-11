import { ToArray } from "./ToArray";
import { ToRegex } from "./ToRegex";

export interface FilterProps<Props> {
  $eq?: Partial<Props>;
  $like?: Partial<Props>;
  $in?: ToArray<Partial<Props>>;
  $regex?: ToRegex<Partial<Props>>;
  $null?: (keyof Props)[];
  $notnull?: (keyof Props)[];
}
