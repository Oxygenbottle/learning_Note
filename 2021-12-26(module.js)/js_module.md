## JS 模块化
### 1. 历史
#### 背景
它的设计者Brendon Eich因为所任职的网景公司开发的浏览器Navigator需要一个脚本语言能去实现浏览器与网页互动的需求,并且搭配JAVA使用。
> JS的模块化需求日益增长

#### 幼年期：无模块化
1.  需要在页面中增加一些不同js：动画、表单、格式化等
2.  多种js文件被分在不同的文件中
3.  不同的文件又被同一个模板引用

```js
<script src="jquery.js"></script>
<script src="mian.js"></script>
<script src="dep1.js"></script>
```
* 认可：以上就是最基础的模块化的第一步
* 问题：污染全局作用域 => 不利于大型项目以及多人团队的共建

#### 成长期： 模块化的雏形 - IIFE（立即执行函数）
例子：
```js
 let count = 0;
 const increase = () => ++count;

 const reset = () => {
     count = 0;
 }

 increase();
 reset();
```

利用函数块级作用域
>
```js
    (()=>{
        let count  = 0;
        // .....
    })
```
仅定义了一个函数，如果立即执行
```js
( () => {
    let count = 0;
    // count 仅仅作用在这个函数块内
})();
```
// 这里定义了作用于，声明了函数，然后立即执行
如果声明多个这样的匿名函数，他们之间就互相隔离开，上面就是最简单的模块

尝试定义 一个简单模块
```js
const lifeModule = (()=>{
    let count = 0;
    return {
        increase: () => ++count;
        reset: () => count = 0;
    }
})();

lifeModule.increase();
lifeModule.reset();
```

**追问：有额外依赖时，如何优化IIFE相关代码**
> 优化1： 依赖其他代码的IIFE

实际上，Jquery等框架其实应用了 revealing（揭示模式） 的写法：
API定义在函数中，只是暴露函数的接口
```js
const lifeModule = ((dependencyModule1,dependencyModule2) => {
    let count = 0;
    return {
        increase: ()=> ++count;
        reset: ()=> count = 0;
    }
})(dependencyModule1,dependencyModule2);
lifeModule.increase();
lifeModule.reset();
```

**面试1： 了解早起的jquery的以来处理以及模块加载方案吗？**
**了解传统IIFE是如何解决多方依赖的问题**
答：IIFE加传参调配

```js 
const leftModule = ((dependencyModule1, dependencyModule2) => {
    let count = 0;
    const increase = () => ++count;
    const reset = () => count = 0;
    return{
        increase, reset
    }
}) (dependencyModule1, dependencyModule2)
```

####成熟期：
##### CJS - CommonJS
> node.js制定
特征：
>* 通过
>* 通过

模块组织方式mian.js文件

```js
// 引入部分
const dependencyModule1 = require(./dependencyModule1)
const dependencyModule2 = require(./dependencyModule2)

//处理部分
let count = 0;
const increase = ()=> ++count;

// 暴露接口部分
exports.increase = increase;

module.exports = {

}
```

模块使用方式
```js
cosnt {increase, reset} = require('./main.js')
increase();
reser();
```

实际执行处理
```js
()
```

####  AMD规范
> 解决了异步加载 + 允许制定回调函数
经典实现框架是： require.js


新增定义方式：
```js
    // 通过define 来定义一个模块，然后require进行加载
    /*
    define

    */
    define(id, [depends],callback);
```

新增定义方式：
```js
define('amdModule',)
```

##面试题2： AMD


#### ES6模块化
> 

新增定义：
引入关键字 —— import
导出关键字 —— export 

模块映入、导出和定义的地方：
```js
    // 引入区域
    import denpendencyModule1 from './denpendencyModule1.js'
    import denpendencyModule2 from './denpendencyModule2.js'

    //处理部分
    let count = 0;

    //导出区域
    export const reset = () =>{};
    export { reset }
    export default{
        reset,
    }
```


### 解决模块化最终方案 - 前端工程化
#### 背景





#####懒加载
import require
require.ensure