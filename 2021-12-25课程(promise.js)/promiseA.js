const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    //异步待执行数组
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = PENDING;
    //getter/setter监听status改变  

    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        // 执行传入函数，例如平时封装方法，或者封装的http请求
        try {
            // 将传入方法的this指向MyPromise
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    get status() {
        return this._status;
    }
    // 监听status的值，本质就是监听resolve/reject，将待执行数组便利执行
    set status(newStatus) {
        this._status = newStatus;
        switch (newStatus) {
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
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }
    // 操作then方法， .then( res=> { ... } ，平时不传，但是catch取的就是onRejected)
    then(onFulfilled, onRejected) {
        // 先判断是否是方法，否则直接传出，避免后续其他问题
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }

        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            throw reason;
        }

        // .then内部应该是放到新的微任务中，所以用了queueMicrotask(()=> {})
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicotack = () => {
                queueMicrotask(() => {
                    // 对所有报错都需要抛出
                    try {
                        // 如果.then中的方法是另一个异步/延时的方法，那么就要进行下一步解析: resolvePromise
                        const x = realOnFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            const rejectedMicotack = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }


            switch (this.status) {
                case FULFILLED: {
                    fulfilledMicotack();
                    break;
                }
                case REJECTED: {
                    rejectedMicotack();
                    break;
                }
                case PENDING: {
                    // 因为fn方法耗时，在宏任务已经执行完毕后，调用.then中的微任务时，this.status的值还是为PENDING
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicotack);
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicotack);
                    break;
                }
            }
        });
        return promise2;
    }

    //实例方法
    catch (onRejected) {
        return this.then(null, onRejected);
    }

    resolvePromise(promise2, x, resolve, reject) {
        // 如果 newPromise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 newPromise
        // 这是为了防止死循环（个人理解：return 出来的东西和内部执行的东西一样，会出现死循环）
        if (promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'))
        }
        // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
        if (x instanceof MyPromise) {
            // 如果传入的 x 也就是realOnFulfilled(this.value) 不等于promise2，
            // 也是一个Promise，则使 newPromise 接收 x 的状态,然后继续执行x，如果执行时候拿到的 y 也是 Promise，就还要继续解析 y。
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject);
                }, reject);
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            // 如果 x 为对象或者函数
            if (x === null) {
                // null也会被判断为对象
                return resolve(x);
            }

            let then = null;

            try {
                then = x.then;
            } catch (error) {
                return reject(error);
            }

            if (this.isFunction(then)) {
                let called = false;
                // 将 x 作为函数的作用域 this 调用
                // 传递两个回调作为参数，第一个参数： resolvePromise ,第二个参数 rejectPromise
                try {
                    // function.call(thisArg, arg1, arg2, ...)
                    then.call(
                        x,
                        // 如果 resolvePromise 以值 y 为参数被调用，则运行 resolvePromise
                        (y) => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                        (r) => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    )
                } catch (error) {
                    if (called) return;
                    reject(error);
                }
            } else {
                // 如果 then 不是函数，以 x 为参数执行 promise
                resolve(x);
            }
        } else {
            // 如果 x 不为对象或者函数，以 x 为参数执行 promise
            resolve(x);
        }
    }

    isFunction(param) {
        return typeof param === 'function'
    }

    // static resolve(value) {
    //     if (value instanceof MyPromise) {
    //         return value;
    //     }
    // }
}

const test = new MyPromise((resolve, reject) => {
    let time = new Date();
    console.log('seconds')
    setTimeout(() => {
        if (time.getSeconds() % 2 == 0) {
            resolve('偶数秒' + time.getSeconds());
        }
        reject('奇数秒' + time.getSeconds());
    }, 1000);
}).then((value) => {
    console.log(value, 'then');
}).catch((reason) => {
    console.log(reason, 'catch');
})