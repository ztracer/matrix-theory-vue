<template>
  <div class="formula-box" :class="{ block: display, inline: !display }">
    <span class="formula-content" :class="{ 'formula-block': display, 'formula-inline': !display }">
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
defineProps({
  display: { type: Boolean, default: true }
})
</script>

<style scoped>
.formula-box {
  margin: 16px 0;
  padding: 16px 20px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
  border-left: 4px solid #6366f1;
  border-radius: 0 8px 8px 0;
  overflow-x: auto;
}
.formula-box.inline {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 4px;
  border-left-width: 2px;
  font-size: 15px;
}
.formula-content {
  font-size: 16px;
}
:deep(.katex-display) { margin: 0; }
</style>
