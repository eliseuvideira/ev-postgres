import { Knex } from "knex";

export type UpdateOne<T, Primary extends Partial<T>> = (
  database: Knex,
  primary: Primary,
  values: Partial<T>
) => Promise<T | null>;

export const createUpdateOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): UpdateOne<T, Primary> =>
  async (
    database: Knex,
    primary: Primary,
    values: Partial<T>
  ): Promise<T | null> => {
    const [row]: any[] = await query(database)
      .where(_primary(primary))
      .update(values)
      .returning("*");

    if (!row) {
      return null;
    }

    return row as T;
  };
