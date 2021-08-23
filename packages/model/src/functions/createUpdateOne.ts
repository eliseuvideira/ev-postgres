import { Knex } from "knex";

export const createUpdateOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary
  ) =>
  async (
    database: Knex,
    primary: Primary,
    values: Partial<T>
  ): Promise<T | null> => {
    const [row]: any[] = await database
      .from(table)
      .where(_primary(primary))
      .update(values)
      .returning("*");

    if (!row) {
      return null;
    }

    return row as T;
  };
