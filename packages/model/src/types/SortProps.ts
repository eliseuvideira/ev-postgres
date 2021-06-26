export type SortProps<T> = {
  column: keyof T & string;
  order: "asc" | "desc";
};
