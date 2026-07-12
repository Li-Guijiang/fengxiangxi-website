import { ref, watch } from 'vue'
import { useI18n } from './useI18n.js'

const fontSize = ref(localStorage.getItem('fx-font-size') || 'normal')
const imgStyle = ref(localStorage.getItem('fx-img-style') || 'default')
const reduceMotion = ref(localStorage.getItem('fx-reduce-motion') === 'true')

// Sync with i18n
const { locale } = useI18n()

const applyFontSize = (size) => {
  fontSize.value = size
  document.documentElement.setAttribute('data-font-size', size === 'normal' ? '' : size)
  localStorage.setItem('fx-font-size', size)
}

const applyImgStyle = (style) => {
  imgStyle.value = style
  document.documentElement.setAttribute('data-img-style', style === 'default' ? '' : style)
  localStorage.setItem('fx-img-style', style)
}

const toggleReduceMotion = () => {
  reduceMotion.value = !reduceMotion.value
  if (reduceMotion.value) {
    document.body.classList.add('reduce-motion')
  } else {
    document.body.classList.remove('reduce-motion')
  }
  localStorage.setItem('fx-reduce-motion', String(reduceMotion.value))
}

// Init
if (fontSize.value !== 'normal') document.documentElement.setAttribute('data-font-size', fontSize.value)
if (imgStyle.value !== 'default') document.documentElement.setAttribute('data-img-style', imgStyle.value)
if (reduceMotion.value) document.body.classList.add('reduce-motion')

export function useSettings() {
  return {
    fontSize, imgStyle, reduceMotion, locale,
    applyFontSize, applyImgStyle, toggleReduceMotion,
  }
}
