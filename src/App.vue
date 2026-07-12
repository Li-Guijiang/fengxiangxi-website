<template>
  <div id="app-root">
    <!-- 阅读进度条 -->
    <div class="reading-progress" :style="{ width: progressPercent + '%' }"></div>

    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />

    <!-- 浮动按钮组（从上到下：设置 → AI助手 → 回到顶部） -->
    <div class="floating-actions">
      <!-- 设置面板按钮 -->
      <button class="settings-panel-trigger" @click="settingsOpen = !settingsOpen" :aria-label="t('settings.fontSize')">
        ⚙️
      </button>

      <!-- AI 智能助手（可拖拽） -->
      <button ref="aiBtnRef" class="ai-float-btn"
              :style="aiBtnStyle"
              @mousedown.prevent="startDrag" @touchstart="startDrag"
              :aria-label="t('ai.title')">
        <span class="ai-btn-icon">{{ chatOpen ? '✕' : '🤖' }}</span>
        <span class="ai-btn-label">{{ chatOpen ? t('common.close') : 'AI助手' }}</span>
      </button>

      <!-- 回到顶部 -->
      <button class="back-to-top" :class="{ visible: showBackTop }" @click="scrollToTop" :aria-label="t('common.backToTop')">
        ↑
      </button>
    </div>

    <!-- 设置面板 -->
    <Teleport to="body">
      <div v-if="settingsOpen" class="settings-panel-overlay" @click="settingsOpen = false"></div>
      <div v-if="settingsOpen" class="settings-panel" @click.stop>
        <div class="settings-header">
          <span class="settings-header-title">⚙️ 设置</span>
          <button class="ai-chat-close" @click="settingsOpen = false">✕</button>
        </div>
        <div class="settings-section">
          <span class="settings-label">{{ t('settings.fontSize') }}</span>
          <div class="font-size-btns">
            <button :class="{ active: fontSize === 'normal' }" @click="applyFontSize('normal')">{{ t('settings.normal') }}</button>
            <button :class="{ active: fontSize === 'large' }" @click="applyFontSize('large')">{{ t('settings.large') }}</button>
            <button :class="{ active: fontSize === 'xlarge' }" @click="applyFontSize('xlarge')">{{ t('settings.xlarge') }}</button>
          </div>
        </div>
        <div class="settings-section">
          <span class="settings-label">{{ t('settings.lang') }}</span>
          <div class="lang-switch">
            <button :class="{ active: locale === 'zh' }" @click="switchLang('zh')">{{ t('settings.chinese') }}</button>
            <button :class="{ active: locale === 'en' }" @click="switchLang('en')">{{ t('settings.english') }}</button>
          </div>
        </div>
        <div class="settings-section">
          <span class="settings-label">{{ t('settings.imgStyle') }}</span>
          <div class="img-style-btns">
            <button :class="{ active: imgStyle === 'default' }" @click="applyImgStyle('default')">{{ t('settings.default') }}</button>
            <button :class="{ active: imgStyle === 'rounded' }" @click="applyImgStyle('rounded')">{{ t('settings.rounded') }}</button>
            <button :class="{ active: imgStyle === 'vintage' }" @click="applyImgStyle('vintage')">{{ t('settings.vintage') }}</button>
            <button :class="{ active: imgStyle === 'vivid' }" @click="applyImgStyle('vivid')">{{ t('settings.vivid') }}</button>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-row">
            <span>{{ t('settings.reduceMotion') }}</span>
            <div class="lang-switch">
              <button :class="{ active: reduceMotion }" @click="toggleReduceMotion">{{ reduceMotion ? t('settings.on') : t('settings.off') }}</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- AI 对话面板（跟随悬浮窗位置） -->
    <Teleport to="body">
      <div v-if="chatOpen" class="ai-chat-panel" :style="chatPanelStyle">
        <div class="ai-chat-header">
          <span class="ai-chat-title">{{ t('ai.title') }}</span>
          <button class="ai-chat-close" @click="chatOpen = false">✕</button>
        </div>
        <div class="ai-chat-body" ref="chatBodyRef">
          <div class="ai-msg assistant">{{ t('ai.greeting') }}</div>
          <div v-for="(msg, mi) in chatMessages" :key="mi" class="ai-msg" :class="msg.role">{{ msg.text }}</div>
        </div>
        <div class="ai-quick-questions">
          <button v-for="q in quickQuestions" :key="q" class="ai-quick-q" @click="sendQuick(q)">{{ q }}</button>
        </div>
        <div class="ai-chat-input-wrap">
          <input class="ai-chat-input" v-model="chatInput" @keyup.enter="sendMessage" :placeholder="t('ai.placeholder')" />
          <button class="ai-chat-send" @click="sendMessage">➤</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './composables/useTheme.js'
