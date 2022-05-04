import { createCount } from "../../src/functions/createCount";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createCount", () => {
  it("creates a count method", async () => {
    expect.assertions(9);

    const pkg = sample();

    const count = createCount<PackageProps>({
      source: (database) => database.from(table),
    });

    const totalCount = Math.floor(Math.random() * 9999) + 1;

    const first = jest.fn(() => ({ count: totalCount }));
    const countFn = jest.fn(() => ({ first }));
    const clearSelect = jest.fn(() => ({ count: countFn }));
    const andWhere = jest.fn();
    const builder = {
      andWhere,
    };
    const modify = jest.fn((modify) => {
      modify(builder);
    });
    const from = jest.fn(() => ({ modify, clearSelect }));

    const database = { from } as any;

    const value = await count({
      database,
      filter: {
        $eq: {
          name: pkg.name,
        },
      },
    });

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
