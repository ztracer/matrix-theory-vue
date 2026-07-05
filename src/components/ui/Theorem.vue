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
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
}
.theorem-box.theorem { background: var(--color-card); }
.theorem-box.definition { background: color-mix(in srgb, var(--color-accent) 6%, var(--color-card)); }
.theorem-box.note { background: color-mix(in srgb, var(--color-destructive) 6%, var(--color-card)); }
.theorem-box.tip { background: color-mix(in srgb, var(--color-accent) 4%, var(--color-card)); }
.theorem-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 700;
  color: var(--color-foreground);
  min-width: 0;
}
.theorem-box.theorem .theorem-header { color: var(--color-primary); }
.theorem-box.definition .theorem-header { color: var(--color-accent); }
.theorem-box.note .theorem-header { color: var(--color-destructive); }
.theorem-box.tip .theorem-header { color: var(--color-accent); }
.theorem-icon { opacity: .72; }
.theorem-title { min-width: 0; overflow-wrap: anywhere; }
.theorem-body {
  min-width: 0;
  max-width: 100%;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-secondary);
  overflow-x: auto;
  overflow-y: visible;
  overflow-wrap: break-word;
}

@media (max-width: 600px) {
  .theorem-box {
    padding: 14px;
    border-radius: 10px;
  }
  .theorem-header {
    align-items: flex-start;
  }
}
</style>
