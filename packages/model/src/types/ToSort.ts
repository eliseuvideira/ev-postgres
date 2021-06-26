export type ToSort<T> = {
  column: keyof T & string;
  order: "asc" | "desc";
};
