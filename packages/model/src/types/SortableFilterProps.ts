import { FilterProps } from "./FilterProps";
import { ToSort } from "./ToSort";

export interface SortableFilterProps<T> extends FilterProps<T> {
  $limit?: number;
  $offset?: number;
  $sort?: ToSort<Partial<T>>[];
}
