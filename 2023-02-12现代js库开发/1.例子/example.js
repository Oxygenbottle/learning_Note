console.log('测试')
function clone (source) {
    const t = type(source);
    if(t != 'object' && t !="array"){return source}
    let target;

    if(t =="object"){
        target = {};
        for(let i in source){
            if(source.hasOwnProperty(i)){
                target[i] = clone(source[i]);
            }
        }
    }else {
        target = [];
        for(let i=0; i < source.length; i++) {
            target[i] = clone(source[i]);
        }
    }
    return target;
}

// Object.prototype.toString.call([]);
// Object.prototype.toString.call({});
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call({}))

function type(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

console.log(type({}))
console.log(type([]))

let a = {c: 1};
let b = clone(a);

a.c = 2;
console.log(a);
console.log(b);

