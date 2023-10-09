// p95

/** Bind()
 * 会创建一个新的包装函数，
 * 这个函数会忽略当前的this绑定，
 * 并把我们提供的对象绑定到this上。
 * Function.prototype.bind(...)
 * @param {*}  
 */


function foo(p1, p2) {
  this.val = p1 + p2
  console.log('p1:', p1)
  console.log('p2:', p2)
  console.log('this.val :', this.val)
}

var bar = foo.bind(null, 'p1');
/** 改写
 *  bar(p1 = 'p1', p2 = '') {
      this.val = 'p1' + p2
    }
 */
console.log('bar', bar.toString())
var baz = new bar('p2');
console.log('baz', baz)


console.log('baz.val', baz.val)