const fs = require('fs');
let av ='';
fs.readFile('dist/abc.js','utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    av = "efjnenwfnuenfuinef\n" + data;
    console.log(av);
  });