import { useSettings } from './composables/useSettings.js'
import { useI18n } from './composables/useI18n.js'

const { fontSize, imgStyle, reduceMotion, applyFontSize, applyImgStyle, toggleReduceMotion } = useSettings()
const { locale, t, setLocale } = useI18n()
const switchLang = (lang) => { setLocale(lang); localStorage.setItem('fx-lang', lang) }
const settingsOpen = ref(false)

// 阅读进度
const progressPercent = ref(0)
const showBackTop = ref(false)
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
const handleScroll = () => {
  const h = document.documentElement
  progressPercent.value = h.scrollHeight > window.innerHeight
    ? Math.min((window.scrollY / (h.scrollHeight - window.innerHeight)) * 100, 100) : 0
  showBackTop.value = window.scrollY > 400
}

// AI Chat
const chatOpen = ref(false)
const chatInput = ref('')
const chatMessages = ref([])
const chatBodyRef = ref(null)

const quickQuestions = computed(() => locale.value === 'en'
  ? ['Where is Fengxiangxi?', 'Red tourism sites?', 'Local products?', 'How to get there?']
  : ['枫香溪在哪里？', '有什么红色景点？', '当地特产有哪些？', '如何前往枫香溪？'])

const aiResponses = computed(() => locale.value === 'en' ? {
  'Where is Fengxiangxi?': 'Fengxiangxi is in southeast Dejiang County, Tongren, Guizhou, in the Wuling Mountains. The Red Third Army established the East Guizhou Revolutionary Base here in 1934.',
  'Red tourism sites?': 'Fengxiangxi has 23 red cultural sites including the Conference Site (National Heritage), Sandong Bridge, 7th Division HQ, Monument, Red Army Well, Red Army Bridge, and more.',
  'Local products?': 'Five green industries: Alpine Gastrodia, Matcha Tea (12,000 mu), Dejiang Plums, Apple Peaches, and Bamboo Shoots (500 mu). Visit Green Industry page!',
  'How to get there?': 'Reach Tongren first → bus to Dejiang → 40 min drive to Fengxiangxi. Driving recommended for Wuling Mountain scenery!',
} : {
  '枫香溪在哪里？': '枫香溪位于贵州省铜仁市德江县东南部，武陵山脉腹地。1934年红三军在此创建黔东革命根据地，是全国重点文物保护单位。',
  '有什么红色景点？': '枫香溪拥有23处红色遗址，八大核心景点：会议会址、三洞桥、七师师部旧址、纪念碑、红军井、红军桥、革委会旧址、医院旧址。',
  '当地特产有哪些？': '五大绿色产业：高山天麻、高山云雾抹茶（1.2万亩茶园）、德江高山好李子、德江苹果桃、德江山泉好茭白（500亩坝区）。',
  '如何前往枫香溪？': '先到铜仁市区，乘班车到德江县，从县城驱车约40分钟到枫香溪镇。建议自驾或包车，沿途欣赏武陵山脉美景。',
})

const sendQuick = (q) => {
  chatMessages.value.push({ role: 'user', text: q })
  const reply = aiResponses.value[q] || (locale.value === 'en' ? 'Thanks! Ask me about Fengxiangxi.' : '感谢！问我关于枫香溪的问题吧。')
  setTimeout(() => { chatMessages.value.push({ role: 'assistant', text: reply }); scrollChatBottom() }, 500)
}
const sendMessage = () => {
  const text = chatInput.value.trim()
  if (!text) return
  chatMessages.value.push({ role: 'user', text })
  chatInput.value = ''
  let reply = locale.value === 'en' ? 'Thanks! Browse our pages for more info.' : '感谢！浏览网站页面了解更多。'
  for (const [q, a] of Object.entries(aiResponses.value)) {
    if (text.includes(q.replace('？', '').replace('?', ''))) { reply = a; break }
  }
  if (/你好|您好|hello|hi/i.test(text)) reply = locale.value === 'en' ? 'Hello! I am the Fengxiangxi AI Assistant. How can I help?' : '您好！我是枫香溪AI助手，有什么可以帮您？'
  setTimeout(() => { chatMessages.value.push({ role: 'assistant', text: reply }); scrollChatBottom() }, 500)
}
const scrollChatBottom = async () => {
  await nextTick()
  if (chatBodyRef.value) chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
}

// AI按钮拖拽（RAF优化）
const aiBtnRef = ref(null)
const aiPos = ref({ x: null, y: null })
let dragStart = { x: 0, y: 0, elX: 0, elY: 0 }
let hasMoved = false
let rafId = null

