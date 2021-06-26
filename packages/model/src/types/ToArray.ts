export type ToArray<T> = {
  [key in keyof T]: any[];
};
