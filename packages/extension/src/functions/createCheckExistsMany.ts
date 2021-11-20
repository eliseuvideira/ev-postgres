import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";
import { mergeArray } from "./mergeArray";

export type CheckExistsMany<T> = (
  database: Knex,
  items: Partial<T>[]
) => Promise<T[]>;

export const createCheckExistsMany =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    checkExistsManyError: (items: Partial<T>[]) => never,
    key: (item: Partial<T>) => string
  ): CheckExistsMany<T> =>
  async (database, items) => {
    const existingItems = await Model.find(database, {
      $in: mergeArray(items),
    });

    const existingItemsMap = new Map(
      existingItems.map((item) => [key(item), item])
    );

    const missingItems = items.filter(
      (item) => !existingItemsMap.has(key(item))
    );

    if (missingItems.length) {
      checkExistsManyError(missingItems);
    }

    return existingItems;
  };
