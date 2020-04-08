const fs = require("fs");
const path = require("path");

function concatdata(obj) {
    let data = '';
    for(var prop in obj)
    {
        console.log(obj[prop].length);
        const objlength = obj[prop] && obj[prop].length;
        if(objlength) {
            for(var fileName of obj[prop]) {
                if(path.extname(fileName)) {
                    data+= fs.readFileSync(fileName,'utf8') + "\n";
                } else {
                    data+= fileName + "\n";
                }
            }
        }
    }
    return data;
}

export default function myExample(useroptions) {
    return {
        name: 'my-example',
        buildStart: function (options) {
            //console.log(options);
        },
        writeBundle: function (code) {
            console.log("code is ", fs.readFileSync('dist/abc.js','utf8'));
            console.log(useroptions.files)
            if(useroptions.files) {
                for(var property in useroptions.files) {
                    var content = concatdata(useroptions.files[property]);   
                    if(path.extname(property)) {
                        let directorpath = property.substring(0, property.lastIndexOf('/'));
                        console.log("property is ", property)
                        console.log("directory is ", directorpath);
                        if( !fs.existsSync(directorpath)) {
                            fs.mkdirSync(directorpath, { recursive: true });
                        } 
                        fs.writeFileSync(property,content)
                    }
                   
                }
            }
        }
    };
}
