<template>
  <section class="section-card">
    <h2 v-if="title" class="section-title">
      <span class="section-num" v-if="num">{{ num }}</span>
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
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
  border: 1px solid #e2e8f0;
}
.section-title {
  font-size: 22px;
  color: #1e293b;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
}
.section-body { font-size: 15px; line-height: 1.8; color: #334155; }
.section-body :deep(p) { margin: 0 0 12px; }
.section-body :deep(ul), .section-body :deep(ol) { padding-left: 24px; margin: 12px 0; }
.section-body :deep(li) { margin: 6px 0; }
.section-body :deep(h3) {
  font-size: 17px; color: #6d28d9;
  margin: 20px 0 10px;
}
@media (max-width: 600px) {
  .section-card { padding: 20px; }
}
</style>
