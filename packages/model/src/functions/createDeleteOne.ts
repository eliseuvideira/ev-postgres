import { Knex } from "knex";

export const createDeleteOne =
  <T>(table: string, primary: (item: Partial<T>) => Partial<T>) =>
  async (database: Knex, item: T) => {
    await database.from(table).where(primary(item)).delete();
  };
