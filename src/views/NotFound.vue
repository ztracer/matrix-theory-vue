<template>
  <main class="not-found" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:48px 24px">
    <h1 style="font-size:clamp(48px,8vw,96px);color:var(--color-primary);margin-bottom:12px">404</h1>
    <p style="color:var(--color-muted-foreground);font-size:16px;margin-bottom:28px">页面未找到</p>
    <router-link to="/" style="padding:12px 24px;background:var(--color-primary);color:var(--color-on-primary);border-radius:10px;text-decoration:none;font-weight:700">返回首页</router-link>
  </main>
</template>
