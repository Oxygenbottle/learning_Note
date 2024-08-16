const parent = {  

    name: '19Qingfeng',  
    get value() {    
        return this.name;  
    },

}; 
const handler = {  

    get(target, key, receiver) {    return Reflect.get(target, key);    // 这里相当于 return target[key]  },}; const proxy = new Proxy(parent, handler); const obj = {  name: 'wang.haoyu',}; // 设置obj继承与parent的代理对象proxyObject.setPrototypeOf(obj, proxy); // log: falseconsole.log(obj.value);复制代码
