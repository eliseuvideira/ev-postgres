import { createCount } from "../../src/functions/createCount";
import { PackageProps } from "../utils/PackageProps";

describe("createCount", () => {
  it("creates a count method", async () => {
    expect.assertions(8);

    const table = "packages";
    const pkgName = "knex";

    const count = createCount<PackageProps>({ table });

    const totalCount = Math.floor(Math.random() * 9999) + 1;

    const first = jest.fn(() => ({ count: totalCount }));
    const countFn = jest.fn(() => ({ first }));
    const andWhere = jest.fn();
    const builder = {
      andWhere,
    };
    const modify = jest.fn((modify) => {
      modify(builder);

      return { count: countFn };
    });
    const from = jest.fn(() => ({ modify }));

    const database = { from } as any;

    const value = await count({ database, filter: { $eq: { name: pkgName } } });

    expect(value).toBe(totalCount);
    expect(first).toHaveBeenCalledTimes(1);
    expect(countFn).toHaveBeenCalledTimes(1);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("name", "=", pkgName);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});
