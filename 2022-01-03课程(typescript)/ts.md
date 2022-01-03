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