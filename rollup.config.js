import myExample from "./src/plugins/rollup-plugin-concat";
export default {
    input: 'src/core.js',
    output: {
        file: 'dist/abc.js',
        format: 'iife',
    },
    plugins: [myExample()],
}