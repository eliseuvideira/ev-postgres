import { Knex } from "knex";
import { FilterProps } from "./FilterProps";

export interface UpdateProps<T> {
  database: Knex;
  filter?: Omit<Omit<Omit<FilterProps<T>, "$limit">, "$offset">, "$sort">;
}
