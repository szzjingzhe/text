import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formatTime, saveToStorage, loadFromStorage } from '../utils/format.js'

export const useTimerStore = defineStore('timer', () => {
  const time = ref(0)
  const isRunning = ref(false)
  const mode = ref('down')
  const initialTime = ref(0)
  /** @type {import('vue').Ref<number|null>} */
  const timerId = ref(null)

  const history = ref(loadFromStorage('timer-history') || [])
  const selectedSound = ref(localStorage.getItem('selectedSound') || 'default.mp3')

  const setTime = (seconds) => {
    time.value = seconds
  }

  let hasRecorded = false

 const startTimer = (seconds = time.value) => {
  if (isRunning.value) return

  hasRecorded = false
  isRunning.value = true

  if (mode.value === 'down') {
    initialTime.value = seconds
    time.value = seconds
    timerId.value = setInterval(() => {
      if (time.value > 0) {
        time.value--
      } else {
        stopAndRecord()
      }
    }, 1000)
  } else {
    initialTime.value = 0  // ✅ 正计时从 0 开始记录
    time.value = 0         // ✅ 关键修复点
    timerId.value = setInterval(() => {
      time.value++
    }, 1000)
  }
}


  const pauseTimer = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
    isRunning.value = false
  }

  const stopAndRecord = () => {
    if (hasRecorded) return
    pauseTimer()

    if (mode.value === 'down') {
      time.value = 0
    }

    playEndSound()
    addHistory()
    hasRecorded = true
  }

  const resetTimer = () => {
    stopAndRecord()
    time.value = 0
    initialTime.value = 0
  }

  const addHistory = () => {
    const now = new Date().toLocaleString()
    const baseTime = mode.value === 'down' ? initialTime.value : time.value
    const formatted = formatTime(Number(baseTime))
    history.value.unshift({
      time: formatted,
      mode: mode.value,
      timestamp: now
    })
    saveToStorage('timer-history', history.value)
  }

  const playEndSound = () => {
    const audio = new Audio(`/sounds/${selectedSound.value}`)
    audio.play().catch((e) => {
      console.warn('铃声播放失败：', e)
    })
  }

  return {
    time,
    isRunning,
    mode,
    history,
    selectedSound,
    setTime,
    startTimer,
    pauseTimer,
    resetTimer
  }
})
