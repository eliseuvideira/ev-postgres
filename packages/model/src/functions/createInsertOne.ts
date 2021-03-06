import { Knex } from "knex";

export type InsertOne<T> = (database: Knex, item: T) => Promise<T>;

export const createInsertOne =
  <T>(
    table: string,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): InsertOne<T> =>
  async (database: Knex, item: T) => {
    const [row] = await query(database).insert(item).returning("*");

    return row as T;
  };
