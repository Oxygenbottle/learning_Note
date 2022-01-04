// 浏览器原理
const clientW = window.innerWidth || document.body.clientWidth

### 监听事件捕获/事件冒泡

事件捕获 -> 目标阶段 -> 事件冒泡
** `e.target.nodeName` 是当前点击对象**
** `e.currentTarget.nodeName` 是事件绑定对象**

> 传参：addEventListener(事件, 方法, 默认false) 

第三个参数（捕获/冒泡）： true/false 

**如何阻止冒泡**
 `e.stopPropagation(); `

// 阻止事件传递，不只是阻止冒泡

####  场景设计题

页面有很多元素， `div`  `p`  `button` ，每个元素都有自己的click事件，各不相同，现在来了一个新的需求，一个用户进入页面，有一个状态，可以从全局获取的， `window.banned` 状态如下:
`true` : 当前用户被封禁了，用户点击当前页面上的人和元素，都不会执行原有的 `click` 逻辑，而是 `alert` 弹窗，提示你被封禁了。
`false` : 不做任何操作。

```js
// window绑定捕获点击元素 进行阻止
const banned = window.banned;
window.addEventListener('click', function() {
    if (banned) {
        e.stopPropagation();
        alert('你被封禁了')
        return;
    }
}, true)
```

#### 阻止默认行为

`e.preventDefault()` ; 

```js
< a herf = "www.baidu.com"
id = "click-url" > 点击跳转 < /a>

    <
    script >
    var stopDefault = document.getElementById('click-url');
stopDefault.addEventListener('click', function() {
        e.preventDefault();
    }, true) <
    /script>
```

> 但是有些时候需要兼容政府网站的ie7 ie8，则需要做兼容性，所以最好是进行封装，具体如下：

#### addEvent.js

```js
class BomEvent {
    constructor(element) {
        this.element = element;
    }

    addEvent(type: 事件类型, handler: 回调) {
        if (this.element.addEventListener) {
            this.element.addEventListener(type, handler, false); //ie不支持事件捕获
        } else if (this.element.attachEvent) {
            this.element.attachEvent(`on$(type)`, function() {
                handler.call(element);
            })
        } else { //更极端浏览器
            this.element[`on${type}`] = handler;
        }
    }

    removeEvent() {
        if (this.element.removeEventListener) {
            this.element.removeEventListener(type, handler, false);
        } else if (this.element.detachEvent) {
            this.element.detachEvent(`on$(type)`, handler)
        } else {
            this.element[`on${type}`] = null;
        }
    }

}
// 阻止事件传播
function stopPropagation(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation(); // 标准w3c浏览器
    } else {
        ev.cancelBubble = true; // IE
    }
}

// 阻止默认事件
function stopPreventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = true;
    }
}
```

#### 写一个事件代理

```html
<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF-8">
</head>

<body>
    <ul id="ul">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
    </ul>
</body>

<script type="text/javascript">
    const ul = document.getElementById('ul');

    ul.addEventListener("click", function(e) {
        const target = e.target;

        if (target.tagName.toLowerCase() === 'li') {
            const liList = this.querySelectorAll('li');

            // 原生js
            const index = Array.prototype.indexOf.call(liList, target);
            //  es6
            const realLiList = Array.from(liList);
            const index = realLiList.indexOf(target);
            alert(`${target.innerHTML},索引${index}`)
        }
    })
</script>

<style>
    #ul {
        background-color: gray;
        width: 500px;
        display: flex;
        flex-direction: column;
    }
</style>

</html>
```

#### new XMLHttpRequest(); 

```js
const xhr = new XHRHttpRequest();

xhr.open('GET', 'http://domain/service')

xhr.onreadystatechange = function() {
    if (xhr.readystate !== 4) {
        return;
    }
    if (xhr.status == 200) {
        console.log(xhr.responseText);
    } else {
        console.error(`HTTP error, status=${xhr.status}, errorText=${xhr.statusText}`)
    }
}

xhr.timeout = 3000;
xhr.ontimeout = () => {
    console.log('当前请求超时了')
}

xhr.upload.onprogress = p => {
    const percent = Math.round((p.loaded / p.total) * 100) + '%';
}

xhr.send();
```

#### fetch

> 内部封装了promise

