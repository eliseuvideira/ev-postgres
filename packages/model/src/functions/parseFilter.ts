import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { escapeLike } from "./escapeLike";

export const parseFilter =
  <T>(filter: FilterProps<T>) =>
  (builder: Knex.QueryBuilder): void => {
    if (filter.$eq) {
      const keys = Object.keys(filter.$eq) as (keyof T)[];
      for (const key of keys) {
        builder.andWhere(key, "=", filter.$eq[key] as any);
      }
    }
    if (filter.$in) {
      const keys = Object.keys(filter.$in);
      for (const key of keys) {
        builder.whereIn(key, filter.$in[key as keyof T]);
      }
    }
    if (filter.$like) {
      const keys = Object.keys(filter.$like) as (keyof T)[];
      for (const key of keys) {
        builder.andWhereRaw(`lower(unaccent(${key})) like lower(unaccent(?))`, [
          "%" + escapeLike(`${filter.$like[key as keyof T]}`) + "%",
        ]);
      }
    }
    if (filter.$regex) {
      const keys = Object.keys(filter.$regex);
      for (const key of keys) {
        const regex = filter.$regex[key as keyof T];
        builder.andWhere(
          key,
          regex.flags.includes("i") ? "~*" : "~",
          regex.source
        );
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
