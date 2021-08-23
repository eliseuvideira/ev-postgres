import { createDeleteOne } from "../../src/functions/createDeleteOne";
import { PackageProps } from "../utils/PackageProps";
import { PackagePropsPrimary } from "../utils/PackagePropsPrimary";
import { table } from "../utils/table";

describe("createDeleteOne", () => {
  it("creates an delete one method", async () => {
    expect.assertions(6);

    const deleteOne = createDeleteOne<PackageProps, PackagePropsPrimary>(
      table,
      ({ name }) => ({ name })
    );

    const _delete = jest.fn();
    const where = jest.fn(() => ({ delete: _delete }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const primary = { name: Math.random().toString() } as PackagePropsPrimary;

    await deleteOne(database, primary);

    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith(primary);
    expect(_delete).toHaveBeenCalledTimes(1);
    expect(_delete).toHaveBeenCalledWith();
  });
});
