import { FindProps } from "../types/FindProps";

interface CreateFindProps {
  table: string;
}

export const createFind =
  <T>({ table }: CreateFindProps) =>
  async ({ database }: FindProps) => {
    const rows = await database.from(table);

    const items: T[] = rows.map((item) => item);

    return items;
  };
