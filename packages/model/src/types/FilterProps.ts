import { PropsToSortField } from "./PropsToSortField";

export interface FilterProps<T> {
  $eq?: Partial<T>;
  $limit?: number;
  $offset?: number;
  $sort?: PropsToSortField<Partial<T>>[];
}
