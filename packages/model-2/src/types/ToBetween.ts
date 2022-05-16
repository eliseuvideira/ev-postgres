export type ToBetween<T> = {
  [key in keyof T]: [Required<T[key]>, Required<T[key]>];
};
