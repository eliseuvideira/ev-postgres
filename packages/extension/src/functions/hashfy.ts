import { escape } from "./escape";

export const hashfy = <T>(item: T) => {
  const identifier = Object.keys({ ...item })
    .map((key) => `${key}: "${escape(item[key as keyof T])}"`)
    .join(", ");

  return identifier;
};
