import { Knex } from "knex";
import { FilterProps } from "./FilterProps";

export interface FindOneProps<T> {
  database: Knex;
  filter?: Omit<Omit<Omit<FilterProps<T>, "$limit">, "$offset">, "$sort">;
}
