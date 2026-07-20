<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <div class="ah-badge reveal"><span class="dot"></span>{{ t('about.badge') }}</div>
        <h1 class="about-title reveal" style="transition-delay:0.1s">{{ t('about.heroTitle') }}</h1>
        <p class="about-desc reveal" style="transition-delay:0.2s">{{ t('about.heroDesc') }}</p>
      </div>
    </section>

    <!-- ═══ 开发者信息 ═══ -->
    <section class="section">
      <div class="container">
        <div class="dev-section reveal">
          <div class="dev-card glass-card">
            <!-- 头像 -->
            <div class="dev-avatar-wrap">
              <div class="dev-avatar-ring"></div>
              <img :src="dev.avatar" :alt="dev.name" class="dev-avatar-img"
                   @error="e => e.target.style.display='none'" />
            </div>

            <!-- 身份标识 -->
            <div class="dev-role-badge">
              <span class="role-dot"></span>
              {{ t('about.devBadge') }}
            </div>

            <!-- 姓名 -->
            <h2 class="dev-name">{{ dev.name }}</h2>

            <!-- 职位 -->
            <p class="dev-title">{{ i18nDev.role }}</p>

            <!-- 简介 -->
            <p class="dev-intro">{{ i18nDev.description }}</p>

            <!-- 座右铭 -->
            <p class="dev-motto">"{{ i18nDev.motto }}"</p>

            <!-- 技能标签 -->
            <div class="dev-skills">
              <span v-for="sk in dev.skills" :key="sk" class="skill-pill">{{ sk }}</span>
            </div>

            <!-- 联系方式（竖排 + 文字描述 + 图标） -->
            <div class="dev-contact-section">
              <h4 class="contact-section-title">{{ t('about.contactTitle') }}</h4>
              <div class="dev-contact-list">
                <a :href="'tel:'+dev.phone" class="contact-row glass-card">
                  <span class="cr-icon">📞</span>
                  <span class="cr-label">{{ t('about.contactPhone') }}</span>
                  <span class="cr-value">{{ dev.phone }}</span>
                </a>
                <a :href="'https://wpa.qq.com/msgrd?v=3&uin='+dev.qq+'&site=qq&menu=yes'"
                   target="_blank" class="contact-row glass-card">
                  <span class="cr-icon">💬</span>
                  <span class="cr-label">{{ t('about.contactQQ') }}</span>
                  <span class="cr-value">{{ dev.qq }}</span>
                </a>
                <a :href="'mailto:'+dev.email" class="contact-row glass-card">
                  <span class="cr-icon">✉️</span>
                  <span class="cr-label">{{ t('about.contactEmail') }}</span>
                  <span class="cr-value">{{ dev.email }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 三下乡团队信息 ═══ -->
    <section class="section team-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('about.teamTitle') }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">{{ t('about.teamSubtitle') }}</p>

        <!-- 项目组名图片 -->
        <div class="team-project-img reveal" v-if="team.projectImage">
          <img :src="team.projectImage" alt="三下乡项目组名" class="tpi-img"
               @error="e => e.target.style.display='none'" />
        </div>

        <!-- 团队数据卡片 -->
        <div class="team-stats-grid reveal">
          <div v-for="st in team.stats" :key="st.label" class="team-stat-card glass-card">
            <span class="tsc-number">{{ st.value }}</span>
            <span class="tsc-label">{{ st.label }}</span>
          </div>
        </div>

        <!-- 团队合照 -->
        <div class="team-photos-grid reveal">
          <div v-for="(photo, pi) in team.photos" :key="pi"
               class="team-photo-card glass-card"
               @click="openGallery(pi)">
            <div class="tpc-img-wrap">
              <img :src="photo.url" :alt="photo.caption" class="tpc-img"
                   loading="lazy" @error="e => e.target.style.display='none'" />
              <div class="tpc-overlay">
                <span class="tpc-zoom-icon">🔍</span>
                <span>点击查看大图</span>
              </div>
            </div>
            <p class="tpc-caption">{{ photo.caption }}</p>
          </div>
        </div>

        <!-- 团队描述 -->
        <p class="team-desc reveal">{{ i18nTeam.projectDesc }}</p>

        <!-- 指导老师 -->
        <div class="team-instructors reveal">
          <h3 class="team-subtitle">{{ t('about.instructors') }}</h3>
          <div class="instructor-grid">
            <div v-for="ins in team.instructors" :key="ins.name" class="instructor-card glass-card">
              <div class="ic-avatar">{{ ins.name.charAt(0) }}</div>
              <div class="ic-info">
                <span class="ic-name">{{ ins.name }}</span>
                <span class="ic-title">{{ ins.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 团队成员 -->
        <div class="team-members reveal">
          <h3 class="team-subtitle">{{ t('about.members').replace('👥 ', '👥 ') }}（{{ t('about.memberCount', { count: team.members.length }) }}）</h3>
          <div class="member-grid">
            <div v-for="(m, mi) in team.members" :key="mi" class="member-tag glass-card">
              <span class="mt-num">{{ String(mi + 1).padStart(2, '0') }}</span>
              <span class="mt-name">{{ m }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片灯箱 -->
    <Teleport to="body">
      <div v-if="galleryOpen" class="image-lightbox-overlay" @click="galleryOpen = false">
        <button class="image-lightbox-close" @click="galleryOpen = false">✕</button>
        <button v-if="team.photos.length > 1" class="image-lightbox-nav image-lightbox-prev"
                @click.stop="galleryPrev">&lt;</button>
        <div class="image-lightbox-content" @click.stop>
          <img :src="team.photos[galleryIdx].url" :alt="team.photos[galleryIdx].caption" />
        </div>
        <button v-if="team.photos.length > 1" class="image-lightbox-nav image-lightbox-next"
                @click.stop="galleryNext">&gt;</button>
      </div>
    </Teleport>

    <!-- ═══ 功能路线图 ═══ -->
    <section class="section roadmap-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('about.roadmap') }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">{{ t('about.roadmapSub') }}</p>

        <div class="rm-timeline">
          <div v-for="(phase, pi) in roadmap" :key="pi"
               class="rm-node reveal" :class="{ done: phase.done }"
               :style="{ transitionDelay: `${pi * 0.1}s` }">
            <!-- 时间线 -->
            <div class="rm-track">
              <div class="rm-dot" :class="{ active: phase.done }"></div>
              <div v-if="pi < roadmap.length - 1" class="rm-line"></div>
            </div>
            <!-- 卡片 -->
            <div class="rm-card glass-card" :class="{ 'rm-done-card': phase.done }">
              <div class="rm-phase-label">{{ phase.phase }}</div>
              <h3>{{ phase.title }}</h3>
              <ul>
                <li v-for="(item, ii) in phase.items" :key="ii">
                  <span class="rm-check">{{ phase.done ? '✓' : '○' }}</span>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 技术栈 ═══ -->
    <section class="section tech-section">
      <div class="container">
        <h2 class="section-title glow-text">{{ t('about.techTitle') }}</h2>
        <div class="section-divider"></div>
        <div class="tech-grid reveal">
          <div class="tech-card glass-card">
            <h4>{{ t('about.techFront') }}</h4>
            <p>Vue 3 Composition API</p>
            <p>Vite 5 构建工具</p>
            <p>Vue Router 4 路由</p>
            <p>IntersectionObserver API</p>
            <p>CSS 多主题系统</p>
          </div>
          <div class="tech-card glass-card">
            <h4>⚙️ 后端（计划中）</h4>
            <p>Python FastAPI</p>
            <p>PostgreSQL 数据库</p>
            <p>Ollama AI 推理</p>
            <p>RESTful API</p>
            <p>WebSocket 实时通信</p>
          </div>
          <div class="tech-card glass-card">
            <h4>🚀 部署</h4>
            <p>Nginx 反向代理</p>
            <p>Docker 容器化</p>
            <p>CI/CD 自动化</p>
            <p>HTTPS / CDN</p>
            <p>持续集成部署</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { developerInfo, teamInfo, roadmap } from '../data/mockData.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useI18n } from '../composables/useI18n.js'

useScrollReveal()
const { t, locale } = useI18n()
const dev = developerInfo
const team = teamInfo

const i18nDev = computed(() => ({
  ...dev,
  role: t('about.devRole'),
  description: t('about.devDesc'),
  motto: t('about.devMotto'),
}))

const i18nTeam = computed(() => ({
  ...team,
  projectDesc: t('about.teamDesc'),
}))

// 图片灯箱
const galleryOpen = ref(false)
const galleryIdx = ref(0)

const openGallery = (idx) => {
  galleryIdx.value = idx
  galleryOpen.value = true
}
const galleryPrev = () => {
  galleryIdx.value = (galleryIdx.value - 1 + team.photos.length) % team.photos.length
}
const galleryNext = () => {
  galleryIdx.value = (galleryIdx.value + 1) % team.photos.length
}
</script>

<style scoped>
.about-hero {
  position: relative; padding: 80px 0 60px; text-align: center;
  background: radial-gradient(ellipse at center, rgba(198,40,40,0.06) 0%, transparent 70%), var(--bg-secondary);
}
.ah-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 18px; border-radius: 20px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  font-size: 0.82rem; color: var(--text-muted); margin-bottom: 24px;
}
.ah-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-blue); animation: pulse 2s infinite; }
.about-title { font-family: var(--font-serif); font-size: 2.6rem; font-weight: 900; color: var(--text-primary); margin-bottom: 12px; }
.about-desc { font-size: 1rem; color: var(--text-secondary); }

/* ── Developer Card ── */
.dev-section { display: flex; justify-content: center; }
.dev-card {
  padding: 56px 48px; text-align: center; max-width: 580px; width: 100%;
  background: linear-gradient(145deg, var(--bg-glass), rgba(198,40,40,0.02));
}
.dev-avatar-wrap { position: relative; width: 110px; height: 110px; margin: 0 auto 24px; }
.dev-avatar-ring {
  position: absolute; inset: -5px; border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(135deg, var(--red-primary), var(--gold-primary), var(--red-primary)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: float 4s infinite var(--ease-in-out);
}
.dev-avatar-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 1; }

.dev-role-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 16px; border-radius: 16px;
  background: rgba(198,40,40,0.1); border: 1px solid rgba(198,40,40,0.15);
  font-size: 0.75rem; color: var(--red-primary); margin-bottom: 16px;
}
.role-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red-primary); animation: pulse 2s infinite; }

