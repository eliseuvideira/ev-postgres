import { InsertOneProps } from "../types/InsertOneProps";

interface CreateInsertOneProps {
  table: string;
}

export const createInsertOne =
  <T>({ table }: CreateInsertOneProps) =>
  async ({ database }: InsertOneProps, item: T) => {
    const [row] = await database.from(table).insert(item).returning("*");

    return row as T;
  };
