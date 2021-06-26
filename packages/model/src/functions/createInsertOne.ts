import { InsertProps } from "../types/InsertProps";

interface CreateInsertOneProps {
  table: string;
}

export const createInsertOne =
  <T>({ table }: CreateInsertOneProps) =>
  async ({ database }: InsertProps, item: T) => {
    const [row] = await database.from(table).insert(item).returning("*");

    return row as T;
  };