.dev-name { font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-primary); margin-bottom: 4px; }
.dev-title { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; }
.dev-intro {
  font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;
  max-width: 440px; margin: 0 auto 12px; text-align: left;
}
.dev-motto {
  font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-primary);
  font-style: italic; margin-bottom: 20px;
}
.dev-skills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 32px; }
.skill-pill {
  padding: 5px 16px; border-radius: 16px;
  background: rgba(198,40,40,0.08); color: var(--red-primary);
  border: 1px solid rgba(198,40,40,0.12);
  font-size: 0.75rem; font-family: var(--font-mono);
  transition: all 0.3s;
}
.skill-pill:hover { background: rgba(198,40,40,0.15); transform: translateY(-2px); }

/* ── Contact Section ── */
.dev-contact-section { max-width: 420px; margin: 0 auto; }
.contact-section-title {
  font-family: var(--font-serif); font-size: 0.95rem;
  color: var(--text-primary); margin-bottom: 14px;
  font-weight: 600; text-align: center;
}
.dev-contact-list { display: flex; flex-direction: column; gap: 10px; }
.contact-row {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 20px; border-radius: var(--radius-md);
  transition: all 0.35s var(--ease-out-expo);
  text-decoration: none; color: inherit;
}
.contact-row:hover {
  border-color: var(--red-primary);
  box-shadow: 0 4px 20px rgba(198,40,40,0.1);
  transform: translateX(4px);
}
.cr-icon { font-size: 1.4rem; flex-shrink: 0; width: 36px; text-align: center; }
.cr-label {
  font-size: 0.78rem; color: var(--text-muted);
  min-width: 40px; font-weight: 500;
  padding: 2px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.03);
  text-align: center;
}
[data-theme="light"] .cr-label,
[data-theme="sunset"] .cr-label,
[data-theme="lavender"] .cr-label {
  background: rgba(0,0,0,0.03);
}
.cr-value {
  font-size: 0.88rem; color: var(--text-primary);
  font-family: var(--font-mono); word-break: break-all;
  margin-left: auto;
}

