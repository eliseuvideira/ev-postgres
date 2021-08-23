import { createUpdateOne } from "../../src/functions/createUpdateOne";
import { PackageProps } from "../utils/PackageProps";
import { PackagePropsPrimary } from "../utils/PackagePropsPrimary";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createUpdateOne", () => {
  it("creates an update one method", async () => {
    expect.assertions(9);

    const updateOne = createUpdateOne<PackageProps, PackagePropsPrimary>(
      table,
      ({ name }) => ({ name })
    );

    const pkg = sample();
    const version = "0.0.0";

    const returning = jest.fn(() => [{ ...pkg, version }]);
    const update = jest.fn(() => ({ returning }));
    const where = jest.fn(() => ({ update }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const item = { name: Math.random().toString() };

    const updated = await updateOne(database, item, { version });

    expect(updated).toEqual({ ...pkg, version });
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith(item);
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({ version });
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});
