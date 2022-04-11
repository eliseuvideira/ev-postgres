import { Count } from "./Count";
import { Delete } from "./Delete";
import { DeleteOne } from "./DeleteOne";
import { Exists } from "./Exists";
import { Find } from "./Find";
import { FindById } from "./FindById";
import { FindOne } from "./FindOne";
import { Insert } from "./Insert";
import { InsertOne } from "./InsertOne";
import { Update } from "./Update";
import { UpdateOne } from "./UpdateOne";

export interface ModelProps<Props, Primary extends Partial<Props>> {
  find: Find<Props>;
  findById: FindById<Props, Primary>;
  findOne: FindOne<Props>;
  count: Count<Props>;
  exists: Exists<Props>;
  insert: Insert<Props>;
  insertOne: InsertOne<Props>;
  update: Update<Props>;
  updateOne: UpdateOne<Props, Primary>;
  delete: Delete<Props>;
  deleteOne: DeleteOne<Primary>;
}
