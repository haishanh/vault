import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [commonjs(), resolve(), typescript()],
  },
  {
    input: "src/browser.ts",
    output: {
      file: "dist/browser.js",
      format: "es",
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript({ tsconfig: "tsconfig.browser.json" }),
      terser(),
    ],
  },
];