/* ── Team Section ── */
.team-section { background: var(--bg-secondary); }
.team-project-img { max-width: 500px; margin: 0 auto 28px; text-align: center; }
.tpi-img {
  max-width: 100%; height: auto; border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.team-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 720px; margin: 0 auto 32px; }
.team-stat-card { padding: 24px 16px; text-align: center; }
.tsc-number { display: block; font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--red-primary); }
.tsc-label { display: block; font-size: 0.78rem; color: var(--text-muted); margin-top: 6px; }

.team-desc {
  max-width: 680px; margin: 24px auto 32px;
  text-align: center; font-size: 0.95rem; color: var(--text-secondary);
  line-height: 1.9; text-indent: 2em;
}

/* 团队合照 */
.team-photos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto 28px; }
.team-photo-card { padding: 12px; cursor: pointer; }
.tpc-img-wrap { position: relative; border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 4/3; }
.tpc-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-out-expo); }
.tpc-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; color: #fff; font-size: 0.85rem;
  opacity: 0; transition: opacity 0.35s;
}
.tpc-zoom-icon { font-size: 1.8rem; }
.team-photo-card:hover .tpc-img { transform: scale(1.05); }
.team-photo-card:hover .tpc-overlay { opacity: 1; }
.tpc-caption { text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 10px; }

