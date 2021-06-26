import { Knex } from "knex";
import { FilterProps } from "../FilterProps";

export interface DeleteProps<T> {
  database: Knex;
  filter?: Omit<Omit<Omit<FilterProps<T>, "$limit">, "$offset">, "$sort">;
}
