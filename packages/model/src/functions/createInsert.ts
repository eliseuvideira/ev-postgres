import { Knex } from "knex";

export const createInsert =
  <T>(table: string) =>
  async (database: Knex, items: T[]) => {
    const rows = await database.from(table).insert(items).returning("*");

    return rows as T[];
  };
