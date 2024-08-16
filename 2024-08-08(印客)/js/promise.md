### 剖析 promise 原理

promise 是JS异步编程的关键，避免了回调地狱。

根据promise使用示例，剖析promise关键点

```js
var test = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
    reject('fail')
}).then(res => {
    console.log('success', res)
}, err => {
    console.log('fail', err)
})
// fail fail
```

1.  `Promise`接收两个参数`resolve`和`reject`，触发了`resolve`就不会触发`reject`。
2.  `Promise`内部有状态key，且流转不可逆。
3.  `throw`就相当于`reject`,可以借助`try catch`
4.  生成的`promise`实例对象可用`.then`来触发耗时操作后的回调函数。`then`接收两个参数，第一个是成功回调，第二个是失败回调。
5.  如果`resolve|reject`写在耗时操作中，`.then`也会在耗时结束后再执行。
6.  `then`支持链式调用
7.  其他方法`all` `race` `allSettled` `any`

```js
class myPromise {
    constructor(executor) {
        this.init();
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    init() {
        this.status = 'pending';
        this.result = null;
        this.resolveList = [];
        this.rejectList = [];
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    resolve(res) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.result = res;
            while (this.resolveList.length) {
                this.resolveList.shift()(this.result);
            }
        }
    }

    reject(reason) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.result = reason;
            this.rejectList.shift()(this.result);
        }
    }

    then(onFulfilled, onRejected) {
        queueMicrotask(() => {
            var thenPromise = new myPromise((resolve, reject) => {

                onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : val => val;
                onRejected = typeof onRejected == 'function' ? onRejected : reason => {
                    throw reason
                };

                // 链式调用 - 将then执行的函数返回值，包装成一个新的promise

                const handlePromise = cb => {
                    try {
                        const x = cb(this.result)
                        if (x === thenPromise && x) {
                            throw new Error('not promise self')
                        }

                        if (x instanceof myPromise) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }

                    } catch (err) {
                        reject(err);
                        throw new Error('err', err)
                    }
                }

                if (this.status === 'fulfilled') {
                    handlePromise(onFulfilled)
                } else if (this.status === 'rejected') {
                    handlePromise(onRejected)
                } else {
                    this.resolveList.push(handlePromise.bind(this, onFulfilled))
                    this.rejectList.push(handlePromise.bind(this, onRejected))
                }
            })
            return thenPromise;
        })
    }
    /**
     * 接收promise数组，非promise项算成功
     * 所有promise都成功，则返回成功
     * 有一个失败，则返回失败
     */
    all(promiseList) {
        let resultList = [];
        let count = 0;

        return new Promise((resolve, reject) => {
            if (promiseList.length > 0) {
                const addData = (index, value) => {
                    resultList[index] = value;
                    count++;
                    if (count == promiseList.length) {
                        resolve(resultList);
                    }
                }
                promiseList.forEach((promise, index) => {
                    if (promise instanceof Promise) {
                        promise.then(res => {
                            addData(index, res)
                        }, err => {
                            reject(err)
                        })
                    } else {
                        addData(index, promise)
                    }
                })
            }
        })
    }
    /**
     * 接收一个promise数组，非promise项算成功
     * 不论成功失败，返回最快的那个结果
     */
    race(promiseList) {
        return new Promise((resolve, reject) => {
            promiseList.forEach(promise => {
                if (promise instanceof Promise) {
                    promise.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(promise);
                }
            })
        })
    }
    /**
     * 接收promise数组，非promise项算成功
     * 不管成功失败，都返回所有结果,且需要知道是成功还是失败
     */
    allSettled(promiseList) {
        return new Promise((resolve, reject) => {
            var result = [];
            var count = 0;
            const addData = (status, index, value) => {
                result[index] = {
                    status: value,
                };
                count++;
                if (count == promiseList.length) {
                    resolve(result)
                }
            }

            promiseList.forEach((promise, index) => {
                if (promise instanceof Promise) {
                    promise.then(res => {
                        addData('fulfilled', index, res)
                    }, err => {
                        addData('rejected', index, err)
                    })
                } else {
                    addData('fulfilled', index, promise)
                }
            })
        })
    }
    /**
     * 接收promise数组，非promise项算成功
     * 一个成功则成功，全部失败才失败
     */
    any(promiseList) {
        return new Promise((resolve, reject) => {
            var count = 0;
            promiseList.forEach(promise => {
                if (promise instanceof Promise) {
                    promise.then(res => {
                        resolve(res)
                    }, err => {
                        count++;
                        if (count == promiseList.length) {
                            reject('all rejected')
                        }
                    })
                } else {
                    resolve(promise)
                }
            })
        })
    }
}

const test3 = new MyPromise((resolve, reject) => {
        resolve(100) // 输出 状态：success 值： 200
    }).then(res => 2 * res, err => 3 * err)
    .then(res => console.log('success', res), err => console.log('fail', err))
```


