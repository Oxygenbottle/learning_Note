type responseData<T, L> = {
  code: number;
  userId?: string;
  data: T;
  config: L
}
// union type
type IconSize = "small" | "large" | "default" | number
const jiangjun: IconSize = 'small'

const IconSize = ["small", "large", "default"] as const

/**  (typeof IconSize)[number]
 * (typeof IconSize) 是取出类型，但是其中是数组
 * 正常数组的取值是 arr[0] arr[1] arr[2] 但是如何取出全部的值
 * 就可以使用    [number]
 */
type BaseIconSizePlus = (typeof IconSize)[number];

// 联合数据 用 `|`
type IconSizePlus = BaseIconSizePlus | number;
const xiaobing: IconSizePlus = 'small'


// 交叉数据 用 `&`
type PrimaryButton = IconSizePlus & { //交叉自身
  type: "primary"
}



// 类型保护
type Woman = {
  type: 'woman';
  huazhuang: boolean;
}
type Man = {
  type: 'man';
  hobby: string[]
}
// as 是用来做类型断言
type Human = Woman | Man;
let person: Human = {} as Human


// person.hobby 这段代码无法运行，因为此时不知道 person 是男是女
if (person.type === 'woman') { }
if (person.type === 'man') { }

// 类型断言通常这么做
function isWoman(human: Human): human is Woman {
  return human.type === "woman";
}
function isMan(human: Human): human is Man {
  return human.type === 'man'
}
const testSex = isWoman(human) ? true : false;