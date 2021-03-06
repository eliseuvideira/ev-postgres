import { createCount } from "../../src/functions/createCount";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createCount", () => {
  it("creates a count method", async () => {
    expect.assertions(9);

    const pkg = sample();

    const count = createCount<PackageProps>(table);

    const totalCount = Math.floor(Math.random() * 9999) + 1;

    const first = jest.fn(() => ({ count: totalCount }));
    const countFn = jest.fn(() => ({ first }));
    const andWhere = jest.fn();
    const builder = {
      andWhere,
    };
    const clearSelect = jest.fn(() => ({ count: countFn }));
    const modify = jest.fn((modify) => {
      modify(builder);

      return { clearSelect };
    });
    const from = jest.fn(() => ({ modify }));

    const database = { from } as any;

    const value = await count(database, { $eq: { name: pkg.name } });

    expect(value).toBe(totalCount);
    expect(first).toHaveBeenCalledTimes(1);
    expect(countFn).toHaveBeenCalledTimes(1);
    expect(clearSelect).toHaveBeenCalledTimes(1);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("name", "=", pkg.name);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});
