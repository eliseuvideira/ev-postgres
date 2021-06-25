import { FindProps } from "../types/FindProps";
import { parseFilter } from "./parseFilter";

interface CreateFindProps {
  table: string;
}

export const createFind =
  <T>({ table }: CreateFindProps) =>
  async ({ database, filter = {} }: FindProps<T>) => {
    const rows: any[] = await database.from(table).modify(parseFilter(filter));

    const items: T[] = rows.map((item) => item);

    return items;
  };
