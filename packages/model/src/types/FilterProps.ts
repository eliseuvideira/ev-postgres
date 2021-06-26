import { ToArray } from "./ToArray";
import { ToRegex } from "./ToRegex";
import { ToSort } from "./ToSort";

export interface FilterProps<T> {
  $eq?: Partial<T>;
  $limit?: number;
  $offset?: number;
  $sort?: ToSort<Partial<T>>[];
  $like?: Partial<T>;
  $in?: ToArray<Partial<T>>;
  $regex?: ToRegex<Partial<T>>;
}
