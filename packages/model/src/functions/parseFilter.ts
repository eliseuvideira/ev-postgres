import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";

export const parseFilter =
  <T>(filter: FilterProps<T>) =>
  (builder: Knex.QueryBuilder): void => {
    if (filter.$eq) {
      const keys = Object.keys(filter.$eq) as (keyof T)[];
      for (const key of keys) {
        builder.andWhere(key, "=", filter.$eq[key] as any);
      }
    }
    if (filter.$limit) {
      builder.limit(filter.$limit);
    }
    if (filter.$offset) {
      builder.offset(filter.$offset);
    }
    if (filter.$sort) {
      builder.orderBy(filter.$sort);
    }
  };
