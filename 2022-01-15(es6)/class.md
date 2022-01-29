##class 助力js更面向对象 - 类
```js
    // 传统对象 - function
    function Course(teacher, course) {
        this.teacher = teacher;
        this.course =  course;
    }

    Course.prototype.getCourse = function() {
        return ``
    }
    const course = new Course('yuyin','es6');
    course.getCourse();


    // ES6
    class Course {
        constructor() {}
    }
```

### 追问
### class的类型是？
```js
    console.log(typeOf Course); 
    // function
```

### class的prototype是?
```js
    console.log(Course.prototype); 
    // 有区分，但是本质类型相同，
```

### class && 函数对象 属性
```js
    console.log()
```

### 属性定义 构造器& 顶层定义  两种定义方式
```js
    



    // 2. js 如何简历一个私有属性'

    class Course {
        constructor (teacher, course) {
            this._teacher =  teacher;


        }
    }

    // 3. 封装核心 - 适配器模式
    // 底层封装中台业务core
    class utils {
        constructor (core) {
            this._main = core;
            this._name = 'my-utils';
        }
        get name() {
            return {
                ...this._main.name,
                name: `name is ${this._name}`
            }
        }
        set name(val) {
            // 开放接口，但是需要用我们定义的方法修改
            // valid saftey - 安全性的接口协议，部分要前提校验或者其他
            this._name = val;
        }
    }

```


### 静态方法 - 直接挂载在类上的方法无需实例化获取
```js
    // ES5
    function Course() {
        //...     
    }
    // 进行挂载
    Course.ring = function() {
        //...
    }
    Course.ring();//调用


    //ES6
    class Course {
        cons

        static ring() {
            //...
        }
    }
    Course.ring();//调用
    // 通常用来解决 全局对象变量问题
```


### 继承
```js
    //es5继承
    function Course() {}

```