# rollup-plugin-concatfiles

[![Build Status](https://travis-ci.com/kpulkit29/rollup-plugin-concatFiles.svg?branch=master)](https://travis-ci.com/kpulkit29/rollup-plugin-concatFiles)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Rollup plugin to concatenate files/content to the generated output. This plugin would enable the user to concatenate files to the output or any other file in general.

## Install

``` 
// yarn
yarn add rollup-plugin-concatfiles

// npm
npm i rollup-plugin-concatfiles
```

## Usage

```javascript
// rollup.config.js
import {concatFiles} from "rollup-plugin-concatfiles";
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
            "dist/test-1.js": {
              banner:["Add your banner content"],
              concatFiles:['license.txt', 'dist/test-1.js'],
              footer:["Add your footer content"]
            },
            "dist/temp.js": {
              banner:[SOME_FILE_PATH],
              concatFiles:['src/core.js'],
              footer:[SOME_FILE_PATH]
            }
        }
      })
    ]
  }
];
```

In the above mentioned example ```dist/test-1.js``` will be the output generated by rollup and concatFiles plugin will accumulate all the content mentioned under the **files** key & dump that into ```dist/test-1.js```. **IMPORTANT**: Old content will be replaced with the concatenated content.

**rollup-plugin-concatfiles can be used to modify content of build file as well as other files.**

**Note**: Banner can be an array of normal strings or file paths (in the form of string) or both. Similarly for footer.

Concatenation order for the above example

content in ```dist/test-1.js``` = Banner + license.txt + dist/test-1.js + Footer

content in ```dist/temp.js``` = Banner + src/core.js + Footer

## Configuration and other features

**Files**

TYPE:  ```Object```

Each key in this object should be a valid filename(.js extension supported) to which concatenated content will be saved.

**Banner**

TYPE:  ```Array```

Banner would be at the top of the content. Should be passed on as an empty array if you do not want to use this key. 

**Footer**

TYPE:  ```Array```

Footer would be at the bottom of the content. Should be passed on as an empty array if you do not want to use this key.

### Other features
- Default separator is ```\n```. Cannot be altered as of now.
- Banner can be an array of normal strings or file paths (in the form of string) or both. Similarly for footer.
- Currently the plugin is capable of reading of .txt or .js files and can only generate output in .js file

## Contributors
<div style="display:flex;">
<img src="https://avatars1.githubusercontent.com/u/20151526?s=460&u=76fea093f6afafa2fadee858e58bfde8ca83279b&v=4" width="15%">
<img src="https://avatars1.githubusercontent.com/u/29947862?s=400&v=4" width="15%">
 </div>
