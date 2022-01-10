const testFn = (() => {
  let count = 0;
  return {
    increase: () => ++count,
    reset: () => count = 0,
  }
})()
module.exports = {
  testFn
}