const swc = require('@next/swc-win32-x64-msvc');

console.log('parse:', typeof swc.parse);
console.log('parseSync:', typeof swc.parseSync);
console.log('transform:', typeof swc.transform);
console.log('transformSync:', typeof swc.transformSync);
console.log('parse:', swc.parse);
console.log('transform:', swc.transform);