import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Reactive from './reactive.vue'
import Computed from './computed.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.errorHandler = (err) => {
  /** 处理错误 */
  console.log('处理错误', err)
}
app.mount('#app')

// 第二个实例
const appReactive = createApp(Reactive)
appReactive.config.globalProperties.msg = 'hello'
appReactive.mount('#reactive')

// 第二个实例
const appComputed = createApp(Computed)
appComputed.config.globalProperties.msg = 'hello'
appComputed.mount('#computed')