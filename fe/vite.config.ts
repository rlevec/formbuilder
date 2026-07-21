import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), svgr(), babel({ presets: [reactCompilerPreset()] })],
    build: {
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules/react")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/@tanstack/react-query")) {
              return "vendor-query";
            }
            if (id.includes("node_modules/zod")) {
              return "vendor-utils";
            }
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:6060",
          changeOrigin: true,
        },
        "/uploads": {
          target: env.VITE_API_URL || "http://localhost:6060",
          changeOrigin: true,
        },
      },
    },
  });
};
