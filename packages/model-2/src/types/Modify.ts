import { Knex } from "knex";

export type Modify = (query: Knex.QueryBuilder) => void;
