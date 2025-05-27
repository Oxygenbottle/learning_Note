<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue'

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color: green'
}
const arr = [1, 2, 3, 4, 5]
const msg = 'this is v-text'
onMounted(() => {
  console.log('this', this)
})
const dynamicFn = [1, 2, 3, 4].map((num) => {
  return console.log(num)
})
const author = reactive({
  name: 'sssy lin',
  books: ['vue2 - 2jkfsdjf ksd', 'vue3 - 3df,sjkfsdjf ksd', 'vue4 - 4fsd,.jkfsdjf ksd']
})
const hasPublishedBook = computed(() => {
  return author.books.length > 0 ? 'YES' : 'NO'
})
const now = computed(() => Date.now())
const count2 = ref(0)
const increment = function () {
  count2.value++
}

const obj = ref({
  nexed: { count2: 0 },
  arr: ['foo', 'bar']
})

function matateDeeply() {
  obj.value.nexed.count2++
  obj.value.arr.push('baz')
}

let state = reactive({ count: 0 })
state = reactive({ count: 1 })
console.log('state', state)
let { count } = state
console.log('结构赋值来的count', count)
</script>

<template>
  <h2 v-bind="objectOfAttrs">测试多个应用实例</h2>
  <h3>{{ arr.reverse().join('') }}</h3>
  <h3>随机数{{ Math.random() }}</h3>

  <span v-text="msg"></span>
  <div v-for="(item, index) of dynamicFn" :key="index">
    <span @click="() => item">{{ msg + index }}</span>
  </div>
  <p>{{ hasPublishedBook }}</p>
  <p>{{ now }}</p>

  <button @click="increment">计数器{{ count }}</button>
  <button @click="matateDeeply">添加内容{{ obj }}</button>

  <p>{{ state }}</p>
  <RouterView />
</template>

<style scoped></style>
