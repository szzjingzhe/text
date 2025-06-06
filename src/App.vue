<template>
  <div class="app-container">
    <!-- 顶部 Logo -->
    <div class="logo">
      简易计时器
    </div>

    <!-- 顶部 Tab -->
    <van-tabs v-model:active="activeTab" background="transparent" title-active-color="#2d3e78">
      <van-tab title="⏰ 倒计时">
        <div class="section countdown-section">
          <!-- ✅ 传入 minutes 和 seconds -->
          <Timer :mode="'down'" :minutes="selectedMinutes" :seconds="inputSeconds" />
        </div>
      </van-tab>
      <van-tab title="📋 正计时">
        <div class="section">
          <!-- ✅ 传入 minutes 和 seconds -->
          <Timer :mode="'up'" :minutes="selectedMinutes" :seconds="inputSeconds" />
        </div>
      </van-tab>
    </van-tabs>

    <!-- ⏰ 设置倒计时时间 + 铃声设置 -->
    <div class="section settings-container">
      <h3><van-icon name="clock-o" /> 设置倒计时时间</h3>
      <div class="row">
        <van-dropdown-menu active-color="#243a74" style="width: 40%">
          <van-dropdown-item v-model="selectedMinutes" :options="minuteOptions" />
        </van-dropdown-menu>
        <van-field
          v-model.number="inputSeconds"
          type="digit"
          placeholder="秒数"
          input-align="center"
          style="width: 55%; margin-left: 5%"
        />
      </div>

      <h3 style="margin-top: 16px">
        <van-icon name="bell-o" /> 铃声设置
      </h3>
      <div class="row">
        <van-dropdown-menu active-color="#243a74" style="width: 60%">
          <van-dropdown-item v-model="selectedSound" :options="soundOptions" />
        </van-dropdown-menu>
        <van-button icon="upload" type="primary" @click="upload">上传</van-button>
      </div>
    </div>

    <!-- 历史记录 -->
    <History />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Timer from './components/Timer.vue'
import History from './components/History.vue'
import { useTimerStore } from './stores/timer'

const activeTab = ref(0)

// 🕒 时间设置
const selectedMinutes = ref(5)
const inputSeconds = ref(0)
const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
  text: `${i + 1} 分钟`,
  value: i + 1
}))

// 🔔 铃声设置
const selectedSound = ref(localStorage.getItem('selectedSound') || 'default.mp3')
const soundOptions = [
  { text: '默认铃声', value: 'default.mp3' },
  { text: '柔和铃声', value: 'soft.mp3' },
  { text: '清脆铃声', value: 'clear.mp3' }
]

// store 联动
const store = useTimerStore()

// 同步时间
watch([selectedMinutes, inputSeconds], ([m, s]) => {
  const total = m * 60 + s
  if (!store.isRunning) {
    store.setTime(total)
  }
})

// 同步铃声
watch(selectedSound, (val) => {
  store.selectedSound = val
  localStorage.setItem('selectedSound', val)
})

const upload = () => {
  alert('上传功能暂未实现，请手动放入 public/sounds 文件夹。')
}
</script>

<style scoped>
.app-container {
  font-family: 'Microsoft YaHei', sans-serif;
  color: #2d3e78;
  background: linear-gradient(to bottom, #fff0f5, #ffeaf0);
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.logo {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.section {
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  margin-bottom: 24px;
}

.countdown-section {
  background-image: url("https://upload-bbs.miyoushe.com/upload/2025/05/20/296292055/f796c6b4fd20499ac4b0add8beb2a9cb_7000140118988470381.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.settings-container h3 {
  font-size: 18px;
  margin-bottom: 8px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

@media screen and (max-width: 768px) {
  .logo {
    font-size: 20px;
  }
  .section {
    padding: 12px;
  }
}
</style>
