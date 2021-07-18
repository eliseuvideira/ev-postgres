import { Knex } from "knex";

export const createUpdateOne =
  <T>(table: string, primary: (item: Partial<T>) => Partial<T>) =>
  async (
    database: Knex,
    item: Partial<T>,
    values: Partial<T>
  ): Promise<T | null> => {
    const [row]: any[] = await database
      .from(table)
      .where(primary(item))
      .update(values)
      .returning("*");

    if (!row) {
      return null;
    }

    return row as T;
  };
