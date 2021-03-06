// 树的抽象类
class Ref {
  // 构建实例
  constructor(opts, tree) {
    let name = this.name = opts.name;
    this.tree = tree;
    this.refs = {};
    refs[name] = this;
  }

  // 获取方法
  get(cid) {
    return cid ? this.$refs[cid] : this.tree;
  }

  // 挂载方法
  set(vm) {
    let cid = vm.cid;
    this.refs[cid] = vm;
  }
}

// 抽象对象的根节点refs
let refs = {};

// 初始化工厂生产实例
let init = function (opts, tree) {
  let name = opts.name;
  if (!refs[name]) {
    return new Ref(opts, tree);
  }
  return refs[name];
}

// 销毁实例
let destroy = function (name) {
  refs[name] && delete refs[name];
}

// 获取
let get = function (name, cid) {
  return refs[name] && refs[name].get(cid);
}

// 设置
let set = function (name, vm) {
  refs[name] && refs[name].set(vm);
}

export default {
  init,
  destroy,
  get,
  set
}
