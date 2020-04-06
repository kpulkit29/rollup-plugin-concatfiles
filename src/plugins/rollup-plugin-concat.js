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
            let data ='';
            for(var prop in useroptions){
                if(useroptions.hasOwnProperty(prop)) {
                    if(prop.toLowerCase() === 'footer') {
                        data+= fs.readFileSync('dist/abc.js','utf8')+ "\n";
                    } else if(prop.toLowerCase() === 'files') {
                        for(var key in useroptions[prop]) {
                            var fileToCreate = useroptions[prop][key];
                            fileToCreate.forEach(function(fileName) {
                                if(path.extname(fileName)) {
                                    data+= fs.readFileSync(fileName,'utf8');
                                } else {
                                    data+=  fileName;
                                }                               
                            })
                            try {
                                fs.writeFileSync(key,data);                            
                            } catch (error) {
                                fs.mkdirSync("temp", {recursive: true})
                                fs.writeFileSync(key,data); 
                            }

                            console.log(data + "sdsddsdsds");
                        }
                    } else {
                        var index = 0;
                        while(index < useroptions[prop].length ) {
                            if(path.extname(useroptions[prop][index])) {
                                data+= fs.readFileSync(useroptions[prop][index],'utf8') + "\n";
                            } else {
                                data+= useroptions[prop][index]+"\n";
                            }
                            index++;
                        }
                    }

                }
                //fs.writeFileSync('dist/abcd.js',data);
            }
            //console.log(data);
        }
    };
}
