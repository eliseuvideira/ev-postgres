import { createCount } from "./createCount";
import { createDelete } from "./createDelete";
import { createExists } from "./createExists";
import { createFind } from "./createFind";
import { createFindOne } from "./createFindOne";
import { createInsert } from "./createInsert";
import { createInsertOne } from "./createInsertOne";
import { createUpdate } from "./createUpdate";
import { createUpdateOne } from "./createUpdateOne";

interface CreateModelProps<T> {
  table: string;
  fields: (keyof T & string)[];
  getPrimaryKey: (instance: Partial<T>) => Partial<T>;
}

export const createModel = <T>({
  table,
  fields,
  getPrimaryKey,
}: CreateModelProps<T>) => {
  const find = createFind<T>({ table });
  const findOne = createFindOne<T>({ table });
  const count = createCount<T>({ table });
  const exists = createExists<T>(count);
  const insert = createInsert<T>({ table });
  const insertOne = createInsertOne<T>({ table });
  const update = createUpdate<T>({ table });
  const updateOne = createUpdateOne<T>({ table, getPrimaryKey });
  const _delete = createDelete<T>({ table });

  return {
    table,
    fields,
    find,
    findOne,
    count,
    exists,
    insert,
    insertOne,
    update,
    updateOne,
    delete: _delete,
  };
};
