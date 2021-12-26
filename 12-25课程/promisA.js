const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    //异步待执行数组
    FULFILLED_CALLLBACK_LIST = [];
    REJECTED_CALLLBACK_LIST = [];
    _status = PENDING;
    //getter/setter监听status改变  

    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    get status() {
        return _status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch (this._status) {
            case FULFILLED: {
                this.FULFILLED_CALLLBACK_LIST.forEach(callback => {
                    callback(this.value); //为什么传this.value
                })
                break;
            }
            case REJECTED: {
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

    reject(value) {

    }

    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }

        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            throw reason;
        }

        const promise2 = new MyPromise(() => {
            const fulfilledMicotack = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMicotack = () => {
                try {

                    this.resolvePromise(promise2, x, resolve, reject)
                } catch (error) {

                }
            }


            switch (this.status) {
                case FULFILLED: {
                    realOnFulfilled();
                    break;
                }
                case REJECTED: {
                    realOnRejected();
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLLBACK_LIST.push(fulfilledMicotack)
                    this.REJECTED_CALLLBACK_LIST.push(rejectedMicotack)
                    breadk;
                }
            }
        });
        return promise2;
    }

    //实例方法
    catch()

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('传入和返回是相同，有问题'))
        }
        if (x instanceof MyPromise) {
            queueMicrotask(() => {
                x.then(
                    (y) => {
                        this.resolvePromise(promise2, y, resolve, reject);
                    },
                    reject
                )
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x);
            }

            let then = null;

            try {
                then = x.then
            } catch (error) {
                return reject(error);
            }

            if (this.isFunction(then)) {
                let called = false;
                try {
                    then.call(
                        x,
                        (y) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            this.resolvePromise()
                        },
                        (r) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            reject(r);
                        }
                    )
                } catch (error) {
                    if (called) {
                        return
                    } else {
                        reject(error);
                    }
                }
            } else {
                resolve(x);
            }
        } else {
            resolve(x);
        }
    }

    isFunction(param) {
        return typeof param === 'function'
    }

    static resolve(value) {

    }
}