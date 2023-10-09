// p96
function foo(a, b) {
  console.log('foo - console', this.a);
}
var a = 2;
foo.call(null);


function foo2(a, b) {
  console.log('a:', a, 'b:', b)
}
// 把数组“展开”成参数
foo2.apply(null, [2, 3])

// 使用bind(..)进行柯里化
var bar = foo2.bind(null, 2)
bar = foo2.bind(null, 4)
console.log(bar)
// a: 2 b: undefined
bar(3)
// a: 2 b: 3