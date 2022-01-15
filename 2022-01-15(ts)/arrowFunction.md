## 箭头函数
```js
    // 传统函数
    function test(a,b) {
        return a + b;
    }
    const test2 = function(a, b) {
        return a + b;
    }

```

```js
    //ES6
    const test3 = (a,b) => {
        return a+ b
    };
    const test3 = (a,b) => a+ b;
    const test4 = x => {

    }
    const test5 = () => {

    }
```

#### 上下文
```js
    // ES6  context
    const obj2 = {
        teacher: "yunyin",
        leader: "xiaoke",
        zhuawa: [],
        getTeacher: function() {
            console.log('teacher is:', this.teacher)
            return this.teacher;
        },
        getLeader: () => {
            console.log('leader is',this.leader);
            return this.leader;
        }
    }

```

## 追问： 上下文形成的原因，箭头函数并不会形成独立的上下文，内部的this指向了window
### 场景
#### 场景1： dom操作cb时
```js
    const btn = documnet.querySelector('#btn');

    btn.addEventListener('click', function() {
        this.style.color = "#fff";
    })
```

#### 场景2： 类操作
```js
    function Obj(teacher, leader) {

    }

    // 
    const Obj = () => {

    }



```


### 箭头函数的参数特性 - 无法使用argument
```js
    const 

```