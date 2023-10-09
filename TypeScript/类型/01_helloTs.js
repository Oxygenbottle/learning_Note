console.log('hello ts');
// let a: number;
// a = 10;
// let b: string;
// b = '123';
// 声明完变量可以直接赋值
// let c: boolean = false;
// 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
// let c = true;
function sum(a, b) {
    return a + b;
}
var temp = sum(123, 456);
console.log('sum result', temp);
