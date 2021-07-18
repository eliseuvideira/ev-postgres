import { Knex } from "knex";

export const createInsertOne =
  <T>(table: string) =>
  async (database: Knex, item: T) => {
    const [row] = await database.from(table).insert(item).returning("*");

    return row as T;
  };
