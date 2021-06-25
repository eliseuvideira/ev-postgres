import { createCount } from "./createCount";
import { createFind } from "./createFind";
import { createFindOne } from "./createFindOne";

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
  const findOne = createFindOne<T>({ table });
  const count = createCount<T>({ table });

  return {
    table,
    fields,
    find,
    findOne,
    count,
  };
};
