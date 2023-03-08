import { defineConfig, Plugin } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import compressPlugin from "vite-plugin-compression"

function configCompressPlugin(
  compress: "gzip" | "brotli" | "none",
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(",");

  const plugins: Plugin[] = [];

  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()]
})
