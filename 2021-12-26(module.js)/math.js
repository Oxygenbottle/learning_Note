const add = function (a, b) {
  return a + b;
}
module.exports = {
  add
}

// AMD模块的写法
define(function () {
  var add = (x, y) => x + y;
  return {
    add
  }
})