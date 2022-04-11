import { createExists } from "../../src/functions/createExists";
import { PackageProps } from "../utils/PackageProps";

describe("createExists", () => {
  it("creates an exists method", async () => {
    expect.assertions(4);

    const number = Math.floor(Math.random() * 2);

    const count = jest.fn(() => number);

    const exists = createExists<PackageProps>({ count: count as any });

    const database = { id: Math.random() } as any;
    const filter = { id: Math.random() } as any;

    const value = await exists({ database, filter });

    expect(value).toBe(number > 0);
    expect(count).toHaveBeenCalled();
    expect(count).toHaveBeenCalledTimes(1);
    expect(count.mock.calls[0]).toEqual([
      { database, filter, modify: undefined },
    ]);
  });
});
