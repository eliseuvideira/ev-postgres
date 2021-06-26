import { UpdateOneProps } from "../types/UpdateOneProps";

interface CreateUpdateOneProps<T> {
  table: string;
  getPrimaryKey: (instance: Partial<T>) => Partial<T>;
}

export const createUpdateOne =
  <T>({ table, getPrimaryKey }: CreateUpdateOneProps<T>) =>
  async (
    { database, instance }: UpdateOneProps<T>,
    values: Partial<T>
  ): Promise<T | null> => {
    const [row]: any[] = await database
      .from(table)
      .where(getPrimaryKey(instance))
      .update(values)
      .returning("*");

    if (!row) {
      return null;
    }

    return row as T;
  };
