import fs from "fs";
const path = require("path");

export default function myExample(useroptions) {
    return {
        name: 'my-example',
        buildStart: function (options) {
            console.log(options);
        },
        // transform: function (code, id) {
        //     return {
        //         code: "console.log('coronavirus sucks')"
        //     };
        // },
        resolveId: function (source) {
            console.log("source is ",source);
            if (source === 'virtual-module') {
                return source;
            }
            return null;
        },
        load: function (id) {
            console.log("id is ", id)
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"';
            }
            return null;
        },
        buildEnd: function (error) {
            let data ='';
            console.log(fs.readFileSync('dist/abc.js','utf8'));
            for(var prop in useroptions){
                if(useroptions.hasOwnProperty(prop)) {
                    if(prop.toLowerCase() === 'footer') {
                        data+= fs.readFileSync('dist/abc.js','utf8')+ "\n";
                    }
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
                fs.writeFileSync('dist/abcd.js',data);
            }
            console.log(data);
            console.log("The build has ended");
        }
    };
}
