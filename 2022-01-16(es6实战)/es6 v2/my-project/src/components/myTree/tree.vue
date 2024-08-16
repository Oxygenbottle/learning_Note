<script>
import refs from "./refs.js";
let count = 0;
export default {
  name: 'tree',
  props: {
    // 树形结构传参
    options: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return [];
      }
    },
    // 选中的节点
    value: Array
  },
  data() {
    let name = `v_tree_` + ++count;
    return {
      name
    }
  },
  created() {
    // 初始化
    let name = this.name;
    refs.init({ name }, this)
  }
}
</script>
