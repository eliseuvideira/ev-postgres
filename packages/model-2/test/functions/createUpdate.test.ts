import { createUpdate } from "../../src/functions/createUpdate";
import { PackageProps } from "../utils/PackageProps";
import { packages } from "../utils/packages";
import { table } from "../utils/table";

describe("createUpdate", () => {
  it("creates an update method", async () => {
    expect.assertions(10);

    const update = createUpdate<PackageProps>({
      source: (database) => database.from(table),
    });

    const license = "MIT";
    const version = "0.0.0";

    const items = packages
      .filter((x) => x.license === license)
      .map((item) => ({ ...item, version }));

    const returning = jest.fn(() => items);
    const updateFn = jest.fn(() => ({ returning }));
    const andWhere = jest.fn();
    const builder = { andWhere };
    const modify = jest.fn((modify) => {
      modify(builder);
      return { update: updateFn };
    });
    const from = jest.fn(() => ({ modify }));
    const database = { from } as any;

    const values = await update({
      database,
      filter: { $eq: { license } },
      values: { version },
    });

    expect(values).toEqual(items);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("license", "=", license);
    expect(updateFn).toHaveBeenCalledTimes(1);
    expect(updateFn).toHaveBeenCalledWith({ version });
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});
