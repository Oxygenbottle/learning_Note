// ts
let a: number = 1;
let b: string = 'hello';
let c: boolean[] = [true, false];

// js
let a1 = 1;
let b1 = 'string';
let c1 = true;

// inteface
interface User {
    name: string,
    age?: number,
    readonly id: number,
}

function printUser(user: User) {
    console.log(user.name, '/', user.age);
}
var user1: User = {
    name: "xiaohu",
    age: 189,
    id: 133
}
printUser(user1);

// 泛型
function aaa(arg: string): string {
    return arg;
}
function bbb(arg: number): number {
    return arg;
}
function aa<T>(arg: T): T {
    return arg;
}

// 枚举
enum NumEnum {
    one = "the one",
    two = "the two",
}