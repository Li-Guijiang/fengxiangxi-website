// useGlobalFX.js — Global interactive effects: cursor trail, tilt, loading screen
import { onMounted, onUnmounted } from 'vue'

export function useGlobalFX() {
  let trails = [], trailTimer = null, mx = 0, my = 0
  let trailCanvas, trailCtx

  // ── 1. Page Loader ──
  let loaderEl = null
  const initLoader = () => {
    loaderEl = document.createElement('div')
    loaderEl.className = 'page-loader'
    loaderEl.innerHTML = '<div class="loader-icon">✦</div><div class="loader-bar"></div>'
    document.body.appendChild(loaderEl)
    setTimeout(() => { if (loaderEl) loaderEl.remove() }, 2600)
  }

  // ── 2. Dramatic Cursor Trail ──
  const initTrail = () => {
    trailCanvas = document.createElement('canvas')
    trailCanvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;mix-blend-mode:screen'
    trailCanvas.width = window.innerWidth
    trailCanvas.height = window.innerHeight
    document.body.appendChild(trailCanvas)
    trailCtx = trailCanvas.getContext('2d')
    animateTrail()
  }

  const animateTrail = () => {
    if (!trailCtx) return
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)
    trails.push({ x: mx, y: my, life: 1, hue: 40 + Math.random() * 20, size: 2 + Math.random() * 4 })
    if (trails.length > 50) trails.shift()
    trails.forEach(t => {
      t.life -= 0.018
      if (t.life <= 0) return
      const a = t.life * 0.5, r = t.size * t.life
      trailCtx.beginPath(); trailCtx.arc(t.x, t.y, r, 0, Math.PI*2)
      trailCtx.fillStyle = `hsla(${t.hue},90%,70%,${a})`; trailCtx.fill()
    })
    trails = trails.filter(t => t.life > 0)
    trailTimer = requestAnimationFrame(animateTrail)
  }

  // ── 3. 3D Tilt ──
  let tiltEls = []
  const initTilt = () => { document.querySelectorAll('.tilt-3d').forEach(el => tiltEls.push(el)) }
  let tiltObs = new MutationObserver(() => { tiltEls = []; initTilt() })
  const onTilt = (e) => {
    tiltEls.forEach(el => {
      const r = el.getBoundingClientRect()
      const rx = ((e.clientY - r.top - r.height/2) / (r.height/2)) * -10
      const ry = ((e.clientX - r.left - r.width/2) / (r.width/2)) * 10
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom)
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    })
  }
  const onTiltOut = () => { tiltEls.forEach(el => el.style.transform = '') }

  // ── 4. Scroll Reveal ──
  let revealObs = null
  const initReveal = () => {
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) } })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal,.reveal-bold').forEach(el => revealObs.observe(el))
  }

  const onMouse = (e) => { mx = e.clientX; my = e.clientY }
  const onResize = () => { if (trailCanvas) { trailCanvas.width = window.innerWidth; trailCanvas.height = window.innerHeight } }

  onMounted(() => {
    initLoader()
    initTrail()
    initTilt()
    tiltObs.observe(document.body, { childList: true, subtree: true })
    initReveal()
    document.addEventListener('mousemove', onMouse)
    document.addEventListener('mousemove', onTilt)
    document.addEventListener('mouseleave', onTiltOut)
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    cancelAnimationFrame(trailTimer)
    if (trailCanvas) trailCanvas.remove()
    tiltObs.disconnect()
    if (revealObs) revealObs.disconnect()
    document.removeEventListener('mousemove', onMouse)
    document.removeEventListener('mousemove', onTilt)
    document.removeEventListener('mouseleave', onTiltOut)
    window.removeEventListener('resize', onResize)
  })
}
