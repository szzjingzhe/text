<template>
  <div class="timer-container">
    <div class="content-card">
      <h2 class="title">{{ mode === 'down' ? '倒计时' : '正计时' }}</h2>
      <div class="time-display">{{ formattedTime }}</div>

      <div class="actions">
        <van-button class="custom-button" icon="play-circle-o" @click="start">启动</van-button>
        <van-button class="custom-button" icon="pause-circle-o" @click="pause">暂停</van-button>
        <van-button class="custom-button" icon="replay" @click="reset">重置</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useTimerStore } from '../stores/timer'
import { formatTime } from '../utils/format'

const props = defineProps({
  mode: String,
  minutes: Number,
  seconds: Number
})

const store = useTimerStore()

// ✅ 实时同步 props.mode 到 store.mode
watch(
  () => props.mode,
  (newMode) => {
    store.mode = newMode
  },
  { immediate: true }
)

const formattedTime = computed(() => formatTime(store.time))

watch(
  () => [props.minutes, props.seconds],
  ([m, s]) => {
    if (store.mode === 'down' && !store.isRunning) {
      store.setTime(m * 60 + s)
    }
  },
  { immediate: true }
)

const start = () => {
  if (store.mode === 'down') {
    const total = props.minutes * 60 + props.seconds
    store.startTimer(total)
  } else {
    store.startTimer()
  }
}

const pause = store.pauseTimer
const reset = store.resetTimer
</script>


<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.content-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 40px 30px;
  max-width: 600px;
  width: 80vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #7bbde9;
}

.time-display {
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #7bbde9;
}

.actions {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.custom-button {
  flex: 1;
  background-color: #a2d4f4;
  color: #ffffff;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  transition: 0.3s;
}

.custom-button:hover {
  background-color: #7bbde9;
}
</style>
