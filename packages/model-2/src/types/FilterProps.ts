import { ToArray } from "./ToArray";
import { ToBetween } from "./ToBetween";
import { ToRegex } from "./ToRegex";

export interface FilterProps<Props> {
  $eq?: Partial<Props>;
  $like?: Partial<Props>;
  $in?: ToArray<Partial<Props>>;
  $regex?: ToRegex<Partial<Props>>;
  $null?: (keyof Props)[];
  $notnull?: (keyof Props)[];
  $lt?: Partial<Props>;
  $le?: Partial<Props>;
  $gt?: Partial<Props>;
  $ge?: Partial<Props>;
  $between?: ToBetween<Partial<Props>>;
}
