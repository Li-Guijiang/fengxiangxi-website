<template>
  <footer class="footer">
    <div class="footer-inner container">
      <div class="footer-grid">
        <div class="f-col">
          <div class="f-brand">
            <span class="f-logo">◆</span>
            <div>
              <h3>{{ t('footer.brand') }}</h3>
              <p>{{ t('footer.locale') }}</p>
            </div>
          </div>
          <p class="f-slogan">{{ t('footer.slogan') }}</p>
          <div class="f-dev-info">
            <p>{{ t('footer.dev') }}</p>
            <p>{{ t('footer.team') }}</p>
          </div>
        </div>
        <div class="f-col">
          <h4>{{ t('footer.nav') }}</h4>
          <router-link to="/">{{ t('nav.home') }}</router-link>
          <router-link to="/red-culture">{{ t('nav.red') }}</router-link>
          <router-link to="/green-industry">{{ t('nav.green') }}</router-link>
          <router-link to="/about">{{ t('nav.about') }}</router-link>
        </div>
        <div class="f-col">
          <h4>{{ t('footer.overview') }}</h4>
          <p>{{ t('footer.l1') }}</p>
          <p>{{ t('footer.l2') }}</p>
          <p>{{ t('footer.l3') }}</p>
          <p>{{ t('footer.l4') }}</p>
        </div>
      </div>
      <div class="f-bottom">
        <p>{{ t('footer.copy') }}</p>
        <div class="f-dots"><span></span><span></span><span></span></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()
</script>

<style scoped>
.footer { background: var(--bg-secondary); border-top: 1px solid rgba(255,255,255,0.04); padding: 56px 0 28px; }
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.f-col h4 { font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-primary); margin-bottom: 16px; }
.f-col a, .f-col p { display: block; font-size: 0.85rem; color: var(--text-muted); line-height: 2.2; transition: color 0.2s; }
.f-col a:hover { color: var(--text-secondary); }
.f-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.f-logo { color: var(--red-primary); font-size: 1.2rem; }
.f-brand h3 { font-family: var(--font-serif); font-size: 1.05rem; color: var(--text-primary); }
.f-brand p { font-size: 0.78rem; }
.f-slogan { font-size: 0.8rem; color: var(--text-muted); margin-top: 8px; }
.f-dev-info { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.04); }
.f-dev-info p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.8; }
.f-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.04); }
.f-bottom p { font-size: 0.75rem; color: var(--text-muted); }
.f-dots { display: flex; gap: 6px; }
.f-dots span { width: 4px; height: 4px; border-radius: 50%; }
.f-dots span:nth-child(1) { background: var(--red-primary); }
.f-dots span:nth-child(2) { background: var(--gold-primary); }
.f-dots span:nth-child(3) { background: var(--accent-green); }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 28px; } }
</style>
