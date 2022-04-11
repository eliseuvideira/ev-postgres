import { createDeleteOne } from "../../src/functions/createDeleteOne";
import { PackageProps } from "../utils/PackageProps";
import { PackagePropsPrimary } from "../utils/PackagePropsPrimary";
import { table } from "../utils/table";

describe("createDeleteOne", () => {
  it("creates an delete one method", async () => {
    expect.assertions(6);

    const deleteOne = createDeleteOne<PackageProps, PackagePropsPrimary>({
      source: (database) => database.from(table),
      strip: ({ name }) => ({ name }),
    });

    const _delete = jest.fn();
    const where = jest.fn(() => ({ delete: _delete }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const id = { name: Math.random().toString() } as PackagePropsPrimary;

    await deleteOne({ database, id });

    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith(id);
    expect(_delete).toHaveBeenCalledTimes(1);
    expect(_delete).toHaveBeenCalledWith();
  });
});
