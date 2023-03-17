import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
const { EsLinter, linterPlugin } = EsLint;
import path from "path";

export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTesting.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
  build: {
    lib: {
      entry: path.resolve("src", "index.ts"),
      name: "TQueryHooks",
      fileName: (format) => `tquery-hooks.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
}));
