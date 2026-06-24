<template>
  <div class="example-box">
    <div class="example-header">
      <span class="example-badge">{{ badge || '📝 真题例题' }}</span>
      <span class="example-source" v-if="source">{{ source }}</span>
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
  border: 2px solid #fbbf24;
  overflow: hidden;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}
.example-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}
.example-badge {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 12px;
  background: rgba(255,255,255,.2);
  border-radius: 6px;
}
.example-source { color: rgba(255,255,255,.9); font-size: 13px; }
.example-problem {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.8;
  color: #78350f;
}
.example-problem strong { color: #92400e; }
.example-solution {
  border-top: 1px dashed #fcd34d;
}
.solution-toggle {
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 600;
  color: #b45309;
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
  line-height: 1.9;
  color: #78350f;
}
.solution-content :deep(.step) {
  display: flex;
  gap: 12px;
  margin: 10px 0;
  padding: 10px 14px;
  background: rgba(255,255,255,.6);
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}
.solution-content :deep(.step-num) {
  min-width: 28px; height: 28px;
  background: #f59e0b; color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
</style>
