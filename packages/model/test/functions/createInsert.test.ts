import { createInsert } from "../../src/functions/createInsert";
import { PackageProps } from "../utils/PackageProps";
import { packages } from "../utils/packages";
import { table } from "../utils/table";

describe("createInsert", () => {
  it("creates an insert method", async () => {
    expect.assertions(7);

    const insert = createInsert<PackageProps>(table);

    const returning = jest.fn(() => packages);
    const insertFn = jest.fn(() => ({ returning }));
    const from = jest.fn(() => ({ insert: insertFn }));
    const database = { from } as any;

    const insertedItems = await insert(database, packages);

    expect(insertedItems).toEqual(packages);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(insertFn).toHaveBeenCalledTimes(1);
    expect(insertFn).toHaveBeenCalledWith(packages);
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});
