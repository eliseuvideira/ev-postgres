import { Knex } from "knex";

export const createFindById =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary
  ) =>
  async (database: Knex, primary: Primary) => {
    const row: any = await database
      .from(table)
      .where(_primary(primary))
      .first();

    if (!row) {
      return null;
    }

    return row as T;
  };
