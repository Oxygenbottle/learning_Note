<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const title = 'computed'

const author = reactive({
  name: 'wu yi',
  books: ['vue2 - advanced guide', 'vue3 - basic guide', 'vue4 - the mystery']
})
const hasPublishedBook = computed(() => {
  return author.books.length > 0 ? 'YES' : 'NO'
})
console.log('hasPublishedBook.value', hasPublishedBook.value)
console.log('hasPublishedBook', hasPublishedBook)
const pp = function () {
  console.log('parent click')
}
const cc = function () {
  console.log('child click')
}
let arr = [{ msg: '1' }, { msg: '2' }]

const checkedNames = ref([])
const msg = ref('sdf')
</script>

<template>
  <h1 style="border-top: 1px dashed #000">{{ title }}</h1>
  <p>has published books</p>
  <span>{{ hasPublishedBook }}</span
  >+------
  <span v-for="({ msg }, index) in arr" :key="index">{{ msg }}- {{ index }}</span>
  <div @click.self.ctrl="pp">
    <span>dccc</span>
    <p @click="cc" v-for="(value, key) in author" :key="key">{{ key }}:{{ value }}</p>
  </div>

  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <!-- <input type="radio" id="mike" value="Mike" v-model="checkedNames" /> -->
  <label for="mike">Mike</label>
  <p>{{ msg }}</p>
  <input v-model.lazy.trim="msg" />
</template>

<style scoped></style>
