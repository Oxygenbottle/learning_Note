> IIFE - 立即执行函数
```js
    (()=>{
        let count  = 0;
    })
```

IIFE-闭包封装
```js
const lifeModule = (() => {
    let count = 0;
    return {
        increase: ()=> ++count,
        reset: ()=>{
            count = 0;
        }
    }
})();

lifeModule.increase();//调用
lifeModule.reset();//调用
```


> 优化1： 依赖其他代码的IIFE
```js
const lifeModule = (() => {
    let count = 0;
    return {
        increase: ()=> ++count,
        reset: ()=>{
            count = 0;
        }
    }
})();

lifeModule.increase();//调用
lifeModule.reset();//调用
```

实际上，Jquery等框架其实应用了 revealing（揭示模式） 的写法：

API定义在函数中，只是暴露函数的接口
```js
const lifeModule = ((dependencyModule1,dependencyModule2) => {
    let count = 0;
    return {
        const increase = ()=> ++count,
        const reset = ()=>{
            count = 0;
        }
        return {
            increase,reset
        }
    }
})(dependencyModule1,dependencyModule2);
lifeModule.increase();
lifeModule.reset();
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