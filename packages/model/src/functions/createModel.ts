import { Knex } from "knex";
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
  primary: (item: Primary) => Primary,
  query: (database: Knex) => Knex.QueryBuilder = (database) =>
    database.from(table)
): ModelProps<T, Primary> => {
  const find = createFind<T>(table, query);
  const findById = createFindById<T, Primary>(table, primary, query);
  const findOne = createFindOne<T>(table, query);
  const count = createCount<T>(table, query);
  const exists = createExists<T>(count);
  const insert = createInsert<T>(table, query);
  const insertOne = createInsertOne<T>(table, query);
  const update = createUpdate<T>(table, query);
  const updateOne = createUpdateOne<T, Primary>(table, primary, query);
  const _delete = createDelete<T>(table, query);
  const deleteOne = createDeleteOne<T, Primary>(table, primary, query);

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
