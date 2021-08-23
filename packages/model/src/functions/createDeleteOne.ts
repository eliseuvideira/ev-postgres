import { Knex } from "knex";

export const createDeleteOne =
  <T, Primary extends Partial<T>>(
    table: string,
    _primary: (item: Primary) => Primary
  ) =>
  async (database: Knex, primary: Primary) => {
    await database.from(table).where(_primary(primary)).delete();
  };
