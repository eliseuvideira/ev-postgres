import { Knex } from "knex";

export interface UpdateOneProps<T> {
  database: Knex;
  instance: Partial<T>;
}
