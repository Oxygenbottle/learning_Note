module.exports = {
  presets: [
    ['@babel/preset-env'],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    // '@babel/plugin-transform-arrow-functions', // ()=> 转换成普通函数
    // '@babel/plugin-transform-classes' // 将类转换成ES5的原型链写法
    ['@babel/plugin-transform-runtime']
  ]
};
