import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  minify: true,
  dts: true,
  clean: true,
  tsconfig: "tsconfig.build.json",
})
