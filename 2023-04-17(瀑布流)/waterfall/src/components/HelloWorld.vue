<script setup>
import { onMounted, ref } from "vue";
import WaterFall from "../core/waterfall";
import lazyload from "../core/lazyload";
import { debounce } from "../utils";

import img_1 from "../assets/img_1.png";
import img_2 from "../assets/img_2.png";
import img_3 from "../assets/img_3.png";
import img_4 from "../assets/img_4.png";
import img_5 from "../assets/img_5.png";
import img_6 from "../assets/img_6.png";
import img_7 from "../assets/img_7.png";
const imgList = [img_1, img_2, img_3, img_4, img_5, img_6, img_7];

defineProps({
  msg: String,
});
onMounted(() => {
  // 1.瀑布流
  let wf = new WaterFall();
  wf.init();
  // 2.懒加载 优化性能
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  // 2.初始化懒加载
  lazyload(lazyImages);

  // 3.滚动监听
  // document.addEventListener("scroll", function () {
  //   lazyload(lazyImages);
  // });
  // 滚动监听优化，加入防抖 & 节流
  document.addEventListener("scroll", function () {
    debounce(lazyload(lazyImages));
  });

  // 4.单例模式优化  vue3.0或者是ts报错
  WaterFall.getInstance().init();
});
</script>

<template>
  <div class="cont">
    <div class="box" v-for="img of 7" :key="img">
      <div class="pic">
        <img
          class="lazy"
          width="500"
          :height="`${100 * Math.random() * 7}`"
          src="../assets/empty.png"
          :data-src="imgList[img - 1]"
          alt=""
        />
      </div>
    </div>
    <div class="box" v-for="img of 7" :key="img">
      <div class="pic">
        <img
          class="lazy"
          width="500"
          :height="`${100 * Math.random() * 7}`"
          src="../assets/empty.png"
          :data-src="imgList[img - 1]"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  width: 1000px;
  height: 1500px;
  margin: 0 auto;
  position: relative;
  /* background-color: greenyellow; */
}
.box {
  float: left;
  padding: 15px 0 0 15px;
}
.pic {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
}
.pic img {
  width: 190px;
}
</style>
