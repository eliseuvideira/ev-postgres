import { SortProps } from "./SortProps";

export interface FilterProps<T> {
  $eq?: Partial<T>;
  $limit?: number;
  $offset?: number;
  $sort?: SortProps<Partial<T>>[];
}
