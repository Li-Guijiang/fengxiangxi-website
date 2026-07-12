// useTheme.js — 多主题系统（深色/浅色 + 多套配色方案）
import { ref, watchEffect } from 'vue'

// 预设主题方案
export const themeSchemes = [
  { id: 'dark', name: '深邃暗夜', icon: '🌙', mode: 'dark', accent: '#C62828' },
  { id: 'light', name: '晨曦明亮', icon: '☀️', mode: 'light', accent: '#C62828' },
  { id: 'forest', name: '翠绿山林', icon: '🌲', mode: 'dark', accent: '#2E7D32' },
  { id: 'ocean', name: '蔚蓝海洋', icon: '🌊', mode: 'dark', accent: '#1565C0' },
  { id: 'sunset', name: '金色暖阳', icon: '🌅', mode: 'light', accent: '#E65100' },
  { id: 'lavender', name: '紫韵雅致', icon: '💜', mode: 'light', accent: '#7B1FA2' },
]

const theme = ref(localStorage.getItem('fx-theme') || 'dark')
const activeScheme = ref(localStorage.getItem('fx-theme-scheme') || 'dark')

// 获取主题对应的 Accent 颜色
function getAccentColor(schemeId) {
  const scheme = themeSchemes.find(s => s.id === schemeId)
  return scheme ? scheme.accent : '#C62828'
}

// 应用主题
const apply = (t) => {
  theme.value = t
  activeScheme.value = t
  document.documentElement.setAttribute('data-theme', t)

  // 设置 accent 颜色 CSS 变量
  const scheme = themeSchemes.find(s => s.id === t)
  if (scheme) {
    const accentColor = scheme.accent
    document.documentElement.style.setProperty('--red-primary', accentColor)
    // 动态计算暗色版本
    document.documentElement.style.setProperty('--red-dark', adjustColor(accentColor, -30))
    document.documentElement.style.setProperty('--red-deeper', adjustColor(accentColor, -60))
  }

  localStorage.setItem('fx-theme', t)
  localStorage.setItem('fx-theme-scheme', t)
}

// 简单的颜色调整函数（HSL调整）
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}

// 切换深色/浅色
const toggle = () => {
  const currentScheme = themeSchemes.find(s => s.id === theme.value)
  const targetMode = currentScheme && currentScheme.mode === 'dark' ? 'light' : 'dark'
  const nextScheme = themeSchemes.find(s => s.mode === targetMode)
  if (nextScheme) apply(nextScheme.id)
}

// 初始化
apply(theme.value)

// 监听系统偏好变化
const mq = window.matchMedia('(prefers-color-scheme: dark)')
const onSysChange = (e) => {
  if (!localStorage.getItem('fx-theme')) {
    const target = e.matches ? 'dark' : 'light'
    apply(target)
  }
}
mq.addEventListener('change', onSysChange)

export function useTheme() {
  return { theme, activeScheme, themeSchemes, toggle, apply, getAccentColor }
}
