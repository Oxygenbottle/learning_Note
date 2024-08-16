const parent = {
  get value() {
    return '19Qingfeng';
  },
};
 
const handler = {
  get(target, key, receiver) {
    console.log(this === handler); // log: true
    console.log(receiver === obj); // log: true
    return target[key];
  },
};
 
const proxy = new Proxy(parent, handler);
 
const obj = {
  name: 'wang.haoyu',
};
 
// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);
 
// log: false
obj.value