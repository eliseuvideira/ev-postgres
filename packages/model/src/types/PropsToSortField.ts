export type PropsToSortField<T> = {
  column: keyof T & string;
  order: "asc" | "desc";
};
