import myExample from "./src/plugins/rollup-plugin-concat";
export default [
  {
    input: "src/core.js",
    output: {
      file: "dist/abc.js",
      format: "iife"
    },
    plugins: [
      myExample({
        files: {
            "dist/abc.js": ["//We are here","dist/abc.js"],
            "temp/abcd.js": ["//We are here","dist/abc.js"],
            "temp/temp.js": ["//We are here","dist/abc.js"]
        }
        // banner: ["hey", "src/init.js"],
        // footer: ["src/core.js"]
      })
    ]
  }
];
