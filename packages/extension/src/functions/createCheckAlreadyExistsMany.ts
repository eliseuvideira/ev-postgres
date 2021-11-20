import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";
import { mergeArray } from "./mergeArray";

export type CheckAlreadyExistsMany<T> = (
  database: Knex,
  items: Partial<T>[]
) => Promise<void>;

export const createCheckAlreadyExistsMany =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    alreadyExistsManyError: (alreadyExistingItems: T[]) => never
  ): CheckAlreadyExistsMany<T> =>
  async (database, items) => {
    const existingItems = await Model.find(database, {
      $in: mergeArray(items),
    });

    if (existingItems.length) {
      alreadyExistsManyError(existingItems);
    }
  };
