import fs from "fs";
export default function myExample() {
    return {
        name: 'my-example',
        buildStart: function (options) {
            console.log(options);
        },
        transform: function (code, id) {
            return {
                code: "console.log('coronavirus sucks')"
            };
        },
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
        buildEnd: function (error) {
            console.log("The build has ended");
        }
    };
}
