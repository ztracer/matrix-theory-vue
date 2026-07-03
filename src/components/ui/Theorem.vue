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
  margin: 18px 0;
  padding: 18px 20px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  background: var(--color-card);
}
.theorem-box.theorem { border-left-color: var(--color-primary); }
.theorem-box.definition { border-left-color: var(--color-accent); }
.theorem-box.note { border-left-color: var(--color-secondary); }
.theorem-box.tip { border-left-color: #0284c7; }
.theorem-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 750;
  color: var(--color-foreground);
}
.theorem-icon { opacity: .72; }
.theorem-body { font-size: 14px; line-height: 1.75; color: var(--color-secondary); }
</style>
