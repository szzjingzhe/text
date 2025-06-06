// ✅ 格式化秒数为 MM:SS（防止 NaN、负数）
export function formatTime(seconds) {
  seconds = Number(seconds)
  if (isNaN(seconds) || seconds < 0) seconds = 0

  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ✅ 保存数据到 localStorage（自动转 JSON）
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`保存到 localStorage 出错：${err}`)
  }
}

// ✅ 从 localStorage 读取并解析
export function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error(`读取 localStorage 出错：${err}`)
    return null
  }
}
