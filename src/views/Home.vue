<template>
  <div class="home-page">
    <!-- ═══ Hero ═══ -->
    <section class="hero hero-sweep" @mousemove="onHeroMouse" @mouseleave="glowPos = null">
      <!-- 动态渐变背景 -->
      <div class="hero-bg-layer">
        <div class="hero-gradient hero-grad-1"></div>
        <div class="hero-gradient hero-grad-2"></div>
        <div class="hero-gradient hero-grad-3"></div>
        <div class="hero-pattern-overlay"></div>
      </div>

      <!-- 背景粒子 -->
      <div class="hero-particles" ref="particleRef">
        <span v-for="n in 50" :key="n" class="h-particle" :style="particleStyle(n)"></span>
      </div>

      <!-- 光晕 -->
      <div v-if="glowPos" class="hero-glow" :style="{ left: glowPos.x + 'px', top: glowPos.y + 'px' }"></div>

      <!-- 轮播层 -->
      <div class="hero-carousel" ref="carouselRef">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(b, i) in banners" :key="i" class="carousel-slide">
            <div class="slide-bg" :style="{ background: b.gradient }">
              <img v-if="b.url" :src="b.url" :alt="b.title" class="slide-img" />
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="carousel-indicator">
          <button v-for="(b, i) in banners" :key="i"
                  :class="{ active: i === currentSlide }"
                  @click="goSlide(i)" :aria-label="b.title"></button>
        </div>
      </div>

      <!-- 主文案 -->
      <div class="hero-body container">
        <div class="hero-badge reveal">
          <span class="dot-pulse"></span>{{ t('home.badge') }}
        </div>
        <h1 class="hero-heading reveal" style="transition-delay:0.15s">
          <TypeWriter :texts="i18nHeroTitles" :typeSpeed="80" :deleteSpeed="35" :pauseMs="2200" />
        </h1>
        <p class="hero-sub reveal" style="transition-delay:0.25s">{{ i18nSubtitles[currentSlide] || banners[currentSlide]?.subtitle }}</p>
        <div class="hero-actions reveal" style="transition-delay:0.35s">
          <router-link to="/red-culture" class="btn btn-primary hero-btn">
            <span>🏛️</span> {{ t('home.btnRed').replace('🏛️ ', '') }}
          </router-link>
          <router-link to="/green-industry" class="btn btn-outline hero-btn">
            <span>🌿</span> {{ t('home.btnGreen').replace('🌿 ', '') }}
          </router-link>
        </div>
      </div>

      <!-- 滚动提示 -->
      <div class="scroll-hint reveal">
        <span class="scroll-mouse">
          <span class="scroll-dot"></span>
        </span>
        <span class="scroll-text">{{ t('home.scrollHint') }}</span>
      </div>
    </section>

    <!-- ═══ 简介 ═══ -->
    <section class="section intro-section">
      <div class="container">
        <div class="intro-block reveal">
          <span class="intro-label">{{ t('home.introLabel') }}</span>
          <h2 class="section-title glow-text" style="text-align:left;">{{ t('home.introTitle') }}</h2>
          <p class="intro-text">{{ t('home.introContent') }}</p>
          <div class="intro-features">
            <div v-for="f in i18nFeatures" :key="f.title" class="if-item"
                 :style="{ borderLeftColor: f.color }">
              <span class="if-icon" :style="{ color: f.color }">◆</span>
              <h4>{{ f.title }}</h4>
              <p>{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 双入口 ═══ -->
    <section class="section portals-section">
      <div class="container">
        <div class="portals-grid reveal">
          <router-link to="/red-culture" class="portal-card glass-card glow-red">
            <div class="portal-visual red-visual">
              <div class="pv-pattern"></div>
              <span class="pv-icon">🏛️</span>
            </div>
            <div class="portal-body">
              <span class="badge badge-red">{{ t('nav.red') }}</span>
              <h3>{{ t('home.portalRedTitle') }}</h3>
              <p>{{ t('home.portalRedDesc') }}</p>
              <span class="portal-arrow">→</span>
            </div>
          </router-link>
          <router-link to="/green-industry" class="portal-card glass-card glow-gold">
            <div class="portal-visual green-visual">
              <div class="pv-pattern"></div>
              <span class="pv-icon">🌿</span>
            </div>
            <div class="portal-body">
              <span class="badge badge-green">{{ t('nav.green') }}</span>
              <h3>{{ t('home.portalGreenTitle') }}</h3>
              <p>{{ t('home.portalGreenDesc') }}</p>
              <span class="portal-arrow">→</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══ 数据 ═══ -->
    <section class="section stats-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('home.statsTitle') }}</h2>
        <div class="section-divider"></div>
        <div class="stats-grid reveal">
          <div v-for="s in i18nStats" :key="s.label" class="stat-card glass-card">
            <span class="sc-number">{{ s.value }}</span>
            <span class="sc-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { banners, industryStats } from '../data/mockData.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useI18n } from '../composables/useI18n.js'
import TypeWriter from '../components/TypeWriter.vue'

useScrollReveal()
const { t } = useI18n()

const currentSlide = ref(0)
const glowPos = ref(null)
let autoTimer = null

const goSlide = (i) => { currentSlide.value = i; resetAuto() }
const resetAuto = () => { clearInterval(autoTimer); autoTimer = setInterval(() => { currentSlide.value = (currentSlide.value + 1) % banners.length }, 5000) }

const onHeroMouse = (e) => { glowPos.value = { x: e.clientX, y: e.clientY } }

const i18nHeroTitles = computed(() => [
  t('home.heroTitle1'), t('home.heroTitle2'), t('home.heroTitle3'),
  t('home.heroTitle4'), t('home.heroTitle5'),
])
const i18nSubtitles = computed(() => [t('home.sub1'), t('home.sub2'), t('home.sub3')])

const i18nFeatures = computed(() => [
  { title: t('home.feat1'), desc: t('home.feat1d'), color: '#C8A96E' },
  { title: t('home.feat2'), desc: t('home.feat2d'), color: '#C62828' },
  { title: t('home.feat3'), desc: t('home.feat3d'), color: '#2E7D32' },
  { title: t('home.feat4'), desc: t('home.feat4d'), color: '#1565C0' },
])

const i18nStats = computed(() => [
  { label: t('home.stat1'), value: industryStats[0].value },
  { label: t('home.stat2'), value: industryStats[1].value },
  { label: t('home.stat3'), value: industryStats[2].value },
  { label: t('home.stat4'), value: industryStats[3].value },
  { label: t('home.stat5'), value: industryStats[4].value },
  { label: t('home.stat6'), value: industryStats[5].value },
])

const particleStyle = (n) => ({
  left: `${(n * 47 + 13) % 100}%`,
  top: `${(n * 31 + 7) % 100}%`,
  width: `${1.5 + (n % 4) * 1.5}px`,
  height: `${1.5 + (n % 4) * 1.5}px`,
  animationDelay: `${(n * 0.5) % 8}s`,
  animationDuration: `${5 + (n % 6)}s`,
  opacity: 0.03 + (n % 5) * 0.025,
})

onMounted(() => { resetAuto() })
onUnmounted(() => { clearInterval(autoTimer) })
</script>

<style scoped>
/* ── Hero ── */
.hero {
  position: relative; min-height: 100vh; display: flex; align-items: center;
  background: var(--bg-primary); overflow: hidden;
}

/* 动态渐变背景 */
.hero-bg-layer { position: absolute; inset: 0; z-index: 0; }
.hero-gradient {
  position: absolute; border-radius: 50%; filter: blur(80px);
  animation: heroGradFloat 12s infinite var(--ease-in-out);
  opacity: 0.4;
}
.hero-grad-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(198, 40, 40, 0.25), transparent 70%);
  top: -15%; left: -10%;
  animation-delay: 0s;
}
.hero-grad-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(200, 169, 110, 0.2), transparent 70%);
  top: 50%; right: -10%;
  animation-delay: -4s;
}
.hero-grad-3 {
  width: 550px; height: 550px;
  background: radial-gradient(circle, rgba(66, 165, 245, 0.15), transparent 70%);
  bottom: -20%; left: 30%;
  animation-delay: -8s;
}
.hero-pattern-overlay {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent 100%);
}

