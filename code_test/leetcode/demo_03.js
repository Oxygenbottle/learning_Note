var lengthOfLongestSubstring = function (s) {
  let maxLen = 0;
  let temp = '';

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    const index = temp.indexOf(char);

    if (index !== -1) {
      temp = temp.slice(index + 1);
      console.log('有重复', char);
    }

    temp += char;
    console.log(
      'char',
      char,
      'index',
      i,
      '当前字符串',
      temp,
      'max',
      maxLen
    );

    maxLen = Math.max(maxLen, temp.length);
  }

  return maxLen;
};
let s = 'abcbabcbb';
console.log(lengthOfLongestSubstring(s));
