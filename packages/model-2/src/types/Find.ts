import { Knex } from "knex";
import { Modify } from "./Modify";
import { SortableFilterProps } from "./SortableFilterProps";

export interface FindProps<Props> {
  database: Knex;
  filter?: SortableFilterProps<Props>;
  modify?: Modify;
}

export type Find<Props> = ({
  database,
  filter,
  modify,
}: FindProps<Props>) => Promise<Props[]>;
