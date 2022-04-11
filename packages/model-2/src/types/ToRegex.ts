export type ToRegex<T> = {
  [key in keyof T]: RegExp;
};
