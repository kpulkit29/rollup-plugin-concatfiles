import myExample from "./src/plugins/rollup-plugin-concat";
export default [
  {
    input: "src/core.js",
    output: {
      file: "dist/abc.js",
      format: "iife",
      sourceMap: true
    },
    plugins: [
      myExample({
        files: {
            "./dist/abc.js": {
              banner:["nefbbeegibg"],
              concatFiles:['src/init.js'],
              footer:["fnnwfiunui"]
            },
            "dist/dist2/abcd.js": {
              banner:["nefbbeegibg"],
              concatFiles:['src/core.js'],
              footer:["fnnwfiunui"]
            },
            "dist/dist2/dist3/abcde.js": {
              banner:["hello"],
              concatFiles:['dist/abc.js'],
              footer:["miketesting123 "]
            },
        }
      })
    ]
  }
];
