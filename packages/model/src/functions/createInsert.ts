import { InsertProps } from "../types/functions/InsertProps";

interface CreateInsertProps {
  table: string;
}

export const createInsert =
  <T>({ table }: CreateInsertProps) =>
  async ({ database }: InsertProps, items: T[]) => {
    const rows = await database.from(table).insert(items).returning("*");

    return rows as T[];
  };
