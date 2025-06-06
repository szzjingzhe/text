import { createApp } from 'vue'
import App from './App.vue'

// 引入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 Pinia 状态管理
import { createPinia } from 'pinia'

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(createPinia())
app.use(Vant)

// 挂载到 #app
app.mount('#app')
