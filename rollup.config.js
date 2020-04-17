import concatFiles from "./index.js";
export default [
  {
    input: "testUtils/core.js",
    output: {
      file: "dist/test-1.js",
      format: "iife",
      sourceMap: true
    },
    plugins: [
      concatFiles({
        files: {
            "./dist/test-1.js": {
              banner:["banner-1"],
              concatFiles:['testUtils/init.js', 'dist/test-1.js'],
              footer:["footer-1"]
            },
            "dist/dist2/test-2.js": {
              banner:["banner-2"],
              concatFiles:['testUtils/core.js', 'testUtils/init.js'],
              footer:["footer-2"]
            },
            "dist/dist2/dist3/test-3.js": {
              banner:["banner-3", "banner-appended"],
              concatFiles:['dist/core.js'],
              footer:["footer-3 "]
            },
        }
      })
    ]
  }
];
