const name = 'Tom';
const age = 29;
const tagFn = (strings, ...values) =>
  strings.map((item, index) => item + values[index]).join();

const result = tagFn(['My name is ', ",I'm ", 'years old'], name, age);

console.log('res', result);
