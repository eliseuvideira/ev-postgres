import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";

export type CheckExists<T> = (database: Knex, item: Partial<T>) => Promise<T>;

export const createCheckExists =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    checkExistsError: (item: Partial<T>) => never
  ): CheckExists<T> =>
  async (database, item) => {
    const existingItem = await Model.findOne(database, { $eq: { ...item } });

    if (!existingItem) {
      checkExistsError(item);
    }

    return existingItem;
  };
