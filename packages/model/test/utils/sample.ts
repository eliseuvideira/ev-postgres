import { packages } from "./packages";

export const sample = () =>
  packages[Math.floor(Math.random() * packages.length)];
