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
  },
};
</script>

<style></style>
