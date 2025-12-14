import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));

const extensions = [".js"];

export default {
  input: "src/index.js",
  external: ["@hotwired/stimulus", "jquery"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "default"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    },
    {
      file: pkg["umd:main"],
      format: "umd",
      name: "StimulusSelect2",
      sourcemap: true,
      globals: {
        "@hotwired/stimulus": "Stimulus",
        jquery: "$"
      }
    }
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions,
      exclude: "node_modules/**",
      babelrc: false,
      configFile: false,
      presets: [["@babel/preset-env", { targets: "defaults" }]]
    }),
    filesize()
  ]
};
