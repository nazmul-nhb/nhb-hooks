import dts from "rollup-plugin-dts";
import { defineConfig } from "rollup";

export default defineConfig({
  input: {
    index: "./src/index.ts",
    types: "./src/types/index.ts",
  },
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [dts()],
});
