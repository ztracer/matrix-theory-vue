<template>
  <!-- 自动循环动画模式：无控制按钮，自动高亮流动 -->
  <div v-if="mode === 'auto'" class="anim-box auto-mode">
    <div class="anim-header">
      <span class="anim-title">🔄 {{ title }}</span>
      <span class="auto-badge">自动演示</span>
    </div>
    <div class="anim-canvas-wrap">
      <slot></slot>
    </div>
    <p v-if="description" class="anim-desc">{{ description }}</p>
  </div>

  <!-- 交互动画模式：有播放/暂停/重置按钮 -->
  <div v-else class="anim-box">
    <div class="anim-header">
      <span class="anim-title">🎬 {{ title }}</span>
      <div class="anim-controls" v-if="!hideControls">
        <button class="ctrl-btn" @click="$emit('play')" :disabled="playing">▶ 播放</button>
        <button class="ctrl-btn" @click="$emit('pause')" :disabled="!playing">⏸ 暂停</button>
        <button class="ctrl-btn" @click="$emit('reset')">↺ 重置</button>
        <button v-if="step" class="ctrl-btn" @click="$emit('step')">⏭ 步进</button>
        <slot name="controls"></slot>
      </div>
    </div>
    <div class="anim-canvas-wrap">
      <slot></slot>
    </div>
    <p v-if="description" class="anim-desc">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '交互动画' },
  playing: { type: Boolean, default: false },
  description: String,
  hideControls: Boolean,
  step: { type: Boolean, default: false },
  mode: { type: String, default: 'interactive' } // 'interactive' | 'auto'
})
defineEmits(['play', 'pause', 'reset', 'step'])
</script>

<style scoped>
.anim-box {
  margin: 20px 0;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.anim-box.auto-mode {
  border-color: #a5b4fc;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
}
.anim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 8px;
}
.auto-mode .anim-header {
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  border-bottom-color: #c7d2fe;
}
.anim-title { font-weight: 600; color: #4f46e5; font-size: 15px; }
.auto-mode .anim-title { color: #4338ca; }
.auto-badge {
  font-size: 11px; padding: 3px 10px; border-radius: 12px;
  background: linear-gradient(135deg,#4338ca,#6366f1); color: #fff;
  animation: pulse-badge 2s ease-in-out infinite;
}
@keyframes pulse-badge {
  0%,100% { opacity:1; }
  50% { opacity:.7; }
}
.anim-controls { display: flex; gap: 6px; flex-wrap: wrap; }
.ctrl-btn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all .15s;
  color: #475569;
  font-family: inherit;
}
.ctrl-btn:hover:not(:disabled) {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
.ctrl-btn:disabled { opacity: .4; cursor: not-allowed; }
.anim-canvas-wrap {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  overflow-x: auto; /* 允许SVG/Canvas横向滚动 */
}
.anim-canvas-wrap :deep(svg), .anim-canvas-wrap :deep(canvas) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fafbff;
  border: 1px solid #e2e8f0;
  display: block;
}
.anim-desc {
  margin: 0;
  padding: 10px 16px;
  font-size: 13px;
  color: #64748b;
  background: #f1f5f9;
  text-align: center;
  border-top: 1px solid #e2e8f0;
}
.auto-mode .anim-desc {
  background: #e0e7ff;
  color: #4338ca;
  border-top-color: #c7d2fe;
}
</style>
