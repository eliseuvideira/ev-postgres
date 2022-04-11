import { ModelProps } from "../types/Model";
import { Source } from "../types/Source";
import { Strip } from "../types/Strip";
import { createCount } from "./createCount";
import { createDelete } from "./createDelete";
import { createDeleteOne } from "./createDeleteOne";
import { createExists } from "./createExists";
import { createFind } from "./createFind";
import { createFindById } from "./createFindById";
import { createFindOne } from "./createFindOne";
import { createInsert } from "./createInsert";
import { createInsertOne } from "./createInsertOne";
import { createUpdate } from "./createUpdate";
import { createUpdateOne } from "./createUpdateOne";

export interface CreateModelProps<Primary> {
  source: Source;
  strip: Strip<Primary>;
}

export const createModel = <Props, Primary extends Partial<Props>>({
  source,
  strip,
}: CreateModelProps<Primary>): ModelProps<Props, Primary> => {
  const find = createFind<Props>({ source });
  const findById = createFindById<Props, Primary>({ source, strip });
  const findOne = createFindOne<Props>({ source });
  const count = createCount<Props>({ source });
  const exists = createExists<Props>({ count });
  const insert = createInsert<Props>({ source });
  const insertOne = createInsertOne<Props>({ source });
  const update = createUpdate<Props>({ source });
  const updateOne = createUpdateOne<Props, Primary>({ source, strip });
  const _delete = createDelete<Props>({ source });
  const deleteOne = createDeleteOne<Props, Primary>({ source, strip });

  return {
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
