import { Knex } from "knex";

export type DeleteOne<T, Primary extends Partial<T>> = (
  database: Knex,
  primary: Primary
) => Promise<void>;

export const createDeleteOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): DeleteOne<T, Primary> =>
  async (database: Knex, primary: Primary) => {
    await query(database).where(_primary(primary)).delete();
  };