@keyframes heroGradFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.hero-particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.h-particle {
  position: absolute; border-radius: 50%;
  background: var(--red-primary);
  animation: float 6s infinite var(--ease-in-out);
}
.hero-glow {
  position: fixed; z-index: 0; pointer-events: none;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(198,40,40,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%); transition: left 0.3s ease-out, top 0.3s ease-out;
}

.hero-carousel { position: absolute; inset: 0; z-index: 0; }
.carousel-track { display: flex; height: 100%; transition: transform 0.7s var(--ease-in-out); }
.carousel-slide { min-width: 100%; height: 100%; }
.slide-bg { width: 100%; height: 100%; position: relative; }
.slide-img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.15;
  position: relative; z-index: 1;
}
.carousel-indicator {
  position: absolute; bottom: 120px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 14px; z-index: 2;
}
.carousel-indicator button {
  width: 10px; height: 10px; border-radius: 50%; border: none;
  background: rgba(255,255,255,0.18); cursor: pointer;
  transition: all 0.4s var(--ease-out-expo);
}
.carousel-indicator button:hover { background: rgba(255,255,255,0.35); }
.carousel-indicator button.active {
  background: var(--red-primary);
  width: 28px; border-radius: 5px;
  box-shadow: 0 0 16px rgba(198,40,40,0.5);
}

