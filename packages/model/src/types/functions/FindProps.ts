import { Knex } from "knex";
import { FilterProps } from "../FilterProps";

export interface FindProps<T> {
  database: Knex;
  filter?: FilterProps<T>;
}
