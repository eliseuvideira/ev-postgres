import { createInsert } from "../../src/functions/createInsert";

describe("createInsert", () => {
  it("creates an insert method", async () => {
    expect.assertions(7);

    const table = "packages";

    const insert = createInsert({ table });

    const packages = [
      { name: "express", version: "4.17.1" },
      { name: "koa", version: "2.13.1" },
    ];

    const returning = jest.fn(() => packages);
    const insertFn = jest.fn(() => ({ returning }));
    const from = jest.fn(() => ({ insert: insertFn }));
    const database = { from } as any;

    const insertedItems = await insert({ database }, packages);

    expect(insertedItems).toEqual(packages);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(insertFn).toHaveBeenCalledTimes(1);
    expect(insertFn).toHaveBeenCalledWith(packages);
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});
