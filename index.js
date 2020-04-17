const fs = require("fs");
const path = require("path");

/**
 * 
 * @param {Object} obj contains the list of files to be concatinated
 * returns  string
 */
function concatdata(obj) {
    let data = '';
    for(let prop in obj)
    {
        const objlength = obj[prop] && obj[prop].length;
        if(objlength) {
            for(let fileName of obj[prop]) {
                /**
                 * checking if file is a javascript files
                 * if file is not a javascript file it is assumed that is is a string 
                 * to be appended directly
                 */
                if(path.extname(fileName) === ".js" || path.extname(fileName) === ".txt") {
                    data+= fs.readFileSync(fileName,'utf8') + "\n";
                } else {
                    data+= fileName + "\n";
                }

            }
        }
    }

    return data;
}


function concatFiles(useroptions) {
    return {
        name: 'rollup-plugin-concatfiles',
        writeBundle: function () {
            if(useroptions.files) {
                for(let concatinatedFile in useroptions.files) {
                    let content = concatdata(useroptions.files[concatinatedFile]);  
                    /**
                     * concatination works only for js files
                     * If the path provided by user does not exist
                     * then it would be created recursively
                     *  */ 
                    if(path.extname(concatinatedFile) == ".js") {
                        let directorpath = concatinatedFile.substring(0, concatinatedFile.lastIndexOf("/"));
                        if(directorpath !== "" && !fs.existsSync(directorpath) ) {
                            fs.mkdirSync(directorpath, { recursive: true });
                        } 
                        fs.writeFileSync(concatinatedFile,content);
                    }
                }

            } else {
                console.log('\x1b[31m%s\x1b[0m', "please enter in the valid format as per the readme."); 
                
            }

        }
    };
}

exports.concatFiles = concatFiles;
