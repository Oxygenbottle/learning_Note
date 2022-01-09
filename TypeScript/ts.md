## TypeScript
**环境搭建**
1.安装node.js
2.全局npm typescript
3.创建ts,使用tsc对文件进行编译

#### 类型
```ts
let a: number;
a = 10;
let b: string;
b = '123';
// 声明完变量可以直接赋值
let c: boolean = false;
// 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
let c = true;
function sum(a: number, b: number) {
    return a + b;
}
sum(a:123, b:456);
let result = sum(a:123, b:456);
// result的类型就是number;
```

####
#### 泛型
```ts
function fn(a: any): any{
    return a;
}
//当上述类型不明确的时候，就可以使用泛型,使用方法如下
function fn<T>(a: T): T{
    return a;
}

// 可以直接调用具有泛型的函数
fn(a: 10); // 不指定泛型，ts可以自动推断
fn<string>(a: 'hello'); // 指定泛型为string

let result = fn(a: 10);
let result2 = fn<string>(a: 'hello');

function fn<T,K>(a: T,b: K):  T{
    console.log(b);
    return a;
}
fn2<number, string>(a:123, b:'hello')
```