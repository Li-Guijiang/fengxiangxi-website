<template>
  <div class="green-page">
    <!-- Hero -->
    <section class="hero-green">
      <div class="container">
        <div class="gh-badge reveal"><span class="dot-live"></span>{{ t('green.badge') }}</div>
        <h1 class="gh-title reveal" style="transition-delay:0.1s">{{ t('green.heroTitle') }}</h1>
        <p class="gh-desc reveal" style="transition-delay:0.2s">{{ t('green.heroDesc') }}</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="section">
      <div class="container">
        <div class="overview-glass glass-card reveal">
          <span class="ov-icon">🌱</span>
          <p>{{ t('green.overview') }}</p>
        </div>

        <!-- 快速导航 -->
        <div class="ind-nav reveal">
          <a v-for="ind in i18nIndustries" :key="ind.id" :href="'#' + ind.id"
             class="ind-nav-item glass-card" :style="{ '--ind-color': ind.color }">
            <span class="nav-dot-2" :style="{ background: ind.color }"></span>
            {{ ind.title }}
          </a>
        </div>
      </div>
    </section>

    <!-- 产业详情 -->
    <section v-for="(ind, idx) in i18nIndustries" :key="ind.id" :id="ind.id"
             class="section ind-block" :style="{ background: idx % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)' }">
      <div class="container">
        <!-- 标题 -->
        <div class="ind-header reveal">
          <span class="ind-num">{{ String(idx + 1).padStart(2, '0') }}</span>
          <div>
            <h2 :style="{ color: ind.color }">{{ ind.title }}</h2>
            <p>{{ ind.subtitle }}</p>
          </div>
        </div>

        <!-- 内容 + 轮播 -->
        <div class="ind-layout reveal" :class="{ reverse: idx % 2 === 1 }">
          <!-- 轮播 -->
          <div class="carousel-wrap">
            <div class="carousel-track" :style="{ transform: `translateX(-${carouselIdx[idx] * 100}%)` }">
              <div v-for="(img, ci) in ind.images" :key="ci" class="carousel-slide">
                <img :src="img" :alt="ind.title" loading="lazy" />
              </div>
            </div>
            <button class="c-btn prev" @click="prev(idx)">‹</button>
            <button class="c-btn next" @click="next(idx)">›</button>
            <div class="c-dots">
              <span v-for="(_, ci) in ind.images" :key="ci" :class="{ active: carouselIdx[idx] === ci }"
                    @click="carouselIdx[idx] = ci"></span>
            </div>
            <div class="c-counter">{{ carouselIdx[idx] + 1 }} / {{ ind.images.length }}</div>
          </div>

          <!-- 文字 -->
          <div class="ind-text">
            <p>{{ ind.content }}</p>
          </div>
        </div>

        <!-- AI视频 -->
        <div v-if="ind.videoUrl" class="video-wrap reveal">
          <div class="video-badge">{{ t('green.aiBadge') }} · {{ ind.title }}</div>
          <div class="video-container glass-card">
            <video :ref="el => { if (el) videoRefs[ind.id] = el }"
                   :src="ind.videoUrl" controls playsinline preload="metadata"
                   :poster="ind.images[0]"
                   class="product-video" @play="onPlay(ind.id)">
            </video>
          </div>
          <div class="video-download-row">
            <a :href="ind.videoUrl" :download="ind.videoUrl.split('/').pop()" class="video-download-btn">
              ⬇️ {{ locale === 'en' ? 'Download Video' : '下载视频' }}
            </a>
            <span class="video-download-hint">{{ locale === 'en' ? 'Long press video to save (mobile)' : '手机端可长按视频保存' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section stats-bar">
      <div class="container">
        <div class="stats-inner reveal">
          <div v-for="s in industryStats" :key="s.label" class="s-item glass-card">
            <span class="s-val">{{ s.value }}</span>
            <span class="s-lbl">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { industries } from '../data/mockData.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useI18n } from '../composables/useI18n.js'

useScrollReveal()
const { t, locale } = useI18n()

const carouselIdx = reactive(industries.map(() => 0))
const videoRefs = reactive({})

// i18n industries
const i18nIndustries = computed(() => industries.map(ind => ({
  ...ind,
  title: t(`ind.${ind.id}.title`),
  subtitle: t(`ind.${ind.id}.subtitle`),
  content: t(`ind.${ind.id}.content`),
})))

const onPlay = (id) => {
  Object.keys(videoRefs).forEach(k => {
    if (k !== id && videoRefs[k]) videoRefs[k].pause()
  })
}
const prev = (i) => { const len = industries[i].images.length; carouselIdx[i] = (carouselIdx[i] - 1 + len) % len }
const next = (i) => { const len = industries[i].images.length; carouselIdx[i] = (carouselIdx[i] + 1) % len }
</script>

<style scoped>
/* Hero */
.hero-green { text-align: center; padding: 80px 0 60px; background: radial-gradient(ellipse at 70% 40%, rgba(46,125,50,0.08) 0%, transparent 60%), var(--bg-secondary); }
.gh-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; border-radius: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); font-size: 0.82rem; color: var(--text-muted); margin-bottom: 24px; }
.dot-live { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-green); animation: pulse 2s infinite; }
.gh-title { font-family: var(--font-serif); font-size: 2.6rem; font-weight: 900; color: var(--text-primary); margin-bottom: 12px; }
.gh-desc { font-size: 1rem; color: var(--text-secondary); }

