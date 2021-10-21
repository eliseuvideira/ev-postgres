import { Knex } from "knex";

export type DeleteOne<T, Primary extends Partial<T>> = (
  database: Knex,
  primary: Primary
) => Promise<void>;

export const createDeleteOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary
  ): DeleteOne<T, Primary> =>
  async (database: Knex, primary: Primary) => {
    await database.from(table).where(_primary(primary)).delete();
  };
