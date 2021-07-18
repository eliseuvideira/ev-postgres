import { ToArray } from "./ToArray";
import { ToRegex } from "./ToRegex";

export interface FilterProps<T> {
  $eq?: Partial<T>;
  $like?: Partial<T>;
  $in?: ToArray<Partial<T>>;
  $regex?: ToRegex<Partial<T>>;
  $null?: (keyof T)[];
  $notnull?: (keyof T)[];
}
