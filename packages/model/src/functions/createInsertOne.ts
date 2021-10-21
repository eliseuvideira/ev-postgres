import { Knex } from "knex";

export type InsertOne<T> = (database: Knex, item: T) => Promise<T>;

export const createInsertOne =
  <T>(table: string): InsertOne<T> =>
  async (database: Knex, item: T) => {
    const [row] = await database.from(table).insert(item).returning("*");

    return row as T;
  };
