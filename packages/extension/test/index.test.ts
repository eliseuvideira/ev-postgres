import { sayHello } from "../src/index";

describe("index", () => {
  describe("sayHello", () => {
    it("should say hello", () => {
      expect.assertions(1);

      const message = sayHello();

      expect(message).toEqual("Hello World 👋!");
    });
  });
});
