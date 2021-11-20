import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";

export type UpdateOneOrThrowError<T, TPrimary> = (
  database: Knex,
  item: TPrimary,
  values: Partial<T>
) => Promise<T>;

export const createUpdateOneOrThrowError =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    updateOneError: (item: TPrimary, values: Partial<T>) => never
  ): UpdateOneOrThrowError<T, TPrimary> =>
  async (database, item, values) => {
    const foundItem = await Model.updateOne(
      database,
      { ...item },
      { ...values }
    );

    if (!foundItem) {
      updateOneError(item, values);
    }

    return foundItem;
  };
