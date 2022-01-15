var es6_ME = require("./module_export_es6");
console.log('—————————es6 module export—————————');
console.log(es6_ME.testFn.increase());
console.log(es6_ME.testFn.increase());
console.log(es6_ME.testFn.reset());
console.log(es6_ME.testFn.increase());

// import e1, {e2, e3, e4} from "./export_es6.mjs";
// console.log("—————————es6—————————");
// console.log(e1);
// console.log(e2);
// console.log(e3);
// console.log(e4);

// import * as imp from "./export_es6"
// console.log(es6_E.testFn.increase());
// console.log(es6_E.testFn.reset());
// console.log(es6_E.testFn.increase());
