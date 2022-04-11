import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { Modify } from "./Modify";

export interface CountProps<Props> {
  database: Knex;
  filter?: FilterProps<Props>;
  modify?: Modify;
}

export type Count<Props> = ({
  database,
  filter,
  modify,
}: CountProps<Props>) => Promise<number>;
