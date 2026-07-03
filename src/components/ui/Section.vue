<template>
  <section class="section-card">
    <h2 v-if="title" class="section-title">
      <span v-if="num" class="section-num">{{ num }}</span>
      {{ title }}
    </h2>
    <div class="section-body">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  num: [Number, String]
})
</script>

<style scoped>
.section-card {
  background: var(--color-card);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid var(--color-border);
}
.section-title {
  font-size: 24px;
  color: var(--color-foreground);
  margin: 0 0 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}
.section-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px; height: 32px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
}
.section-body { font-size: 15px; line-height: 1.75; color: var(--color-secondary); }
.section-body :deep(p) { margin: 0 0 12px; }
.section-body :deep(ul), .section-body :deep(ol) { padding-left: 24px; margin: 12px 0; }
.section-body :deep(li) { margin: 6px 0; }
.section-body :deep(h3) {
  font-size: 18px; color: var(--color-foreground);
  margin: 20px 0 10px;
  font-weight: 700;
}
@media (max-width: 600px) {
  .section-card { padding: 20px; }
}
</style>
