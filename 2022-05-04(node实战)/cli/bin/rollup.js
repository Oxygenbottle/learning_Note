const  rollup  = require('rollup');
const {devConfig } = require('./rollup.config')
async function devRollup(entry) {
  const options = devConfig(entry)
  const bundle = await rollup.rollup(options);
  const {
    code, map 
  } = await bundle.generate(options.output)
  await bundle.write(options.output)
}

module.exports = {
  devRollup
};