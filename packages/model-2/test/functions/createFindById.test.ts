import { createFindById } from "../../src/functions/createFindById";
import { PackageProps } from "../utils/PackageProps";
import { PackagePropsPrimary } from "../utils/PackagePropsPrimary";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createFindById", () => {
  it("creates a find by id method", async () => {
    expect.assertions(6);

    const findById = createFindById<PackageProps, PackagePropsPrimary>({
      source: (database) => database.from(table),
      strip: ({ name }) => ({ name }),
    });

    const item = sample();

    const first = jest.fn(() => item);
    const where = jest.fn(() => ({ first }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const pkg = sample();

    const value = await findById({ database, id: { name: pkg.name } });

    expect(value).toEqual(item);
    expect(first).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith({ name: pkg.name });
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});
