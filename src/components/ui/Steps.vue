<template>
  <div class="steps-box">
    <h4 class="steps-title">🔑 解题步骤</h4>
    <div class="steps-list">
      <div v-for="(step, i) in steps" :key="i" class="step-item">
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-text">{{ step }}</div>
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
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border-radius: 10px;
  border: 1px solid #bbf7d0;
}
.steps-title {
  margin: 0 0 12px;
  color: #166534;
  font-size: 16px;
}
.steps-list { display: flex; flex-direction: column; gap: 10px; }
.step-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.step-num {
  min-width: 26px; height: 26px;
  background: #10b981; color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.step-text { font-size: 14px; color: #14532d; line-height: 1.6; padding-top: 2px; }
</style>
