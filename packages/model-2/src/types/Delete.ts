import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { Modify } from "./Modify";

export interface DeleteProps<Props> {
  database: Knex;
  filter?: FilterProps<Props>;
  modify?: Modify;
}

export type Delete<Props> = ({
  database,
  filter,
  modify,
}: DeleteProps<Props>) => Promise<void>;
