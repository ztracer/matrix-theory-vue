<template>
  <div class="anim-box">
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
  step: { type: Boolean, default: false }
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
.anim-title { font-weight: 600; color: #4f46e5; font-size: 15px; }
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
}
.anim-canvas-wrap :deep(svg), .anim-canvas-wrap :deep(canvas) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fafbff;
  border: 1px solid #e2e8f0;
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
</style>
