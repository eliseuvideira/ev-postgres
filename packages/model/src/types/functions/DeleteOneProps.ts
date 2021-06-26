import { Knex } from "knex";

export interface DeleteOneProps<T> {
  database: Knex;
  instance: Partial<T>;
}
