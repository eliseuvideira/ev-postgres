import { escapeLike } from "../../src/functions/escapeLike";

describe("escapeLike", () => {
  it("escapes like characters on string", () => {
    expect.assertions(5);
    expect(escapeLike("%")).toBe("[%]");
    expect(escapeLike("_")).toBe("[_]");
    expect(escapeLike("[")).toBe("[[]");
    expect(escapeLike("[]")).toBe("[[]]");
    expect(escapeLike("%%")).toBe("[%][%]");
  });

  it("keeps normal characters as is", () => {
    expect.assertions(3);
    expect(escapeLike("webpack")).toBe("webpack");
    expect(escapeLike("123456")).toBe("123456");
    expect(escapeLike("^#@!)(*&`]~:\"'\\")).toBe("^#@!)(*&`]~:\"'\\");
  });
});
