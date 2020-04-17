import { rollup } from "rollup";
import fs from "fs-extra";
import {concatFiles} from "../index.js";

describe("concatFiles", () => {
  test("should concat banner(string), footer(string), append-1 file to the final output file", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-1.js": {
              banner: ["This is the Banner"],
              concatFiles: ["testUtils/append-1.js", "dist/test-1.js"],
              footer: ["This is the footer"],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-1.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    let concatenatedData = fs.readFileSync("dist/test-1.js", "utf8");
    expect(
      concatenatedData.includes("This is the Banner") &&
        concatenatedData.includes(
          fs.readFileSync("testUtils/append-1.js", "utf8")
        ) &&
        concatenatedData.includes("This is the footer")
    ).toEqual(true);
  });

  test("should create every file provided to concatfiles", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "dist/dist2/test-2.js": {
              banner: ["Welcome"],
              concatFiles: ["testUtils/core.js", "testUtils/init.js"],
              footer: ["End"],
            },
            "dist/dist2/dist3/test-2.js": {
              banner: ["/** hello */"],
              concatFiles: ["dist/test-2.js"],
              footer: ["/** End Of the File */"],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-2.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    expect(fs.pathExistsSync("dist/dist2/dist3/test-2.js")).toEqual(true);
    expect(fs.pathExistsSync("dist/dist2/dist3/test-2.js")).toEqual(true);
  });

  test("should not create the files due to wrong format", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          "./dist/test-3.js": {
            banner: ["Hey there"],
            concatFiles: ["testUtils/init.js", "dist/test-3.js"],
            footer: ["End of the file"],
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-3.js",
      format: "iife",
      sourceMap: true,
    };

    const result = await bundle.write(output);
    const { code } = result.output[0];
    expect(
      !code.includes("Hey there") && !code.includes("End of the file")
    ).toEqual(true);
  });

  test("concating the files other than specified in output File", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-4.js": {
              banner: ["Hey Welcome"],
              concatFiles: ["testUtils/init.js", "dist/fakeTest.js"],
              footer: ["End"],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/fakeTest.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    expect(fs.pathExistsSync("dist/test-4.js")).toEqual(true);
    expect(fs.readFileSync("dist/test-4.js").includes("Hey Welcome"));
  });

  test("should concat banner(file), footer(file), append-1 file to the final output file", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-5.js": {
              banner: ["testUtils/banner.js"],
              concatFiles: ["testUtils/append-1.js", "dist/test-5.js"],
              footer: ["testUtils/footer.js"],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-5.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    let concatenatedData = fs.readFileSync("dist/test-5.js", "utf8");
    expect(
      concatenatedData.includes(
        fs.readFileSync("testUtils/banner.js", "utf8")
      ) &&
        concatenatedData.includes(
          fs.readFileSync("testUtils/footer.js", "utf8")
        )
    ).toEqual(true);
  });

  test("should  concat append-1 file to the final output file even when banner/footer is an empty array", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-6.js": {
              banner: [],
              concatFiles: ["testUtils/append-1.js", "dist/test-6.js"],
              footer: [],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-6.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    let concatenatedData = fs.readFileSync("dist/test-6.js", "utf8");
    expect(
      !concatenatedData.includes(
        fs.readFileSync("testUtils/banner.js", "utf8")
      ) &&
        concatenatedData.includes(
          fs.readFileSync("testUtils/append-1.js", "utf8")
        )
    ).toEqual(true);
  });

  test("should  concat append-1 file to the final output file even when banner/footer is undefined", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-7.js": {
              concatFiles: ["testUtils/append-1.js", "dist/test-7.js"],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-7.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    let concatenatedData = fs.readFileSync("dist/test-7.js", "utf8");
    expect(
      !concatenatedData.includes(
        fs.readFileSync("testUtils/banner.js", "utf8")
      ) &&
        concatenatedData.includes(
          fs.readFileSync("testUtils/append-1.js", "utf8")
        )
    ).toEqual(true);
  });
  test("should accept the banner and footer in text format and string as well", async () => {
    fs.writeFileSync("./banner-1.txt", "banner-1");
    fs.writeFileSync("./testUtils/banner-2.txt", "banner-2");
    fs.writeFileSync("./footer-1.txt", "footer-1");
    fs.writeFileSync("./testUtils/footer-2.txt", "footer-2");
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "./dist/test-8.js": {
              banner: [
                "Banner-1",
                "./banner-1.txt",
                "./testUtils/banner-2.txt",
                "testUtils/utils/banner.txt",
              ],
              concatFiles: ["testUtils/append-1.js", "dist/test-8.js"],
              footer: [
                "Footer-1",
                "./footer-1.txt",
                "./testUtils/footer-2.txt",
                "testUtils/utils/footer.txt",
              ],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-8.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    const concatenatedData = fs.readFileSync('dist/test-8.js','utf8');
    try{
      fs.unlinkSync("./banner-1.txt");
      fs.unlinkSync("./testUtils/banner-2.txt");
      fs.unlinkSync("./footer-1.txt");
      fs.unlinkSync("./testUtils/footer-2.txt");
    }catch(err){
      console.log(err);
    }
    expect(concatenatedData.includes('Banner-1') && concatenatedData.includes('Footer-1') && concatenatedData.includes('banner-1') && concatenatedData.includes('footer-1') && concatenatedData.includes('banner-appended') && concatenatedData.includes('footer-appended') && concatenatedData.includes('banner-2') && concatenatedData.includes('footer-2')).toBe(true);
  });
  test("should concat the files in the main directory", async () => {
    const bundle = await rollup({
      input: "testUtils/core.js",
      plugins: [
        concatFiles({
          files: {
            "test-9.js": {
              banner: [
                "Banner-1",
                "Rollup-1",
                "testUtils/banner.js"
              ],
              concatFiles: ["testUtils/append-1.js", "dist/test-8.js"],
              footer: [
                "Footer-1",
                "testUtils/footer.js",
                "./testUtils/footer.js",
                "testUtils/utils/footer.txt",
              ],
            },
          },
        }),
      ],
    });

    const output = {
      file: "dist/test-9.js",
      format: "iife",
      sourceMap: true,
    };

    await bundle.write(output);
    
    const concatenatedData = fs.readFileSync('test-9.js','utf8');
    expect(fs.existsSync("test-9.js")).toBe(true);
    expect(concatenatedData.includes("Rollup-1") && concatenatedData.includes("Footer-1")).toBe(true);
    try {
      fs.unlinkSync("test-9.js");
    }
    catch(err) {
      console.log(err);
    }
  });
});
