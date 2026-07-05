<template>
  <div class="steps-box">
    <h4 class="steps-title">🔑 解题步骤</h4>
    <div class="steps-list">
      <div v-for="(step, i) in steps" :key="i" class="step-item">
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-text" v-html="step"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true }
})
</script>

<style scoped>
.steps-box {
  margin: 20px 0;
  padding: 20px;
  background: var(--color-card);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  min-width: 0;
  max-width: 100%;
}
.steps-title {
  margin: 0 0 12px;
  color: var(--color-foreground);
  font-size: 16px;
  font-weight: 700;
}
.steps-list { display: flex; flex-direction: column; gap: 10px; }
.step-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  min-width: 0;
}
.step-num {
  min-width: 26px; height: 26px;
  background: var(--color-primary); color: var(--color-on-primary);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.step-text {
  min-width: 0;
  max-width: 100%;
  font-size: 14px;
  color: var(--color-secondary);
  line-height: 1.6;
  padding-top: 2px;
  overflow-x: auto;
  overflow-y: visible;
  overflow-wrap: break-word;
}
.step-text :deep(.formula-inline) { white-space: nowrap; }

@media (max-width: 600px) {
  .steps-box {
    padding: 14px;
    border-radius: 10px;
  }
  .step-item {
    gap: 10px;
  }
}
</style>
