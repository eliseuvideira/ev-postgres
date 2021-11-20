import { ToArray } from "@ev-postgres/model/lib/types/ToArray";

export const merge = <T>(previous: ToArray<T>, current: T) => {
  const values = { ...previous };

  const keys = Object.keys(current) as (keyof T)[];

  for (const key of keys) {
    if (values[key]) {
      values[key].push(current[key]);
    } else {
      values[key] = [current[key]];
    }
  }

  return values;
};
