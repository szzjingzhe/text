<template>
  <div>
    <h3><van-icon name="notes-o" /> <span class="title">计时历史记录</span></h3>
    <van-empty v-if="!store.history.length" description="暂无记录" />
    <van-cell-group v-else>
      <van-cell
        v-for="(item, index) in store.history"
        :key="index"
        :title="`${item.mode === 'down' ? '倒计时' : '正计时'} - ${item.time}`"
        :label="item.timestamp"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { useTimerStore } from '../stores/timer'
const store = useTimerStore()
</script>

<style scoped>
.title {
  color: #243a74;
  font-weight: bold;
  margin-left: 4px;
}
</style>
