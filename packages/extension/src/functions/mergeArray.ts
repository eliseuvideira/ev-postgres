import { ToArray } from "@ev-postgres/model/lib/types/ToArray";
import { merge } from "./merge";

export const mergeArray = <T>(items: T[]) => {
  const item = items.reduce(
    (prev, curr) => merge<T>(prev, curr),
    {} as ToArray<T>
  );

  return item;
};
