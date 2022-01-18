// 未完待续
// http://www.ruanyifeng.com/blog/2012/11/require_js.html

// <script src="js/require.js" data-main="js/main"></script>
var math = require('./math');
console.log('测试引入方法:add()',math.add(1, 2))
// var require = require("./require")
var es6_ME = require("./module_export_es6");
// require.config({
//   paths: {
//     "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"
//   }
// })
// require(["jquery"], ($) => {
//   console.log('jquery加载成功', $)
// })

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