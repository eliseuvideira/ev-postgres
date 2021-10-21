import { Knex } from "knex";

export type UpdateOne<T, Primary extends Partial<T>> = (
  database: Knex,
  primary: Primary,
  values: Partial<T>
) => Promise<T | null>;

export const createUpdateOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary
  ): UpdateOne<T, Primary> =>
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
