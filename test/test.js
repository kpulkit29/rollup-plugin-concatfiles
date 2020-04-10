const { rollup } = require("rollup");
const fs = require("fs-extra");
import concatFiles from "../index";

describe("concatFiles", () => {
    // beforeEach(async () => {
    //     await fs.ensureFile('dist/abc.js');
    //   });
      

    test("should concat banner, footer, append-1 file to the final output file", async () => {
        const bundle = await rollup({
          input: "testUtils/core.js",
          plugins: [concatFiles({
              files:{
                "dist/abc.js": {
                    banner: "This is the banner",
                    concatFiles: ["testUtils/append-1.js","dist/abc.js"],
                    footer: ["This is the footer"]
                },
              }
          })]
        });
    
         await bundle.generate({ file:"dist/abc.js", format: "iife" });
         await bundle.writeBundle();
        console.log(fs.readFileSync("dist/abc.js","utf8"));
        expect(fs.pathExistsSync("dist/abc.js")).toEqual(true);
    });
});




