<template>
  <div class="red-page">
    <!-- ═══ Hero ═══ -->
    <section class="hero-red hero-sweep">
      <div class="hero-particles"><span v-for="n in 20" :key="n" class="hp-dot" :style="particleStyle(n)"></span></div>
      <div class="container hero-content">
        <div class="hero-badge"><span class="dot"></span>{{ t('red.badge') }}</div>
        <div class="hero-title-wrap"><h1 class="hero-title">{{ t('red.heroTitle') }}</h1><div class="hero-tw"><TypeWriter :texts="typeTexts" :typeSpeed="90" :pauseMs="2500" /></div></div>
        <p class="hero-desc">{{ t('red.heroDesc') }}</p>
        <div class="hero-stats">
          <div class="stat"><span class="stat-num">{{ t('red.statsSitesVal') }}</span><span class="stat-lbl">{{ t('red.statsSites') }}</span></div>
          <div class="stat"><span class="stat-num">{{ t('red.statsFiguresVal') }}</span><span class="stat-lbl">{{ t('red.statsFigures') }}</span></div>
          <div class="stat"><span class="stat-num">{{ t('red.statsSongsVal') }}</span><span class="stat-lbl">{{ t('red.statsSongs') }}</span></div>
          <div class="stat"><span class="stat-num">{{ t('red.statsAreaVal') }}</span><span class="stat-lbl">{{ t('red.statsArea') }}</span></div>
        </div>
      </div>
      <div class="hero-gradient"></div>
    </section>

    <!-- ═══ 历史背景 ═══ -->
    <section class="section">
      <div class="container">
        <div class="history-block reveal">
          <div class="hb-line"></div>
          <p class="hb-date">1934年6月19日</p>
          <p class="hb-body">{{ t('red.historyContent') }}</p>
        </div>
      </div>
    </section>

    <!-- AI数字人主播视频 -->
    <section class="section red-video-section">
      <div class="container">
        <div class="red-video-block reveal">
          <div class="rvb-badge">🤖 AI数字人主播 · 红色枫香溪</div>
          <div class="rvb-container glass-card">
            <video src="/videos/红色文旅.mp4" controls playsinline preload="metadata" class="rvb-video"></video>
          </div>
          <p class="rvb-hint">🎬 点击播放，跟随AI主播云游红色枫香溪</p>
        </div>
      </div>
    </section>

    <!-- ═══ 十二处核心遗址 ═══ -->
    <section class="section sites-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('red.sitesTitle') }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">全国重点文物保护单位 · 省级爱国主义教育基地</p>

        <!-- 地图 -->
        <div class="site-map-bar reveal">
          <div class="map-center-inline" @click="showMap = true">
            <div class="map-thumb-inline">
              <img src="/images/fenxiangxi-map.png" alt="枫香溪红色游览地图" loading="lazy" />
            </div>
            <div class="map-tap-hint">🗺️ 点击查看完整红色游览地图</div>
          </div>
        </div>

        <div class="sites-responsive-grid">
          <div v-for="(site, i) in redSites" :key="i"
               class="site-grid-card glass-card reveal"
               :style="{ transitionDelay: `${i * 0.05}s` }"
               @click="openSite(site)">
            <div class="sgc-img-wrap">
              <img :src="site.coverUrl" :alt="site.title" loading="lazy" @error="onImgError" />
              <div class="sgc-overlay" :style="{ opacity: (isTouchDevice || hoverIdx === i) ? 1 : 0 }"
                   @mousemove="onMouseMove($event, i)" @mouseleave="onMouseLeave(i)">
                <div class="sgc-info">
                  <span class="sgc-badge">{{ site.category }}</span>
                  <span class="sgc-cta">点击查看详情 →</span>
                </div>
              </div>
            </div>
            <div class="sgc-body">
              <h3>{{ site.title }}</h3>
              <p class="sgc-summary">{{ site.summary.slice(0, 80) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 地图全屏弹窗 ═══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showMap" class="modal-backdrop map-backdrop" @click.self="showMap = false">
          <div class="map-modal">
            <button class="m-close map-m-close" @click="showMap = false">×</button>
            <img src="/images/fenxiangxi-map.png" alt="枫香溪红色游览地图" class="map-full-img" />
            <p class="map-caption">枫香溪红色游览地图</p>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ 景点详情弹窗 ═══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeSite" class="modal-backdrop" @click.self="activeSite = null">
          <div class="modal-content">
            <button class="m-close" @click="activeSite = null">×</button>
            <div class="m-img"><img :src="activeSite.coverUrl" :alt="activeSite.title" /></div>
            <div class="m-body">
              <span class="badge badge-red">{{ activeSite.category }}</span>
              <h2 class="m-title">{{ activeSite.title }}</h2>
              <p class="m-text">{{ activeSite.summary }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ 红色人物 ═══ -->
    <section class="section figures-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('red.figuresTitle') }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">枫香溪走出的革命战士 · 源出《红色的记忆》八一爱民学校特色教材</p>

        <div class="figures-grid">
          <article v-for="(f, fi) in redFigures" :key="f.name"
                   class="figure-card glass-card"
                   :style="{ transitionDelay: `${fi * 0.07}s` }"
                   @click="activeFigure = f">
            <div class="fc-img">
              <img :src="f.avatar" :alt="f.name" loading="lazy" @error="onImgError" />
              <div class="fc-shine"></div>
            </div>
            <div class="fc-body">
              <h3>{{ f.name }}</h3>
              <span class="badge badge-red">{{ f.role.split('·')[0] }}</span>
              <p class="fc-birth">{{ f.birth ? f.birth+'年生 · ' : '' }}{{ f.ethnicity }}</p>
              <div class="fc-expand">查看档案 →</div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══ 人物详情（二级） ═══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeFigure && !storyMode" class="modal-backdrop" @click.self="activeFigure = null">
          <div class="figure-modal-card">
            <button class="m-close" @click="activeFigure = null">×</button>
            <div class="fm-header">
              <div class="fm-avatar">
                <img :src="activeFigure.avatar" :alt="activeFigure.name" @error="onImgError" />
              </div>
              <div>
                <h2>{{ activeFigure.name }}</h2>
                <span class="badge badge-red">{{ activeFigure.role }}</span>
              </div>
            </div>
            <div class="fm-meta">
              <div class="fm-meta-item"><label>籍贯</label><span>{{ activeFigure.birthplace }}</span></div>
              <div class="fm-meta-item"><label>民族</label><span>{{ activeFigure.ethnicity }}</span></div>
              <div v-if="activeFigure.birth" class="fm-meta-item"><label>出生</label><span>{{ activeFigure.birth }}年</span></div>
            </div>
            <p class="fm-bio">{{ activeFigure.brief }}</p>
            <button class="btn btn-primary fm-story-btn" @click="storyMode = true">📖 展开完整事迹</button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ 完整事迹（三级） ═══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeFigure && storyMode" class="modal-backdrop" @click.self="storyMode = false">
          <div class="story-modal-card">
            <button class="m-close" @click="storyMode = false">×</button>
            <button class="story-back" @click="storyMode = false">← 返回档案</button>
            <h2 class="story-title">{{ activeFigure.name }} · 完整事迹</h2>
            <div class="story-body">
              <p v-for="(para, pi) in activeFigure.story.split('\n').filter(p => p.trim())" :key="pi">{{ para }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ 红色歌谣 ═══ -->
    <section class="section songs-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('red.songsTitle') }}</h2>
        <div class="section-divider"></div>
        <div class="songs-list reveal">
          <div v-for="(song, si) in redSongs" :key="si" class="song-row glass-card"
               :class="{ active: activeSong === si }"
               @click="activeSong = activeSong === si ? null : si">
            <span class="song-num">{{ String(si + 1).padStart(2, '0') }}</span>
            <div class="song-info">
              <h4>{{ song.title }}</h4>
              <p>{{ song.desc }}</p>
            </div>
            <span class="song-indicator">{{ activeSong === si ? '♪' : '▶' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 歌谣详情 ═══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeSong !== null" class="modal-backdrop" @click.self="activeSong = null">
          <div class="song-expand glass-card">
            <button class="m-close" @click="activeSong = null">×</button>
            <span class="song-lyric-icon">🎵</span>
            <h2>{{ redSongs[activeSong]?.title }}</h2>
            <p class="song-desc">{{ redSongs[activeSong]?.desc }}</p>
            <div class="lyric-block"><p>{{ redSongs[activeSong]?.lyric }}</p></div>
            <span class="lyric-note">🎧 完整音频将在后续后端更新中上线</span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { redSites, redFigures, redSongs } from '../data/mockData.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useI18n } from '../composables/useI18n.js'
import TypeWriter from '../components/TypeWriter.vue'

useScrollReveal()
const { t, locale } = useI18n()

const typeTexts = ['枫香溪会议会址', '黔东革命根据地', '武陵山脉红色热土', '全国重点文物保护单位']

// 九宫格: 8 image cells + 1 center map cell
const nineGridItems = computed(() => {
  const s = [...redSites]
  if (s.length < 8) {
    while (s.length < 8) s.push({ title: '待补充', coverUrl: '', category: '', summary: '' })
  }
  return [
    { site: s[0] }, { site: s[1] }, { site: s[2] },
    { site: s[3] }, { isMap: true }, { site: s[4] },
    { site: s[5] }, { site: s[6] }, { site: s[7] },
  ]
})

const activeSite = ref(null)
const activeFigure = ref(null)
const storyMode = ref(false)
const activeSong = ref(null)
const showMap = ref(false)
const hoverIdx = ref(-1)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

const openSite = (s) => { activeSite.value = s }
const onImgError = (e) => { e.target.style.display = 'none' }

const onMouseMove = (_, i) => { hoverIdx.value = i }
const onMouseLeave = () => { hoverIdx.value = -1 }

const particleStyle = (n) => ({
  left: `${(n * 37 + 11) % 100}%`,
  top: `${(n * 53 + 7) % 100}%`,
  animationDelay: `${(n * 0.7) % 8}s`,
  width: `${2 + (n % 3)}px`,
  height: `${2 + (n % 3)}px`,
})
</script>

<style scoped>
/* ── Hero ── */
.hero-red {
  position: relative; min-height: 60vh; display: flex; align-items: center;
  background: radial-gradient(ellipse at 30% 50%, rgba(198,40,40,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(200,169,110,0.06) 0%, transparent 50%),
              var(--bg-secondary);
  overflow: hidden;
}
.hero-particles { position: absolute; inset: 0; }
.hp-dot { position: absolute; border-radius: 50%; background: var(--red-primary); opacity: 0.08; }
.hero-content { position: relative; z-index: 1; text-align: center; padding: 80px 0 60px; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 20px; border-radius: 20px; background: rgba(198,40,40,0.1); border: 1px solid rgba(198,40,40,0.2); font-size: 0.85rem; color: #EF5350; margin-bottom: 28px; }
.hero-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: #EF5350; animation: pulse 2s infinite; }
.hero-title {
  font-family: var(--font-serif); font-size: 2.6rem; font-weight: 900; line-height: 1.3;
  margin-bottom: 16px; color: var(--text-primary);
}
.hero-desc { font-size: 1.02rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px; }
.hero-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
.stat { text-align: center; }
.stat-num { display: block; font-family: var(--font-serif); font-size: 2.5rem; font-weight: 900; background: linear-gradient(180deg, var(--gold-light), var(--gold-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-lbl { display: block; font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }
.hero-gradient { position: absolute; bottom: 0; left: 0; right: 0; height: 120px; background: linear-gradient(transparent, var(--bg-primary)); }

/* ── History Block ── */
.history-block { max-width: 780px; margin: 0 auto; position: relative; padding-left: 24px; }
.hb-line { position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: linear-gradient(180deg, var(--red-primary), rgba(198,40,40,0.2)); border-radius: 2px; }
.hb-date { font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 16px; }
.hb-body { font-size: 1rem; color: var(--text-secondary); line-height: 2.1; text-indent: 2em; }
.hb-body .accent { color: var(--text-primary); font-weight: 500; }

/* ── Sites Responsive Grid ── */
.sites-section { background: var(--bg-secondary); }
.site-map-bar { max-width: 960px; margin: 0 auto 24px; }
.map-center-inline {
  width: 100%; padding: 16px; border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(198,40,40,0.06), rgba(127,0,0,0.08));
  border: 1px solid rgba(198,40,40,0.1);
  display: flex; align-items: center; gap: 16px; cursor: pointer;
  transition: all 0.35s;
}
.map-center-inline:hover { border-color: rgba(198,40,40,0.25); box-shadow: var(--shadow-gold); }
.map-thumb-inline { width: 80px; height: 56px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.map-thumb-inline img { width: 100%; height: 100%; object-fit: cover; }
.map-tap-hint { font-size: 0.82rem; color: var(--text-secondary); }
@media (hover: none) and (pointer: coarse) {
  .map-tap-hint { opacity: 1 !important; transform: none !important; }
}

.sites-responsive-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1200px; margin: 0 auto;
}
.site-grid-card { cursor: pointer; overflow: hidden; padding: 0; }
.sgc-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.sgc-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out-expo); }
.site-grid-card:hover .sgc-img-wrap img { transform: scale(1.08); }
.sgc-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%);
  display: flex; align-items: flex-end; padding: 14px;
  transition: opacity 0.4s var(--ease-out-expo);
}
.sgc-info { width: 100%; }
.sgc-badge { font-size: 0.65rem; color: var(--gold-primary); background: rgba(200,169,110,0.15); padding: 2px 8px; border-radius: 8px; margin-bottom: 6px; display: inline-block; }
.sgc-cta { font-size: 0.68rem; color: rgba(255,255,255,0.6); display: block; margin-top: 2px; }
.sgc-body { padding: 14px 16px; }
.sgc-body h3 { font-family: var(--font-serif); font-size: 0.9rem; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3; }
.sgc-summary { font-size: 0.72rem; color: var(--text-muted); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
/* 触屏设备常显overlay */
@media (hover: none) and (pointer: coarse) {
  .sgc-overlay { opacity: 1 !important; }
}

@media (max-width: 1024px) {
  .sites-responsive-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
}
@media (max-width: 768px) {
  .sites-responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .sgc-body { padding: 10px 12px; }
  .sgc-body h3 { font-size: 0.82rem; }
}
@media (max-width: 480px) {
  .sites-responsive-grid { grid-template-columns: 1fr; }
}

/* ── Map Fullscreen Modal ── */
.map-backdrop { z-index: 3100; }
.map-modal { max-width: 90vw; max-height: 90vh; position: relative; }
.map-full-img { max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: var(--radius-lg); }
.map-caption { text-align: center; font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-secondary); margin-top: 12px; }
.map-m-close { top: -40px; right: 0; }

/* ── Modal ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 3000;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.modal-content { background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-xl); max-width: 520px; width: 100%; overflow: hidden; }
.m-close {
  position: absolute; top: 16px; right: 16px; z-index: 2;
  width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15);
  background: rgba(0,0,0,0.4); color: #fff; font-size: 1.2rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.m-close:hover { background: rgba(198,40,40,0.3); border-color: var(--red-primary); }
.m-img img { width: 100%; height: 260px; object-fit: cover; }
.m-body { padding: 28px; }
.m-title { font-family: var(--font-serif); font-size: 1.4rem; margin: 12px 0; color: var(--text-primary); }
.m-text { font-size: 0.95rem; color: var(--text-secondary); line-height: 2; }

.modal-fade-enter-active { transition: all 0.3s var(--ease-out-expo); }
.modal-fade-leave-active { transition: all 0.2s; }
.modal-fade-enter-from { opacity: 0; }
.modal-fade-enter-from .modal-content,
.modal-fade-enter-from .figure-modal-card,
.modal-fade-enter-from .story-modal-card,
.modal-fade-enter-from .song-expand { transform: scale(0.95) translateY(20px); }
.modal-fade-leave-to { opacity: 0; }

/* ── Figures ── */
.figures-section { background: var(--bg-primary); }
.figures-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
}
.figure-card { cursor: pointer; overflow: hidden; }
.fc-img { height: 200px; position: relative; overflow: hidden; }
.fc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-out-expo); }
.figure-card:hover .fc-img img { transform: scale(1.06); }
.fc-shine {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(198,40,40,0.15) 100%);
  opacity: 0; transition: opacity 0.3s;
}
.figure-card:hover .fc-shine { opacity: 1; }
.fc-body { padding: 18px 16px; }
.fc-body h3 { font-family: var(--font-serif); font-size: 1.05rem; margin-bottom: 8px; color: var(--text-primary); }
.fc-birth { font-size: 0.78rem; color: var(--text-muted); margin: 8px 0; }
.fc-expand { font-size: 0.78rem; color: var(--gold-primary); margin-top: 10px; opacity: 0; transform: translateX(-8px); transition: all 0.3s; }
.figure-card:hover .fc-expand { opacity: 1; transform: translateX(0); }

/* 触屏设备：常显悬停元素 */
@media (hover: none) and (pointer: coarse) {
  .fc-shine { opacity: 1 !important; }
  .fc-expand { opacity: 1 !important; transform: translateX(0) !important; }
  .map-tap-hint { opacity: 1 !important; transform: translateY(0) !important; }
}

/* ── Figure Detail Modal ── */
.figure-modal-card {
  background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-xl); max-width: 500px; width: 100%;
  padding: 32px 28px; position: relative;
}
.fm-header { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
.fm-avatar { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2px solid rgba(200,169,110,0.2); }
.fm-avatar img { width: 100%; height: 100%; object-fit: cover; }
.fm-header h2 { font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 6px; }
.fm-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.fm-meta-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-sm); padding: 12px; text-align: center; }
.fm-meta-item label { display: block; font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.fm-meta-item span { display: block; font-size: 0.85rem; color: var(--text-primary); margin-top: 2px; }
.fm-bio { font-size: 0.93rem; color: var(--text-secondary); line-height: 2; margin-bottom: 24px; }
.fm-story-btn { width: 100%; justify-content: center; }

/* ── Story Modal ── */
.story-modal-card {
  background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-xl); max-width: 560px; width: 100%; max-height: 85vh;
  padding: 32px 28px 40px; position: relative; overflow-y: auto;
}
.story-back { background: none; border: none; color: var(--gold-primary); font-size: 0.88rem; cursor: pointer; margin-bottom: 16px; display: block; }
.story-title { font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 24px; }
.story-body p { text-indent: 2em; font-size: 0.93rem; color: var(--text-secondary); line-height: 2.1; margin-bottom: 14px; }

