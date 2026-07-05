<template>
  <!-- 自动循环动画模式：无控制按钮，自动高亮流动 -->
  <div v-if="mode === 'auto'" class="anim-box auto-mode">
    <div class="anim-header">
      <span class="anim-title">🔄 {{ title }}</span>
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
      <div v-if="!hideControls" class="anim-controls">
        <button class="ctrl-btn" :disabled="playing" @click="$emit('play')">▶ 播放</button>
        <button class="ctrl-btn" :disabled="!playing" @click="$emit('pause')">⏸ 暂停</button>
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
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  min-width: 0;
  max-width: 100%;
}
.anim-box.auto-mode {
  border-color: var(--color-border);
  background: var(--color-card);
}
.anim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 8px;
}
.auto-mode .anim-header {
  background: var(--color-card);
  border-bottom-color: var(--color-border);
}
.anim-title { font-weight: 700; color: var(--color-foreground); font-size: 15px; }
.auto-mode .anim-title { color: var(--color-foreground); }
.anim-controls { display: flex; gap: 6px; flex-wrap: wrap; }
.ctrl-btn {
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all .18s ease;
  color: var(--color-secondary);
  font-family: inherit;
}
.ctrl-btn:hover:not(:disabled) {
  background: var(--color-brand);
  color: var(--color-on-brand);
  border-color: var(--color-brand);
}
.ctrl-btn:disabled { opacity: .4; cursor: not-allowed; }
.anim-canvas-wrap {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-card);
  max-width: 100%;
  min-width: 0;
  overflow-x: auto; /* 允许SVG/Canvas横向滚动 */
  overflow-y: visible;
}
.anim-canvas-wrap :deep(svg), .anim-canvas-wrap :deep(canvas) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  display: block;
}
.anim-desc {
  margin: 0;
  padding: 10px 16px;
  font-size: 13px;
  color: var(--color-muted-foreground);
  background: var(--color-background);
  text-align: center;
  border-top: 1px solid var(--color-border);
}
.auto-mode .anim-desc {
  background: var(--color-background);
  color: var(--color-muted-foreground);
  border-top-color: var(--color-border);
}

@media (max-width: 768px) {
  .anim-header {
    padding: 12px;
  }
  .anim-title {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .anim-controls {
    width: 100%;
  }
  .ctrl-btn { min-height: 44px; padding: 10px 16px; }
  .anim-canvas-wrap {
    padding: 12px;
    justify-content: flex-start;
  }
  .anim-canvas-wrap :deep(svg),
  .anim-canvas-wrap :deep(canvas) {
    max-width: 100%;
  }
  .anim-desc {
    padding: 10px 12px;
    text-align: left;
  }
}
</style>
