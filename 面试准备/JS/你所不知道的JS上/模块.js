var myModule = (function () {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      // console.log('for 循环的modules[deps[i]]', modules[deps[i]])
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps);
    console.log('apply to do ', impl, deps)
  }

  function get(name) {
    return modules[name]
  }

  return {
    define,
    get
  }
})();


myModule.define('bar', [], function () {
  function hello(who) {
    return 'Let me to introduce: ' + who;
  }
  return {
    hello: hello
  }
})


myModule.define('foo', ['bar'], function (bar) {
  var hungry = 'hippo';

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  }
})


var bar = myModule.get('bar')
var foo = myModule.get('foo')

console.log(
  bar.hello('hippo')
)

try {
  foo.awesome();
} catch (error) {
  console.log('error', error)
}