/* ── Songs ── */
.songs-section { background: var(--bg-secondary); }
.songs-list { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
.song-row {
  display: flex; align-items: center; gap: 16px; padding: 18px 22px;
  cursor: pointer; transition: all 0.3s;
  border: 1px solid transparent;
}
.song-row:hover { border-color: rgba(200,169,110,0.15); }
.song-row.active { border-color: rgba(198,40,40,0.3); background: rgba(198,40,40,0.04); }
.song-num { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); min-width: 24px; }
.song-info { flex: 1; }
.song-info h4 { font-family: var(--font-serif); font-size: 0.98rem; color: var(--text-primary); margin-bottom: 2px; }
.song-info p { font-size: 0.78rem; color: var(--text-muted); }
.song-indicator { font-size: 1rem; color: var(--red-primary); }

/* ── Song Expand ── */
.song-expand {
  background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-xl); max-width: 420px; width: 100%; padding: 36px; position: relative; text-align: center;
}
.song-lyric-icon { font-size: 3rem; display: block; margin-bottom: 12px; }
.song-expand h2 { font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary); }
.song-desc { font-size: 0.85rem; color: var(--text-muted); margin: 10px 0 20px; }
.lyric-block { padding: 20px; border-radius: var(--radius-md); border: 1px solid rgba(200,169,110,0.1); }
.lyric-block p { font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-secondary); line-height: 2.4; font-style: italic; }
.lyric-note { font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 16px; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero-title { font-size: 1.8rem; }
  .hero-stats { gap: 20px; }
  .stat-num { font-size: 1.8rem; }
  .figures-grid { grid-template-columns: repeat(2, 1fr); }
  .fm-meta { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .nine-grid { grid-template-columns: 1fr 1fr; }
  .figures-grid { grid-template-columns: 1fr; }
  .fc-img { height: 160px; }
}
.red-video-section{background:linear-gradient(180deg,var(--bg-primary)0%,rgba(127,0,0,.03)50%,var(--bg-primary)100%)}.red-video-block{max-width:720px;margin:0 auto;text-align:center}.rvb-badge{margin-bottom:14px;font-size:.85rem;color:var(--text-secondary)}.rvb-container{overflow:hidden;border-radius:var(--radius-lg)}.rvb-video{width:100%;display:block;background:#000}.rvb-hint{margin-top:10px;font-size:.75rem;color:var(--text-muted)}
.red-video-section{background:linear-gradient(180deg,var(--bg-primary)0%,rgba(127,0,0,.03)50%,var(--bg-primary)100%)}.red-video-block{max-width:720px;margin:0 auto;text-align:center}.rvb-badge{margin-bottom:14px;font-size:.85rem;color:var(--text-secondary)}.rvb-container{overflow:hidden;border-radius:var(--radius-lg)}.rvb-video{width:100%;display:block;background:#000}.rvb-hint{margin-top:10px;font-size:.75rem;color:var(--text-muted)}

.hero-title-wrap{display:flex;flex-direction:column;align-items:center;width:100%}
.hero-tw{min-height:1.5em;display:flex;align-items:center;justify-content:center}
.hero-tw .typewriter{display:flex;justify-content:center;text-align:center}
</style>
