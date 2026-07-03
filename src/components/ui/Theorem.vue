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
  background: var(--color-card);
}
.theorem-box.theorem { background: #FAFAFA; }
.theorem-box.definition { background: #F8FAFC; }
.theorem-box.note { background: #FFFBF5; }
.theorem-box.tip { background: #F5FAFF; }
.theorem-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 700;
  color: var(--color-foreground);
}
.theorem-box.theorem .theorem-header { color: var(--color-primary); }
.theorem-box.definition .theorem-header { color: var(--color-accent); }
.theorem-box.note .theorem-header { color: #92400e; }
.theorem-box.tip .theorem-header { color: #075985; }
.theorem-icon { opacity: .72; }
.theorem-body { font-size: 14px; line-height: 1.75; color: var(--color-secondary); }
</style>
