<template>
  <div class="theorem-box" :class="type">
    <div class="theorem-header">
      <span class="theorem-icon">{{ icon }}</span>
      <span class="theorem-title">{{ title }}</span>
    </div>
    <div class="theorem-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '定理' },
  type: { type: String, default: 'theorem' }, // theorem, definition, note, tip
  icon: { type: String, default: '📌' }
})
</script>

<style scoped>
.theorem-box {
  margin: 16px 0;
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 4px solid;
}
.theorem-box.theorem {
  background: linear-gradient(135deg, #fef3c7, #fffbeb);
  border-color: #f59e0b;
}
.theorem-box.definition {
  background: linear-gradient(135deg, #dbeafe, #eff6ff);
  border-color: #3b82f6;
}
.theorem-box.note {
  background: linear-gradient(135deg, #fce7f3, #fdf2f8);
  border-color: #ec4899;
}
.theorem-box.tip {
  background: linear-gradient(135deg, #d1fae5, #ecfdf5);
  border-color: #10b981;
}
.theorem-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 700;
}
.theorem-box.theorem .theorem-header { color: #92400e; }
.theorem-box.definition .theorem-header { color: #1e40af; }
.theorem-box.note .theorem-header { color: #9d174d; }
.theorem-box.tip .theorem-header { color: #065f46; }
.theorem-body { font-size: 14px; line-height: 1.7; color: #374151; }
</style>
