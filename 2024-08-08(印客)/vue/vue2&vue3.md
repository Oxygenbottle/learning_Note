### vue 的响应式原理

#### vue2的数据劫持，

```js
  const initData = {
      value: 1,
  }
  const data = {};
  initData.forEach
  Object.keys(initData).forEach((key) => {
      Object.defineProperty(data, key, {
          get() {
              console.log('访问元素')
              return initData[key];
          },
          set(v) {
              console.log('修改元素');
              initData[key] = v
          }
      })
  })
```

#### vue3的数据

```js
const initData = {
    value: 1,
}

const handle = {
    getPrototypeOf(target) {
        console.log('getPrototypeOf', target)
    },
    get: function(target, prop, reciver) {
        console.log('called:', target, prop)
    },
    set: function(v) {

    }
}
const proxy = new Proxy(initData, handle)
```
#### reflect
```js
const duck = {
  name: "Maurice",
  
}
```