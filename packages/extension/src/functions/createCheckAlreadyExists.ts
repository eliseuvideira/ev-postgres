import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";

export type CheckAlreadyExists<T> = (
  database: Knex,
  item: Partial<T>
) => Promise<void>;

export const createCheckAlreadyExists =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    alreadyExistsError: (alreadyExistingItem: T) => never
  ): CheckAlreadyExists<T> =>
  async (database, item) => {
    const existingItem = await Model.findOne(database, { $eq: { ...item } });

    if (existingItem) {
      alreadyExistsError(existingItem);
    }
  };
