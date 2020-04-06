import fs from "fs";
const path = require("path");

export default function myExample(useroptions) {
    return {
        name: 'my-example',
        buildStart: function (options) {
            //console.log(options);
        },
        // transform: function (code, id) {
        //     return {
        //         code: "console.log('coronavirus sucks')"
        //     };
        // },
        resolveId: function (source) {
            if (source === 'virtual-module') {
                return source;
            }
            return null;
        },
        load: function (id) {
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"';
            }
            return null;
        },
        writeBundle: function (code) {
            console.log("code is ", fs.readFileSync('dist/abc.js','utf8'));
            console.log(useroptions.files)
            if(useroptions.files) {
                for(var property in useroptions.files) {
                    var content = concatdata(useroptions.files[property]);   
                    console.log(content); 
                    if(path.extname(property)) {
                        let directorpath = property.substring(0, property.lastIndexOf('/'));
                        console.log("property is ", property)
                        console.log("directory is ", directorpath);
                        if( !fs.existsSync(directorpath)) {
                            fs.mkdirSync(directorpath, { recursive: true });
                        } 
                        fs.writeFileSync(property,content,(error) => {
                            console.log(error)
                        })
                    }
                   
                }
            }
            
            function concatdata(obj) {
                let data = '';
                for(var prop in obj)
                {
                    if(obj.hasOwnProperty(prop)) {
                        // console.log("prop is", prop, "length is ", obj[prop].length);
                        console.log(obj[prop].length)
                        var index = 0;
                        const objlength = obj[prop] && obj[prop].length;
                        while(index < objlength ) {
                            if(path.extname(obj[prop][index])) {
                                data+= fs.readFileSync(obj[prop][index],'utf8') + "\n";
                            } else {
                                data+= obj[prop][index]+"\n";
                            }
                            index++;
                        }
                    }
                }
                return data;
            }
        }
    };
}
