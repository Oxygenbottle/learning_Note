<template>
  <div>test</div>
</template>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // vue使用vant中的popup层,在popup层中加搜索功能后,input框获取焦点 ios机型的软键盘不会将popup顶起来的问题
    // https://blog.csdn.net/Benz_s600/article/details/132492078
    getFocus() {
      let events = navigator.userAgent;
      // iphone手机 软键盘第一次顶不起来
      if (events.indexOf("iPhone") > -1) {
        this.$nextTick(() => {
          let documents: any = document;
          if (documents == undefined || documents == null) {
            return;
          }
          if (
            documents.activeElement.tagName === "INPUT" ||
            documents.activeElement.tagName === "TEXTAREA"
          ) {
            window.setTimeout(function () {
              documents.scrollingElement.scrollTop = documents.querySelector(
                ".per_class_scroll_view"
              ).scrollHeight;
            }, 200);
          }
        });
      }
    },
  },
};
</script>

<style></style>
