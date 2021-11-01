export const parseObject = (item: Record<string, any>) =>
  Object.keys({ ...item })
    .map((key) => `${key}: "${item[key]}"`)
    .join(", ");
