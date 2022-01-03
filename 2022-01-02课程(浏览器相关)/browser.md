// 浏览器原理
const clientW = window.innerWidth || document.body.clientWidth

### 监听事件捕获/事件冒泡
事件捕获 -> 目标阶段 -> 事件冒泡
**`e.target.nodeName` 是当前点击对象**
**`e.currentTarget.nodeName` 是事件绑定对象**
> addEventListener(事件,  方法,  默认false) 
第三个参数（捕获/冒泡）： true/false 

**如何组织冒泡**
e.stopPropagation();
// 阻止事件传递，不只是阻止冒泡

####  场景设计题
页面有很多元素，`div` `p` `button` ，每个元素都有自己的click事件，各不相同，现在来了一个新的需求，一个用户进入页面，有一个状态，可以从全局获取的，`window.banned` 状态如下:
`true`: 当前用户被封禁了，用户点击当前页面上的人和元素，都不会执行原有的`click` 逻辑，而是`alert` 弹窗，提示你被封禁了。
`false`: 不做任何操作。
```js
// window绑定捕获点击元素 进行阻止
const banned = window.banned;
window.addEventListener('click',function() {
    if(banned) {
        e.stopPropagation();
        alert('你被封禁了')
        return;
    }
},true)
```

#### 阻止默认行为
`e.preventDefault()`;
```js
<a herf="www.baidu.com" id="click-url">点击跳转</a>

<script>
var stopDefault = document.getElementById('click-url');
stopDefault.addEventListener('click',function() {
    e.preventDefault();
}, true)
</script>
```
> 但是有些时候需要兼容政府网站的ie7 ie8，则需要做兼容性，所以最好是进行封装，具体如下：
#### addEvent.js
```js
class BomEvent{
    constructor(element) {
        this.element = element;
    }

    addEvent(type:事件类型, handler:回调) {
        if(this.element.addEventListener) {
            this.element.addEventListener(type, handler, false); //ie不支持事件捕获
        }else if(this.element.attachEvent) {
            this.element.attachEvent(`on$(type)`,function(){
                handler.call(element);
            })
        }else { //更极端浏览器
            this.element[`on${type}`] = handler;
        }
    }

    removeEvent() {
        if(this.element.removeEventListener) {
            this.element.removeEventListener(type, handler, false);
        }else if(this.element.detachEvent) {
            this.element.detachEvent(`on$(type)`,handler)
        }else {
            this.element[`on${type}`] = null;
        }
    }

}
// 阻止事件传播
function stopPropagation(ev) {
    if(ev.stopPropagation) { 
        ev.stopPropagation(); // 标准w3c浏览器
    } else {
        ev.cancelBubble = true; // IE
    }
}

// 阻止默认事件
function stopPreventDefault(event) {
    if(event.preventDefault) {
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

        if(target.tagName.toLowerCase() === 'li') {
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
#ul{
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

xhr.open('GET','http://domain/service')

xhr.onreadystatechange = function() {
    if(xhr.readystate !== 4) {
        return;
    }
    if(xhr.status == 200) {
        console.log(xhr.responseText);
    } else {
        console.error(`HTTP error, status=${xhr.status}, errorText=${xhr.statusText}`)
    }
}

xhr.timeout = 3000;
xhr.ontimeout= () => {
    console.log('当前请求超时了')
}

xhr.upload.onprogress = p =>{
    const percent = Math.round((p.loaded / p.total) *100) + '%';
}

xhr.send();
```
#### fetch
> 内部封装了promise
```js
fetch('http://domain/service',{
    methods: 'GET',
    credentials: 'same-origin' //通榆请求 携带cookie;
}).then( res => {
    if(res.ok) {
        //请求成功
        return res.json();
    }
    throw new Error('http error')
}).then( json => {
    console.log(json);
}).catch( error => {
    console.log(error);
})

```