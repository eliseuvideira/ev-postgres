import { createExists } from "../../src/functions/createExists";

describe("createExists", () => {
  it("creates an exists method", async () => {
    expect.assertions(4);

    const count = jest.fn(() => 1);

    const exists = createExists(count as any);

    const database = { id: Math.random() } as any;
    const filter = { id: Math.random() } as any;

    const value = await exists({ database, filter });

    expect(value).toBe(true);
    expect(count).toHaveBeenCalled();
    expect(count).toHaveBeenCalledTimes(1);
    expect(count.mock.calls[0]).toEqual([{ database, filter }]);
  });
});