/* 指导老师 */
.team-subtitle {
  font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary);
  margin-bottom: 20px; text-align: center;
}
.team-instructors { max-width: 600px; margin: 0 auto 36px; }
.instructor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.instructor-card {
  padding: 20px 16px; display: flex; flex-direction: column; align-items: center;
  gap: 10px; text-align: center;
}
.ic-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(135deg, var(--red-primary), var(--gold-primary));
  color: #fff; font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.ic-name { font-size: 0.9rem; color: var(--text-primary); font-weight: 600; }
.ic-title { font-size: 0.72rem; color: var(--text-muted); }

/* 团队成员 */
.team-members { max-width: 780px; margin: 0 auto; }
.member-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.member-tag {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; border-radius: var(--radius-sm);
  transition: all 0.3s;
}
.member-tag:hover { border-color: var(--red-primary); transform: translateY(-2px); }
.mt-num { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
.mt-name { font-size: 0.88rem; color: var(--text-primary); }

/* ── Roadmap ── */
.roadmap-section { background: var(--bg-primary); }
.rm-timeline { max-width: 680px; margin: 0 auto; }
.rm-node { display: flex; gap: 24px; margin-bottom: 0; }
.rm-track { display: flex; flex-direction: column; align-items: center; width: 32px; flex-shrink: 0; }
.rm-dot {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  background: var(--bg-secondary); border: 2px solid rgba(255,255,255,0.1);
  transition: all 0.3s;
}
.rm-dot.active { background: var(--accent-green); border-color: var(--accent-green); box-shadow: 0 0 12px rgba(76,175,80,0.3); }
.rm-line { width: 1px; flex: 1; min-height: 40px; background: rgba(255,255,255,0.05); }
.rm-card { padding: 24px 28px; flex: 1; margin-bottom: 24px; }
.rm-phase-label {
  display: inline-block; padding: 3px 12px; border-radius: 12px;
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.05em;
  background: rgba(198,40,40,0.1); color: #EF5350; margin-bottom: 10px;
}
.rm-node.done .rm-phase-label { background: rgba(76,175,80,0.1); color: #66BB6A; }
.rm-card h3 { font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); margin-bottom: 14px; }
.rm-card li {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.85rem; color: var(--text-secondary);
  line-height: 2; padding-left: 0;
}
.rm-check { font-size: 0.7rem; color: var(--text-muted); width: 14px; }
.rm-node.done .rm-check { color: var(--accent-green); }
.rm-done-card { opacity: 0.6; }

/* ── Tech Stack ── */
.tech-section { background: var(--bg-secondary); }
.tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tech-card { padding: 28px; }
.tech-card h4 { font-family: var(--font-serif); font-size: 1.05rem; color: var(--text-primary); margin-bottom: 14px; }
.tech-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 2.2; position: relative; padding-left: 16px; }
.tech-card p::before { content: '▸'; position: absolute; left: 0; color: var(--gold-primary); font-size: 0.6rem; top: 2px; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .team-photos-grid { grid-template-columns: 1fr; max-width: 500px; }
  .instructor-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .about-title { font-size: 1.8rem; }
  .tech-grid { grid-template-columns: 1fr; }
  .dev-card { padding: 32px 24px; }
  .member-grid { grid-template-columns: repeat(2, 1fr); }
  .team-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dev-contact-list { gap: 8px; }
  .contact-row { padding: 12px 16px; gap: 10px; }
  .cr-value { font-size: 0.78rem; }
  .team-photos-grid { max-width: 100%; }
}
@media (max-width: 480px) {
  .member-grid { grid-template-columns: 1fr; }
}
</style>
