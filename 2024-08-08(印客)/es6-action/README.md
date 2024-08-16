# ES6 实战

## 考虑项目相关的依赖

### 构建项目的依赖

* 需要什么打包工具： webpack、vite、rollup
  + webpack-cli
  + webpack
* 是否需要typeScript
  + ts-loader、babel
* webpack是否需要其他依赖，例如：style-loader、css-loader
* eslint 用来做整个项目的 js、ts 样式和编写规范的约束
* husky

### 项目的依赖

* react

## 命令

制定开发环境和构建环境等其他
* dev
* build
注意: webpack 只是一个整合，代码编译不负责
* js、 ts、 babel-loader 等 plugin 来做代码的处理
  + babel-loader : 只是 `webpack` 和 `babel` 的一个桥梁，来兼容低版本浏览器的代码，也可以使用`polyfill` 做代码转换
* css 样式相关，css-loader
* file-loader、url-loader，文件处理相关

### 关于 `js` 预处理

* 我们需要借助 `babel` 进行处理，并且 `babel` 和 `webpack` 的联系，我们通过 `babel-loader` 来实现

案例： 我们将 `es6` 转化为 `es5` 的代码(箭头函数)

**presets**
"@babel/preset-env": 包含了很多 `plugin` ，可以不用一个一个添加plugin

### tree-shaking

### sourceMap 影响构建代码可读性

sourceMap: 是为了定位先上代码故障，借助 sourceMap
但是将 `sourceMap` 打包进代码里，又会有安全问题
面试问题：你是如何处理 `sourceMap` 的安全问题
