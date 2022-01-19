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

**面试1： 了解早期的jquery的以来处理以及模块加载方案吗？**
**了解传统IIFE是如何解决多方依赖的问题**
> 答：IIFE加传参调配

```js 
const leftModule = ((dependencyModule1, dependencyModule2) => {
    let count = 0;
    const increase = () => ++count;
    const reset = () => count = 0;
    return{
        increase, reset
    }
}) (dependencyModule1, dependencyModule2);
leftModule.increase();
leftModule.reset();
```

#### 成熟期：
##### CJS - CommonJS
**node.js制定**
特征：
* 通过`module` + `exports` 去对外暴露接口
* 通过`require`来调用其他模块

模块组织方式`mian.js`文件

```js
// 引入部分
const dependencyModule1 = require(./dependencyModule1)
const dependencyModule2 = require(./dependencyModule2)

//处理部分
let count = 0;
const increase = ()=> ++count;
const reset = () count = 0;
// 引入依赖内部操作等相关事宜...

// 暴露接口部分，将接口抛出
exports.increase = increase;
exports.reset = reset;
// 或者用以下方法暴露接口
// exports就是在JS最上方var exports = module.exports;
module.exports = {
    increase, reset
}
```

模块使用方式
```js
const {increase, reset} = require('./main.js')

increase();
reset();
```

**可能问到的问题**

实际执行处理
```js
(function (thisValue, exports, require, module){
    const dependencyModule1 = require('./dependencyModule1')
    const dependencyModule2 = require('./dependencyModule2')
}).call(thisValue, exports, require, module);
```
>* 优点：
CommonJS率先在服务端实现了，从框架层面解决依赖、全局变量污染的问题
>* 缺点：
因为只针对服务端的解决方案，文件依赖等拉取都是本地操作，对于异步拉取依赖的处理整合不是那么的有好。

**新的问题 —— 异步依赖**

####  AMD："Asynchronous Module Definition"-"异步模块定义"
> 解决了异步加载 + 允许制定回调函数
经典实现框架是： require.js

####  AMD引入
```js
<script src="./require.js"></script>
```

// 但是单独加载文件，可能会造成页面失去响应，解决办法一个是把他放在页面底部最后加载，另一个是写成下面这样：
```js
<script src="./require.js" defer async="true"></script>
```
`async` 文件需要异步加载（IE不支持）
`defer` 支持IE
假定我们自己代码文件是`main.js`，也放在js目录下面。那么只要写成下面这种：

```js
<script src="./require.js" data-main="2021-12-26(module.js)/main"></script>
```
`data-main`置顶网页程序的主模块。这个文件会被`require.js`加载。由于同为`js`文件，所以`main.js`简写成`main`。

####  AMD规范

**新增定义方式：**
```js
    // 通过define 来定义一个模块，然后require进行加载
    /*
    define(params)
    params: 模块名, 依赖模块， 工厂方法
    */
    define(id, [depends], callback);
    require([module], callback)
```

**模块定义方式：**
```js
define('amdModule',['dependencyModule1','dependencyModule2'],(dependencyModule1,dependencyModule2) => {
    // 业务逻辑
    // 处理部分
    let count = 0;
    const increase = () => ++count;
    const reset = () => count = 0;

    return {
        increase, reset
    }
})
```
**引入模块**
```js
require(['amdModule'],amdModule => {
    amdModule.increase();
})
```

**面试题2： AMDmodule中想兼容已有代码，怎么办**
```js
define('amdModule', [], require => {
    // 引入部分
    const dependencyModule1 = require('./dependencyModule1')
    const dependencyModule2 = require('./dependencyModule2')

    // 处理部分
    let count = 0;
    const increase = () => ++count;
    const reset = () = count = 0;

    // 做一些跟引入依赖相关事宜

    return {
        increase, reset
    }
})
```

