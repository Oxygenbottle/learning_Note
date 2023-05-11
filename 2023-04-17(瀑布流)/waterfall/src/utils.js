function getMin(arr) {
  let _arr = [];

  for (let j = 0; j < arr.length; j++) {
    _arr.push(arr[j]);
  }
  return _arr.sort((a, b) => a - b)[0];
}


// 防抖
const debounce = function (fn, wait) {
  const timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      setTimeout(fn, wait);
    }
  }
  // 写法2
  // let timer = null;
  // return function () {
  //   let that = this;
  //   let args = arguments;
  //   if (timer) clearTimeout(timer);

  //   setTimeout(() => {
  //     fn.apply(that, args)
  //   }, delay);
  // }
}
// 节流
const throttle = function (fn, delay) {
  let oldTime = Date.now();
  return function () {
    let that = this,
      args = arguments,
      now = Date.now();

    if (now - oldTime >= delay) {
      fn.apply(that, args);
      oldTime = Date.now();
    }
  }
}
export {
  getMin,
  debounce,
  throttle
}