const aiBtnStyle = computed(() => {
  if (aiPos.value.x !== null)
    return { position: 'fixed', right: 'auto', bottom: 'auto', left: aiPos.value.x + 'px', top: aiPos.value.y + 'px' }
  return {}
})

const chatPanelStyle = computed(() => {
  const isMobile = window.innerWidth <= 768
  if (isMobile) return {} // 移动端用CSS固定全宽布局
  if (aiPos.value.x !== null) {
    const pw = 360
    const pl = aiPos.value.x + 56
    const fits = pl + pw <= window.innerWidth
    if (fits) return { right: 'auto', left: pl + 'px', bottom: `calc(100vh - ${aiPos.value.y}px)`, maxHeight: Math.max(200, aiPos.value.y - 80) + 'px' }
    return { left: Math.max(8, aiPos.value.x - pw) + 'px', right: 'auto', bottom: `calc(100vh - ${aiPos.value.y}px)`, maxHeight: Math.max(200, aiPos.value.y - 80) + 'px' }
  }
  return {}
})

const startDrag = (e) => {
  const el = aiBtnRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = e.touches ? e.touches[0].clientX : e.clientX
  const cy = e.touches ? e.touches[0].clientY : e.clientY
  dragStart = { x: cx, y: cy, elX: rect.left, elY: rect.top }
  hasMoved = false
  // 移动端不阻止默认，让touchend能正常触发
  if (e.type === 'mousedown') e.preventDefault()
  document.addEventListener('mousemove', onDrag, { passive: false })
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e) => {
  if (rafId) return
  // 阻止触摸滚动
  if (e.cancelable) e.preventDefault()
  rafId = requestAnimationFrame(() => {
    rafId = null
    const cx = e.touches ? e.touches[0].clientX : e.clientX
    const cy = e.touches ? e.touches[0].clientY : e.clientY
    const dx = cx - dragStart.x; const dy = cy - dragStart.y
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true
    let nx = dragStart.elX + dx; let ny = dragStart.elY + dy
    nx = Math.max(8, Math.min(window.innerWidth - 56, nx))
    ny = Math.max(64, Math.min(window.innerHeight - 56, ny))
    aiPos.value = { x: nx, y: ny }
  })
}

const stopDrag = () => {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null }
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
  // 没有移动 = 点击行为，切换对话窗口
  if (!hasMoved) {
    chatOpen.value = !chatOpen.value
  }
  hasMoved = false
}

onMounted(() => { window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll() })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); stopDrag() })
</script>

<style>
#app-root { display: flex; flex-direction: column; min-height: 100vh; }
.main-content { flex: 1; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── 浮动按钮组 ── */
.floating-actions {
  position: fixed; right: 16px; bottom: 120px; z-index: 997;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  transition: all 0.3s;
}
@media (max-width: 768px) {
  .floating-actions { right: 12px; bottom: 100px; gap: 8px; }
}

/* AI按钮 */
.ai-float-btn {
  position: relative; /* 由父容器.floating-actions控制 */
  width: 52px; height: 52px; border-radius: 50%;
  background: linear-gradient(135deg, var(--red-primary), var(--gold-primary));
  border: none; color: #fff; font-size: 1.4rem; cursor: grab;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(198, 40, 40, 0.4);
  transition: all 0.35s var(--ease-out-expo);
  z-index: 998;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.ai-float-btn::after {
  content: ''; position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid rgba(198, 40, 40, 0.3);
  animation: aiPulseRing 2.5s infinite;
}
@keyframes aiPulseRing {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.15); opacity: 0; }
}
.ai-float-btn:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(198, 40, 40, 0.5); }
.ai-float-btn:active { cursor: grabbing; }
.ai-btn-icon { font-size: 1.3rem; line-height: 1; }
.ai-btn-label {
  font-size: 0.5rem; opacity: 0.8; font-weight: 500;
  display: block; line-height: 1; margin-top: 1px;
}
@media (max-width: 768px) {
  .ai-float-btn { width: 50px; height: 50px; }
  .ai-btn-icon { font-size: 1.2rem; }
}

/* 设置面板遮罩 */
.settings-panel-overlay { position: fixed; inset: 0; z-index: 1002; background: rgba(0,0,0,0.3); }

/* 设置面板标题 */
.settings-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
[data-theme="light"] .settings-header,
[data-theme="sunset"] .settings-header,
[data-theme="lavender"] .settings-header {
  border-bottom-color: rgba(0,0,0,0.06);
}
.settings-header-title {
  font-family: var(--font-serif); font-size: 1rem; color: var(--text-primary); font-weight: 600;
}
</style>
