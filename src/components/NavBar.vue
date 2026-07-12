<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, open: menuOpen }">
    <div class="navbar-inner container">
      <router-link to="/" class="logo" @click="closeMenu">
        <span class="logo-icon">◆</span>
        <span class="logo-text">{{ t('footer.brand') }}</span>
      </router-link>

      <div class="nav-links" :class="{ open: menuOpen }">
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
                     class="nav-link" :class="{ exact: link.exact }"
                     @click="closeMenu">
          <span class="nl-icon">{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </router-link>
        <div class="nav-locale">{{ t('nav.locale') }}</div>
      </div>

      <div class="nav-actions">
        <div class="theme-toggle-wrap">
          <button class="theme-toggle" @click="togglePicker" :aria-label="'Theme'">
            <span class="tt-icon">{{ currentScheme?.icon || '🌙' }}</span>
          </button>
          <Teleport to="body">
            <div v-if="pickerOpen" class="theme-picker-overlay" @click="pickerOpen = false"></div>
            <div v-if="pickerOpen" class="theme-picker-panel" @click.stop>
              <div class="theme-picker-title">{{ t('theme.title') }}</div>
              <div class="theme-scheme-grid">
                <button v-for="s in themeSchemes" :key="s.id" class="theme-scheme-btn"
                        :class="{ active: theme === s.id }" @click="selectTheme(s.id)">
                  <span class="theme-scheme-icon">{{ s.icon }}</span>
                  <span>{{ t('theme.' + s.id) }}</span>
                  <span class="theme-scheme-dot" :style="{ background: s.accent, borderColor: s.accent + '40' }"></span>
                </button>
              </div>
            </div>
          </Teleport>
        </div>
        <button class="menu-btn" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false"></div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme, themeSchemes as schemes } from '../composables/useTheme.js'
import { useI18n } from '../composables/useI18n.js'

const route = useRoute()
const { theme, apply } = useTheme()
const { t } = useI18n()
const isScrolled = ref(false)
const menuOpen = ref(false)
const pickerOpen = ref(false)

const themeSchemes = schemes
const currentScheme = computed(() => themeSchemes.find(s => s.id === theme.value))

const navLinks = computed(() => [
  { to: '/', label: t('nav.home'), icon: '◇', exact: true },
  { to: '/red-culture', label: t('nav.red'), icon: '◆' },
  { to: '/green-industry', label: t('nav.green'), icon: '◇' },
  { to: '/about', label: t('nav.about'), icon: '◇' },
])

const closeMenu = () => { menuOpen.value = false }
const togglePicker = () => { pickerOpen.value = !pickerOpen.value }
const selectTheme = (id) => { apply(id); pickerOpen.value = false }

const onScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, closeMenu)
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 14px 0; transition: all 0.4s var(--ease-out-expo);
  background: transparent;
}
.navbar.scrolled {
  background: rgba(13, 13, 13, 0.82);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 10px 0;
}
[data-theme="light"] .navbar.scrolled,
[data-theme="sunset"] .navbar.scrolled,
[data-theme="lavender"] .navbar.scrolled {
  background: rgba(248, 246, 243, 0.85);
}
.navbar.scrolled.open { background: var(--bg-primary); }
.navbar-inner { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 8px; z-index: 2; }
.logo-icon { color: var(--red-primary); font-size: 1.1rem; }
.logo-text { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); letter-spacing: 0.02em; }
.nav-links { display: flex; align-items: center; gap: 6px; }
.nav-link {
  display: flex; align-items: center; gap: 5px;
  padding: 8px 18px; border-radius: var(--radius-sm);
  font-size: 0.88rem; color: var(--text-secondary); transition: all 0.3s;
}
.nav-link:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
.nav-link.router-link-exact-active, .nav-link.router-link-active:not(.exact) {
  color: #fff; background: rgba(198, 40, 40, 0.15);
}
[data-theme="light"] .nav-link.router-link-exact-active,
[data-theme="sunset"] .nav-link.router-link-exact-active,
[data-theme="lavender"] .nav-link.router-link-exact-active,
[data-theme="light"] .nav-link.router-link-active:not(.exact),
[data-theme="sunset"] .nav-link.router-link-active:not(.exact),
[data-theme="lavender"] .nav-link.router-link-active:not(.exact) {
  color: var(--red-primary); background: rgba(198, 40, 40, 0.08);
}
.nl-icon { font-size: 0.65rem; }
.nav-locale { font-size: 0.72rem; color: var(--text-muted); margin-left: 12px; padding-left: 12px; border-left: 1px solid rgba(255,255,255,0.08); }
[data-theme="light"] .nav-locale { border-left-color: rgba(0,0,0,0.08); }
.nav-actions { display: flex; align-items: center; gap: 8px; z-index: 2; }
.theme-toggle-wrap { position: relative; }
.theme-toggle { background: none; border: none; cursor: pointer; padding: 8px 12px; border-radius: var(--radius-sm); transition: all 0.3s; line-height: 1; display: flex; align-items: center; font-size: 1.1rem; }
.theme-toggle:hover { background: rgba(255,255,255,0.06); }
[data-theme="light"] .theme-toggle:hover { background: rgba(0,0,0,0.04); }
.tt-icon { transition: transform 0.3s; }
.theme-toggle:hover .tt-icon { transform: rotate(20deg); }
.theme-picker-overlay { position: fixed; inset: 0; z-index: 999; }
.menu-btn { display: none; flex-direction: column; gap: 5px; z-index: 2; background: none; border: none; cursor: pointer; padding: 6px; }
.menu-btn span { display: block; width: 22px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: all 0.35s var(--ease-out-expo); }
.menu-btn.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.menu-btn.open span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
.menu-btn.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.menu-overlay { display: none; }
@media (max-width: 768px) {
  .menu-btn { display: flex; }
  .nav-links {
    position: fixed; top: 0; right: -100%; width: 260px; height: 100vh;
    flex-direction: column; align-items: stretch; gap: 4px;
    padding: 80px 20px 20px; background: var(--bg-primary);
    border-left: 1px solid rgba(255,255,255,0.05);
    transition: right 0.4s var(--ease-out-expo); z-index: 1;
  }
  .nav-links.open { right: 0; }
  .nav-link { padding: 14px 18px; font-size: 1rem; }
  .nav-locale { margin: 20px 0 0; padding: 16px 0 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; }
  .menu-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 0; }
}
</style>