.hero-body { position: relative; z-index: 2; text-align: center; padding-top: 60px; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 18px; border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 28px;
}
.dot-pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-green); animation: pulse 2s infinite; }
.hero-heading {
  font-family: var(--font-serif); font-size: 3.2rem; font-weight: 900;
  line-height: 1.2; margin-bottom: 16px;
  min-height: 1.3em;
  color: var(--text-primary);
  text-shadow: 0 0 60px rgba(198,40,40,0.15);
}
.hero-sub { font-size: 1.05rem; color: var(--text-secondary); max-width: 560px; margin: 0 auto 36px; }
.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.hero-btn { padding: 14px 32px; font-size: 0.95rem; border-radius: var(--radius-md); }

.scroll-hint { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 2; text-align: center; }
.scroll-mouse {
  display: block; width: 24px; height: 38px; border-radius: 14px;
  border: 2px solid rgba(255,255,255,0.15); margin: 0 auto 10px;
  position: relative;
}
.scroll-dot {
  position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 8px; border-radius: 2px;
  background: var(--red-primary);
  animation: scrollDot 2s infinite var(--ease-in-out);
}
@keyframes scrollDot {
  0% { top: 6px; opacity: 1; }
  100% { top: 24px; opacity: 0; }
}
.scroll-text { font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; }

/* ── Intro ── */
.intro-section { background: var(--bg-secondary); }
.intro-block { max-width: 800px; }
.intro-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
.intro-text { font-size: 1rem; color: var(--text-secondary); text-indent: 2em; line-height: 2.2; margin: 24px 0 32px; }
.intro-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.if-item { padding: 20px 18px; border-left: 2px solid; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; background: rgba(255,255,255,0.02); }
.if-icon { display: block; font-size: 1.4rem; margin-bottom: 6px; }
.if-item h4 { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
.if-item p { font-size: 0.73rem; color: var(--text-muted); }

/* ── Portals ── */
.portals-section { background: var(--bg-primary); }
.portals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px; margin: 0 auto; }
.portal-card { display: flex; flex-direction: column; overflow: hidden; cursor: pointer; }
.portal-visual { height: 140px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.red-visual { background: linear-gradient(135deg, rgba(198,40,40,0.15), rgba(127,0,0,0.2)); }
.green-visual { background: linear-gradient(135deg, rgba(46,125,50,0.12), rgba(27,94,32,0.18)); }
.pv-pattern {
  position: absolute; inset: 0; opacity: 0.3;
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 20px 20px;
}
.pv-icon { font-size: 3.5rem; position: relative; z-index: 1; filter: drop-shadow(0 0 20px rgba(0,0,0,0.3)); }
.portal-body { padding: 24px 28px; position: relative; }
.portal-body h3 { font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary); margin: 10px 0 6px; }
.portal-body p { font-size: 0.85rem; color: var(--text-muted); }
.portal-arrow {
  position: absolute; top: 50%; right: 28px; transform: translateY(-50%);
  font-size: 1.2rem; color: var(--text-muted); opacity: 0;
  transition: all 0.35s var(--ease-out-expo);
}
.portal-card:hover .portal-arrow { opacity: 1; right: 20px; }

/* ── Stats ── */
.stats-section { background: var(--bg-secondary); }
.stats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.stat-card { padding: 28px 16px; text-align: center; }
.sc-number { display: block; font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--gold-primary); }
.sc-label { display: block; font-size: 0.78rem; color: var(--text-muted); margin-top: 8px; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .intro-features { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .hero-heading { font-size: 1.8rem; }
  .hero { min-height: 90vh; }
  .portals-grid { grid-template-columns: 1fr; }
  .intro-features { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-gradient { filter: blur(60px); }
}
</style>
