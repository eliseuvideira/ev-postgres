import { Knex } from "knex";

export type Insert<T> = (database: Knex, items: T[]) => Promise<T[]>;

export const createInsert =
  <T>(table: string): Insert<T> =>
  async (database: Knex, items: T[]) => {
    if (items.length === 0) {
      return [];
    }

    const rows = await database.from(table).insert(items).returning("*");

    return rows as T[];
  };
