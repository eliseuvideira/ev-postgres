import { DeleteOneProps } from "../types/functions/DeleteOneProps";

interface CreateDeleteOneProps<T> {
  table: string;
  getPrimaryKey: (instance: Partial<T>) => Partial<T>;
}

export const createDeleteOne =
  <T>({ table, getPrimaryKey }: CreateDeleteOneProps<T>) =>
  async ({ database, instance }: DeleteOneProps<T>) => {
    await database.from(table).where(getPrimaryKey(instance)).delete();
  };
