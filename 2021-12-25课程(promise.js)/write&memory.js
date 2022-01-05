const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      reject(error);
    }
  }
  get status() {
    return this._status
  }
  set status(newValue) {
    this._status = newValue;
    switch (newValue) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback()
        })
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback => {
          callback()
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

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled(this.value) : (value) => value;
    const realOnRejected = this.isFunction(onRejected) ? onRejected(this.reason) : (reason) => reason;

    let promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 如果这里
            const x = realOnFulfilled(this.value);
            this.resolvepromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 如果这里
            const x = realOnRejected(this.reason);
            this.resolvepromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      switch (this.status) {
        case FULFILLED: {
          fulfilledMicrotask();
          break;
        }
        case REJECTED: {
          rejectedMicrotask();
          break;
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
          break;
        }
      }
    })
    return promise2;
  }
  resolvepromise(promise2, x, resolve, reject) {

  }
  isFunction(fn) {
    return typeof fn === "function"
  }
}