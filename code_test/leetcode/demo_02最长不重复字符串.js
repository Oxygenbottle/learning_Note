/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let withoutrepetition = s[0];
  for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j < s.length; j++) {
          if (s.indexOf(s.slice(i, j), j) < 0 && s.slice(i, j).length > withoutrepetition.length) {
              withoutrepetition = s.slice(i, j)
          }
      }
  }
  return withoutrepetition.length;
};