```js
fetch('http://domain/service', {
    methods: 'GET',
    credentials: 'same-origin' //同域请求 携带cookie;
}).then(res => {
    if (res.ok) {
        //请求成功
        return res.json();
    }
    throw new Error('http error')
}).then(json => {
    console.log(json);
}).catch(error => {
    console.log(error);
})
```

> (本身不支持)封装超时

```js
function fetchTimeout(url, init, timeout = 3000) {
    return new Promise((resolve, reject) => {
        fetch(url, init).then(resolve).catch(reject);
        // 这里上方的逻辑是正常运行的，与下方setTimeout同步，
        // 然后 promise的状态也应该是正常改变的，
        // 如果在事件内先进行了resolve/reject 改变了promise 的status;
        // 则下方的超时就无效，反之则超时
        setTimeout(reject, timeout); // 超时执行
    })
}
```

> 课后作业

function xx(fn , timeout) {

    ...

}

#### 中断fetch

```js
    const controller = new AbortController(); //定义
    fetch('http://domain/service', {
        methods: 'GET',
        credentials: 'same-origin'，
        signal: controller.siganal // 引用
    }).then(res => {
        if (res.ok) {
            //请求成功
            return res.json();
        }
        throw new Error('http error')
    }).then(json => {
        console.log(json);
    }).catch(error => {
        console.log(error);
    })

    controller.abort(); // 调用
```

#### request header 请求头

 `method`

 `path`

 `cookie`

> 面试题

cdn 域名 和 业务域名不相同
// www.baidu.com  业务域名
// cdn.baidu-aa.com  cdn域名

> 答
> 1. 安全问题

不愿意将自己的用户信息，暴露给第三方的cdn厂商

> 2. cdn

request header 会携带cookie，浪费更多资源, 带宽占用

> 3. 并发请求数(http1.1-有同域最大限制)

http2.0 没有最大限制

`referer` : 判断当前浏览器来自哪个页面
// 标识访问路径

`user-agent` : aweme_11.x.xx(抖音) 
//用于判断不同APP环境或者手机环境 ios/安卓

#### response header

`access-control-allow-origin` : http://www.baidu.com
//只允许百度 *: 任意
`content-encoding` : gzip
`set-cookie` : 

#### status /状态

200
201
301 永久重定向
302 临时重定向
304 协商缓存，服务器文件未修改

> http 缓存分为：强缓存，协商缓存

强缓存：

>> max-age: 1000接收时间偏移来判断过期(更好)
>> expired: 时间节点判断过期，服务器时间不校对时，会出现误差
>
> 协商缓存：
>> last-modified: 上一次修改时间（打开关闭就会修改）
>> etag: 使用哈希 来判断是否有修改

####面试题

> vue/react spa单页面

都会有一个index.html 入口文件
针对index.html 如果要缓存，用什么缓存
答  
index.html一般不做缓存
如果一定要做，做协商缓存
index.html没有hash

```ts
interface IOptions {
    url: string;
    type?: "GET" | "POST";
    data: any:
    timeout?: number;
}

function formatUrl(object) {
    // a=xxx ; queryString
    let dataArr = [];
    for(let key in object){
        dataArr.push(`${key}=${encodeURIComponent(object[key])}`)
    } 
    return dataArr.join("&")
}

export function ajax(options:IOptions = {
    url: "",
    type: "GET",
    data: {},
    timeout: 3000,
}){
    return new Promise((resolve, reject) =>{
        if(!options.url) {
            return;
        }

        const queryString = formatUrl(options.data);
        let timer;
        let xhr;

        const onStateChange = () => {
            xhr.onreadystatechange = () =>{
                if(xhr.readyState === 4) {
                    clearTimeout(timer)
                    if(xhr.status >== 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.status);
                    }
                }
            }
        }
        
        // 这里的window 其实需要用一个单独的ts文件来定义
        if( (window as any).XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }else {
            xhr = new XMLHttpRequest("Microsoft.XMLHTTP");
        }

        if(options.type.toUpperCase() === "GET") {
            xhr.open("GET", `${options.url}?${queryString}`);
            onStateChange();
            xhr.send();
        }else if(options.type.toUpperCase() === "POST") {
            xhr.open("POST", options.url);
            xhr.setRequestHeader(
                "ContentType": "application / x-www-form-urlencoded"
            );
            onStateChange();
            xhr.send();
        }

       

        if(options.timeout) {
            timer = setTimeout(() =>{
                xhr.abort();
                reject('timeout')
            }, options.timeout);
        }
    });
}
```
