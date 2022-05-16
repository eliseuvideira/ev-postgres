import { ToArray } from "./ToArray";
import { ToBetween } from "./ToBetween";
import { ToRegex } from "./ToRegex";

export interface FilterProps<T> {
  $eq?: Partial<T>;
  $like?: Partial<T>;
  $in?: ToArray<Partial<T>>;
  $regex?: ToRegex<Partial<T>>;
  $null?: (keyof T)[];
  $notnull?: (keyof T)[];
  $lt?: Partial<T>;
  $le?: Partial<T>;
  $gt?: Partial<T>;
  $ge?: Partial<T>;
  $between?: ToBetween<Partial<T>>;
}
