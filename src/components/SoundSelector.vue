<template>
  <div>
    <h3><van-icon name="bell" /> <span class="title">铃声设置</span></h3>
    <van-field
      label="选择铃声"
      readonly
      clickable
      :value="selectedSound"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="sounds"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <van-uploader :after-read="onUpload" :max-count="1" :preview-image="false">
      <van-button type="primary">上传</van-button>
    </van-uploader>

    <van-button
      type="success"
      icon="play-circle-o"
      style="margin-left: 10px"
      @click="playSound"
    >
      试听铃声
    </van-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTimerStore } from '../stores/timer'

const store = useTimerStore()
const selectedSound = ref(store.selectedSound)
const showPicker = ref(false)
const sounds = ref([])

const onConfirm = (value) => {
  selectedSound.value = value
  store.selectedSound = value
  localStorage.setItem('selectedSound', value)
  showPicker.value = false
}

const playSound = () => {
  const audio = new Audio(`/sounds/${selectedSound.value}`)
  audio.play().catch((err) => {
    alert('铃声播放失败：' + err.message)
  })
}

const onUpload = (file) => {
  // 伪上传，仅测试用，本地不会自动生效
  alert('上传功能暂未实现，文件名：' + file.file.name)
}

onMounted(() => {
  // 自动读取 public/sounds 目录音频文件列表（静态模拟）
  sounds.value = ['default.mp3', 'clear.mp3', 'soft.mp3']
})
</script>

<style scoped>
.title {
  color: #243a74;
  font-weight: bold;
  margin-left: 4px;
}
</style>
