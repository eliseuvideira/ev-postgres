import { Count, createCount } from "./createCount";
import { createDelete, Delete } from "./createDelete";
import { createDeleteOne, DeleteOne } from "./createDeleteOne";
import { createExists, Exists } from "./createExists";
import { createFind, Find } from "./createFind";
import { createFindById, FindById } from "./createFindById";
import { createFindOne, FindOne } from "./createFindOne";
import { createInsert, Insert } from "./createInsert";
import { createInsertOne, InsertOne } from "./createInsertOne";
import { createUpdate, Update } from "./createUpdate";
import { createUpdateOne, UpdateOne } from "./createUpdateOne";

export interface ModelProps<T, Primary extends Partial<T>> {
  table: string;
  find: Find<T>;
  findById: FindById<T, Primary>;
  findOne: FindOne<T>;
  count: Count<T>;
  exists: Exists<T>;
  insert: Insert<T>;
  insertOne: InsertOne<T>;
  update: Update<T>;
  updateOne: UpdateOne<T, Primary>;
  delete: Delete<T>;
  deleteOne: DeleteOne<T, Primary>;
}

export const createModel = <T, Primary extends Partial<T>>(
  table: string,
  primary: (item: Primary) => Primary
): ModelProps<T, Primary> => {
  const find = createFind<T>(table);
  const findById = createFindById<T, Primary>(table, primary);
  const findOne = createFindOne<T>(table);
  const count = createCount<T>(table);
  const exists = createExists<T>(count);
  const insert = createInsert<T>(table);
  const insertOne = createInsertOne<T>(table);
  const update = createUpdate<T>(table);
  const updateOne = createUpdateOne<T, Primary>(table, primary);
  const _delete = createDelete<T>(table);
  const deleteOne = createDeleteOne<T, Primary>(table, primary);

  return {
    table,
    find,
    findById,
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
