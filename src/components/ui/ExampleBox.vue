<template>
  <div class="example-box">
    <div class="example-header">
      <span class="example-badge">{{ badge || '📝 真题例题' }}</span>
      <span v-if="source" class="example-source">{{ source }}</span>
    </div>
    <div class="example-problem">
      <strong>【题目】</strong>
      <slot name="problem"></slot>
    </div>
    <details class="example-solution" :open="defaultOpen">
      <summary class="solution-toggle">点击查看详细解答</summary>
      <div class="solution-content">
        <slot name="solution"></slot>
      </div>
    </details>
  </div>
</template>

<script setup>
defineProps({
  source: String,
  badge: String,
  defaultOpen: { type: Boolean, default: false }
})
</script>

<style scoped>
.example-box {
  margin: 24px 0;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  background: var(--color-card);
}
.example-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--color-primary);
}
.example-badge {
  color: var(--color-on-primary);
  font-weight: 700;
  font-size: 14px;
  padding: 4px 0;
}
.example-source { color: var(--color-muted-foreground); font-size: 13px; }
.example-problem {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--color-secondary);
}
.example-problem strong { color: var(--color-foreground); }
.example-solution {
  border-top: 1px solid var(--color-border);
}
.solution-toggle {
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 700;
  color: var(--color-accent);
  font-size: 14px;
  list-style: none;
  user-select: none;
}
.solution-toggle::-webkit-details-marker { display: none; }
.solution-toggle::before { content: '▶ '; font-size: 10px; }
details[open] .solution-toggle::before { content: '▼ '; }
.solution-content {
  padding: 0 20px 20px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-secondary);
}
.solution-content :deep(.step) {
  display: flex;
  gap: 12px;
  margin: 10px 0;
  padding: 10px 14px;
  background: var(--color-background);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}
.solution-content :deep(.step-num) {
  min-width: 28px; height: 28px;
  background: var(--color-primary); color: var(--color-on-primary);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
</style>
