import { Knex } from "knex";

export type FindById<T, Primary extends Partial<T>> = (
  database: Knex,
  primary: Primary
) => Promise<T | null>;

export const createFindById =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): FindById<T, Primary> =>
  async (database: Knex, primary: Primary) => {
    const row: any = await query(database).where(_primary(primary)).first();

    if (!row) {
      return null;
    }

    return row as T;
  };
