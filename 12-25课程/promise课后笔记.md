Promise
==========================
**首先理解函数的作用，讲需要执行的耗时逻辑或者请求进行一个异步回调，避免JS中单线程阻塞。**

然后剖析promise函数：

#### 1. 他是拥有一种初态，两种终态，状态不可逆且不可修改的。

初态(等待) - 默认： 'pending'; 
终态(成功) - 决定： 'fulfilled'; 
终态(失败) - 拒绝： 'rejected'; 

将上述状态定义成常量

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
```

定义函数，设置初始状态

```js
class MyPromise {
    constructor() {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
    }
}
```

#### 2. 添加改变状态(this.status)的方法

`resolve` - (成功)：入参为 value; 
`reject` - (失败)：入参为 reason; 

```js
class MyPromise {
    constructor() {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
    }

    resolve(value) {
        if (this.status == PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status == PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }
}
```

#### 3. 添加入参

根据promise调用时候的方法，缺少入参

```js
var P = new Promise((resolve, reject) => {
    ....
});
```

可得知传入的是一个函数，用 `resolve` 和 `reject` 接收，并且有任何报错都需要 `reject`

```js
class MyPromise {
    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        // 需要在new这个初始化的时候执行
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value) {
        if (this.status == PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status == PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }
}
```

#### 4. 添加 `then` 等链式调用方法

在平时使用中会出现 `.then`  `.catch` 的链式调用：

```js
P.then(res => {
    ...
}).catch(err => {
    ...
})
```

那么也需要在函数中添加对应的方法

```js
  then(onFulfilled, onRejected) {}
  catch (onFulfilled, onRejected) {}
```

**因为 `.then` 返回的整体是一个 `promise` ，所以此处需要检查并处理参数, 之前提到的如果不是 `function` 就忽略. 这个忽略指的是原样返回 `value` 或者 `reason` 。**

```js
class MyPromise {
    //—————————————————— 折叠内容 ————————————————
    ...

    // 公共方法类
    isFunction(fn) {
        return typeof fn === "function";
    }

    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];

    // 核心
    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value
        };
        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            return reason
        };

        const promise2 = new MyPromise((resolve, reject) => {
            switch (this.status) {
                case PENDING: {
                    // 如果状态还没有改编成终态，则需要先将回调存入数组，然后对status进行监听，变成终态时再便利执行。
                    this.FULFILLED_CALLBACK_LIST.push(realOnFulfilled);
                    this.REJECTED_CALLBACK_LIST.push(realOnRejected);
                    break;
                }
                case FULFILLED: {
                    realOnFulfilled();
                    break;
                }
                case REJECTED: {
                    realOnRejected();
                    break;
                }
            }
        });
        return promise2;
    }

    catch () {}
}
```

**然后在 `status` 发生变化的时候，执行 `FULFILLED_CALLBACK_LIST` 和 `REJECTED_CALLBACK_LIST` 中的回调，用es6的getter和setter，当status改变时，去执行**

```js
class MyPromise {
    //—————————————————— 折叠内容 ————————————————
    ...

    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];

    // 防止get死循环，需要将status临时赋值，作为状态读取的对象
    _status = PENDING;

    get status() {
        return this._status;
    }

    set status(newValue) {
            this._status = newValue;
            switch (newValue) {
                case FULFILLED: {
                    this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                        callback(this.value);
                    })
                    break;
                }
                case REJECTED: {
                    this.REJECTED_CALLBACK_LIST.forEach(callback => {
                        callback(this.value);
                    })
                    break;
                }
            }
        }
        //—————————————————— 折叠内容 ————————————————
        ...
}
```

**接着 `.then` 的返回值继续分析， `then` 返回值是一个 `Promise` ，那 `Promise` 的 `value` 和 `reason` 是什么**

**promsie.js**

```js
class MyPromise {
    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
        // 需要在new这个初始化的时候执行
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];

    // 防止get死循环，需要将status临时赋值，作为状态读取的对象
    _status = PENDING;

    get status() {
        return this._status;
    }

    set status(newValue) {
        this._status = newValue;
        switch (newValue) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                })
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                })
                break;
            }
        }
    }

    resolve(value) {
        if (this.status == PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status == PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    // 核心
    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value
        };
        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            return reason
        };

        const promise2 = new MyPromise((resolve, reject) => {
            switch (this.status) {
                case PENDING: {
                    // 如果状态还没有改编成终态，则需要先将回调存入数组，然后对status进行监听，变成终态时再便利执行。
                    this.FULFILLED_CALLBACK_LIST.push(realOnFulfilled);
                    this.REJECTED_CALLBACK_LIST.push(realOnRejected);
                    break;
                }
                case FULFILLED: {
                    realOnFulfilled();
                    break;
                }
                case REJECTED: {
                    realOnRejected();
                    break;
                }
            }
        });
        return promise2;
    }
    
    // 公共方法类
    isFunction(fn) {
        return typeof fn === "function";
    }
}
```
