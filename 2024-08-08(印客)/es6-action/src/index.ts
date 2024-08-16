import { Button } from "./components/Button"
import './style/index.css';
const a = 1;
const b = 2;
const fn = <T>() => {
  a + b;
};
console.log(a + b);
console.log([1, 2, 3].map((n) => n + 1));

class Person {
  name: string;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log('Hi');
  }
}

console.log(new Person('xiaolin').sayHi())

console.log(Button)