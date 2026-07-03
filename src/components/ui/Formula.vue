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
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow-x: auto;
}
.formula-box.inline {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 4px;
  font-size: 15px;
}
.formula-content {
  font-size: 16px;
}
:deep(.katex-display) { margin: 0; }
</style>
