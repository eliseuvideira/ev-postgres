import { createCount } from "./createCount";
import { createDelete } from "./createDelete";
import { createDeleteOne } from "./createDeleteOne";
import { createExists } from "./createExists";
import { createFind } from "./createFind";
import { createFindOne } from "./createFindOne";
import { createInsert } from "./createInsert";
import { createInsertOne } from "./createInsertOne";
import { createUpdate } from "./createUpdate";
import { createUpdateOne } from "./createUpdateOne";

export const createModel = <T>(
  table: string,
  primary: (item: Partial<T>) => Partial<T>
) => {
  const find = createFind<T>(table);
  const findOne = createFindOne<T>(table);
  const count = createCount<T>(table);
  const exists = createExists<T>(count);
  const insert = createInsert<T>(table);
  const insertOne = createInsertOne<T>(table);
  const update = createUpdate<T>(table);
  const updateOne = createUpdateOne<T>(table, primary);
  const _delete = createDelete<T>(table);
  const deleteOne = createDeleteOne<T>(table, primary);

  return {
    table,
    find,
    findOne,
    count,
    exists,
    insert,
    insertOne,
    update,
    updateOne,
    delete: _delete,
    deleteOne,
  };
};
