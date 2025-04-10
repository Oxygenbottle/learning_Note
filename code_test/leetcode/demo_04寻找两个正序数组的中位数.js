var findMedianSortedArrays = function (nums1, nums2) {
  // 优化方案，不做sort排序，直接nums1取中位两个数和nums2取中位两个数,
  // 变成一个新的数组
  // 是长度为4或者3的数组，然后计算中位数就OK --行不通
  let arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b)
  console.log(';arr)', arr)
  if (arr.length == 1) return arr[0]
  if (arr.length % 2 == 1) {
      return arr[parseInt(arr.length / 2)]
  }
  return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
};
let nums1 = [1, 3];
let nums2 = [2];

console.log(findMedianSortedArrays(nums1, nums2));
