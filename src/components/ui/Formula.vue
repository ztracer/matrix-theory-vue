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
  overflow-y: visible;
  max-width: 100%;
  min-width: 0;
}
.formula-box.inline {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 4px;
  font-size: 15px;
}
.formula-content {
  font-size: 16px;
  max-width: 100%;
}
:deep(.katex-display) { margin: 0; }

@media (max-width: 600px) {
  .formula-box {
    margin: 12px 0;
    padding: 12px;
    border-radius: 10px;
  }
  .formula-box.inline {
    max-width: 100%;
    padding: 1px 4px;
    margin: 0 2px;
    vertical-align: baseline;
  }
  .formula-content {
    font-size: 15px;
  }
}
</style>
