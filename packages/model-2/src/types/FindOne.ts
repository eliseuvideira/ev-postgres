import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { Modify } from "./Modify";

export interface FindOneProps<Props> {
  database: Knex;
  filter?: FilterProps<Props>;
  modify?: Modify;
}

export type FindOne<Props> = ({
  database,
  filter,
  modify,
}: FindOneProps<Props>) => Promise<Props | null>;
