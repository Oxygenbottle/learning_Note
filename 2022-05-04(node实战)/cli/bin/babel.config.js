module.exports = {
  configFile: false, // 精致读取babel 的配置文件
  babelrc: false,
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react')
  ]
}