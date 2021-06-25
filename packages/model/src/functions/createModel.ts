import { createFind } from "./createFind";

interface CreateModelProps<T> {
  table: string;
  fields: (keyof T & string)[];
  getPrimaryKey: (instance: T) => Partial<T>;
}

export const createModel = <T>({
  table,
  fields,
  getPrimaryKey,
}: CreateModelProps<T>) => {
  getPrimaryKey;

  const find = createFind<T>({ table });

  return {
    table,
    fields,
    find,
  };
};
