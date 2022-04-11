import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { Modify } from "./Modify";

export interface ExistsProps<Props> {
  database: Knex;
  filter?: FilterProps<Props>;
  modify?: Modify;
}

export type Exists<Props> = ({
  database,
  filter,
  modify,
}: ExistsProps<Props>) => Promise<boolean>;