/* Overview */
.overview-glass { max-width: 780px; margin: 0 auto 40px; padding: 32px; text-align: center; }
.ov-icon { font-size: 2.5rem; display: block; margin-bottom: 12px; }
.overview-glass p { font-size: 0.98rem; color: var(--text-secondary); line-height: 2.1; }
.overview-glass em { color: var(--gold-primary); font-style: normal; font-weight: 600; }

/* Nav */
.ind-nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.ind-nav-item { display: flex; align-items: center; gap: 8px; padding: 10px 22px; font-size: 0.88rem; color: var(--text-secondary); cursor: pointer; transition: all 0.3s; }
.ind-nav-item:hover { border-color: rgba(255,255,255,0.12); color: var(--text-primary); transform: translateY(-2px); }
.nav-dot-2 { width: 8px; height: 8px; border-radius: 50%; }

/* Industry Block */
.ind-header { display: flex; align-items: center; gap: 20px; margin-bottom: 36px; }
.ind-num { font-family: var(--font-mono); font-size: 1.6rem; font-weight: 500; color: var(--text-muted); opacity: 0.3; }
.ind-header h2 { font-family: var(--font-serif); font-size: 1.6rem; }
.ind-header p { font-size: 0.85rem; color: var(--text-muted); }

.ind-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; margin-bottom: 32px; }
.ind-layout.reverse .ind-text { order: -1; }

/* Carousel */
.carousel-wrap { position: relative; border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 4/3; background: #1a1a1a; }
.carousel-track { display: flex; height: 100%; transition: transform 0.5s var(--ease-in-out); }
.carousel-slide { min-width: 100%; height: 100%; }
.carousel-slide img { width: 100%; height: 100%; object-fit: cover; }
.c-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); color: #fff; font-size: 1.3rem; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); transition: all 0.2s; }
.c-btn:hover { background: rgba(0,0,0,0.7); border-color: rgba(255,255,255,0.2); }
.c-btn.prev { left: 10px; }
.c-btn.next { right: 10px; }
.c-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.c-dots span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.2s; }
.c-dots span.active { background: #fff; width: 18px; border-radius: 3px; }
.c-counter { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.7rem; font-family: var(--font-mono); }

/* Text */
.ind-text p { text-indent: 2em; font-size: 0.98rem; color: var(--text-secondary); line-height: 2.2; }

/* Video */
.video-wrap { margin-top: 24px; }
.video-badge { text-align: center; margin-bottom: 14px; color: var(--text-muted); font-size: 0.85rem; }
.video-container { overflow: hidden; max-width: 720px; margin: 0 auto; }
.product-video { width: 100%; display: block; background: #000; }

/* Download */
.video-download-row { max-width: 720px; margin: 10px auto 0; display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
.video-download-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 20px; border-radius: 20px;
  background: var(--bg-glass); border: 1px solid var(--bg-glass-border);
  backdrop-filter: blur(8px); color: var(--text-primary);
  font-size: 0.82rem; cursor: pointer; text-decoration: none;
  transition: all 0.3s;
}
.video-download-btn:hover { border-color: var(--red-primary); color: var(--red-primary); transform: translateY(-1px); }
[data-theme="light"] .video-download-btn,
[data-theme="sunset"] .video-download-btn,
[data-theme="lavender"] .video-download-btn { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.08); }
.video-download-hint { font-size: 0.7rem; color: var(--text-muted); }

/* Stats Bar */
.stats-bar { background: var(--bg-secondary); }
.stats-inner { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.s-item { padding: 24px 16px; text-align: center; }
.s-val { display: block; font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--gold-primary); }
.s-lbl { display: block; font-size: 0.78rem; color: var(--text-muted); margin-top: 6px; }

@media (max-width: 1024px) { .stats-inner { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .gh-title { font-size: 1.8rem; }
  .ind-layout { grid-template-columns: 1fr; gap: 24px; }
  .ind-layout.reverse .ind-text { order: 0; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
}
</style>