**面试题3： AMD中使用revealing**
```js
    define('amdModule', [], (require, export ,module)=>{
        // 引入
        const dependencyModule1 = require('./dependencyModule1');
        const dependencyModule2 = require('./dependencyModule2');

        // 处理
        let count = 0;
        const increase = () => ++count;
        const reset = () => count = 0;

        // 引入依赖相关
        export.increase = increase;
        export.reset = reset;

        define("amdModule", [], require => {
            const otherModule = require("amdModule");
            otherModule.increase();
            otherModule.reset();
        })
    })
```
**面试题4：兼容AMD&CJS/如何判断CJS和AMD**
UMD的出现
```js
    (define("amdModule", [], (require, export, module) => {
        const dependencyModule1 = require('./dependencyModule1');
        const dependencyModule2 = require('./dependencyModule2');

        // 处理
        let count = 0;
        const increase = () => ++count;
        const reset = () => count = 0;

        // 引入依赖相关
        export.increase = increase;
        export.reset = reset;
    })(
        // 一次性区分CommonJS or AMD
        typeof module === "object" && module.exports && typeof define !== "function"
            ?
            factory => module.exports = factory(require, exports, module)
            :
            define
    )
```
>* 优点：适合在浏览器中加载异步模块，可以并行加载多个模块
>* 缺点：会有引入成本，不能按需加载

#### CMD规范
* 按需加载
主要应用框架`sea.js`
```js
  define('module', (require, export, module) => {
    let $ = require("jquery");
    // jquery相关逻辑

    let dependencyModule1 = require("./dependencyModule1");
    // dependencyModule1相关逻辑
  })
```
>* 优点：按需加载，依赖就近
>* 依赖于打包，家在逻辑存在于每个模块中，扩大模块体积

**面试题5： AMD&CMD区别**
答：依赖就近，按需加载

#### ES6模块化
新增定义：
引入关键字 —— `import`
导出关键字 —— `export`

模块映入、导出和定义的地方：
```js
    // 引入区域
    import denpendencyModule1 from './denpendencyModule1.js'
    import denpendencyModule2 from './denpendencyModule2.js'

    //处理部分
    // 实现代码逻辑
    let count = 0;
    export const increase = () => ++count;
    export const reset = () => count = 0;

    //导出区域
    // export { reset }
    export default{
        increase, reset
    }
```
引入的地方
```js
    <script type="module" src="esModule.js"></script>
```
node中：
```js
    import { increase, reset } from "./esModule.mjs";
    increase();
    reset();
    // 或者
    import esModule from "./esModule.mjs";
    esModule.increase();
    esModule.reset();
```

**面试题6：动态模块**

### 解决模块化最终方案 - 前端工程化
#### 背景
根本问题 - 运行时进行依赖分析
> 前端的模块化处理方案依赖于运行时分析

解决方案：线下执行
grunt gulp webpack

```js
<!DOCTYPE html>
    <script src="main.js"></script>
    <script>
      // 给构建工具一个标示位
      require.config(__FRAME_CONFIG__);
    </script>
    <script>
      require(['a', 'e'], () => {
        // 业务处理
      })
    </script>
</html>
```
```js
  define('a', () => {
    let b = require('b');
    let c = require('c');

    export.run = () {
        // run
    }
  })
```

##### 工程化实现
* step1: 扫描依赖关系表：
```js
{
    a: ['b', 'c'],
    b: ['d'],
    e: [],
}
```
* step2: 重新生成依赖数据模板
```js
    <!DOCTYPE html>
        <script src="main.js"></script>
        <script>
            // 构建工具生成数据
            require.config({
                "deps": {
                    a: ['b', 'c'],
                    b: ['d'],
                    e: []
                }
            })
        </script>
        <script>
            require(['a', 'b'], () => {
                // 业务处理
            })
        </script>
    </html>
```

* step3: 执行工具，采用模块化方案解决模块化处理依赖
```js
    define('a', ['b', 'c'], () => {
        // 执行代码
        export.run = () =>{}
    })
```
> 优点：
1. 构建时生成配置，运行时执行
2. 最终转化成执行处理依赖
3. 可以拓展

#### 完全体 webpack为核心的工程化 + mvvm框架组件化 + 设计模式




#####懒加载(待完善)
import require
require.ensure