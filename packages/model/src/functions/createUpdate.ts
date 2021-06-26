import { UpdateProps } from "../types/functions/UpdateProps";
import { parseFilter } from "./parseFilter";

interface CreateUpdateProps {
  table: string;
}

export const createUpdate =
  <T>({ table }: CreateUpdateProps) =>
  async ({ database, filter = {} }: UpdateProps<T>, values: Partial<T>) => {
    const rows: any[] = await database
      .from(table)
      .modify(parseFilter(filter))
      .update(values)
      .returning("*");

    return rows as T[];
  };
