import { createFind } from "../../src/functions/createFind";

interface PackageProps {
  name: string;
  version: string;
}

describe("createFind", () => {
  it("creates a find method", async () => {
    expect.assertions(6);

    const table = "packages";

    const find = createFind<PackageProps>({ table });

    const name = "jest";
    const version = "27.0.5";

    const andWhere = jest.fn();

    const builder = {
      andWhere,
    };

    const items = [{ name, version }];

    const modify = jest.fn((modify) => {
      modify(builder);

      return items;
    });
    const from = jest.fn(() => ({ modify }));

    const database = { from } as any;
    const filter = { $eq: { name: Math.random().toString() } } as any;

    const values = await find({ database, filter });

    expect(values).toEqual(items);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("name", "=", filter.$eq.name);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});
