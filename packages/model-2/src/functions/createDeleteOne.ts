import { DeleteOne, DeleteOneProps } from "../types/DeleteOne";
import { Strip } from "../types/Strip";
import { Source } from "../types/Source";

export interface CreateDeleteOneProps<Primary> {
  source: Source;
  strip: Strip<Primary>;
}

export const createDeleteOne =
  <Props, Primary extends Partial<Props>>({
    source,
    strip,
  }: CreateDeleteOneProps<Primary>): DeleteOne<Primary> =>
  async ({
    database,
    id: id,
    modify,
  }: DeleteOneProps<Primary>): Promise<void> => {
    const query = source(database).where(strip(id));

    if (modify) {
      query.modify(modify);
    }

    await query.delete();
  };
