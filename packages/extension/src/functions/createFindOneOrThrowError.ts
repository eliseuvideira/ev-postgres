import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";

export type FindOneOrThrowError<T> = (
  database: Knex,
  item: Partial<T>
) => Promise<T>;

export const createFindOneOrThrowError =
  <T, TPrimary>(
    Model: ModelProps<T, TPrimary>,
    findOneError: (item: Partial<T>) => never
  ): FindOneOrThrowError<T> =>
  async (database, item) => {
    const foundItem = await Model.findOne(database, { $eq: { ...item } });

    if (!foundItem) {
      findOneError(item);
    }

    return foundItem;
  };
