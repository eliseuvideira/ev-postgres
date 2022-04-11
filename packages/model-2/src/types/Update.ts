import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { Modify } from "./Modify";

export interface UpdateProps<Props> {
  database: Knex;
  filter: FilterProps<Props>;
  values: Partial<Props>;
  modify?: Modify;
}

export type Update<Props> = ({
  database,
  filter,
  values,
  modify,
}: UpdateProps<Props>) => Promise<Props[]>;
