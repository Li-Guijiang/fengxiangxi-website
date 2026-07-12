<!-- TypeWriter.vue — 终端打字机效果组件 -->
<template>
  <span class="typewriter" :aria-label="displayed">
    <span class="tw-text">{{ displayed }}</span>
    <span class="tw-cursor">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  texts: { type: Array, required: true },
  typeSpeed: { type: Number, default: 80 },
  deleteSpeed: { type: Number, default: 40 },
  pauseMs: { type: Number, default: 2000 },
})

const displayed = ref('')
let timer = null
let currentTextIndex = 0
let charIndex = 0
let isDeleting = false

const tick = () => {
  const full = props.texts[currentTextIndex]
  if (!isDeleting) {
    charIndex++
    displayed.value = full.slice(0, charIndex)
    if (charIndex >= full.length) {
      timer = setTimeout(() => { isDeleting = true; schedule() }, props.pauseMs)
      return
    }
    timer = setTimeout(schedule, props.typeSpeed + Math.random() * 40)
  } else {
    charIndex--
    displayed.value = full.slice(0, charIndex)
    if (charIndex <= 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % props.texts.length
      timer = setTimeout(schedule, 300)
      return
    }
    timer = setTimeout(schedule, props.deleteSpeed + Math.random() * 20)
  }
}
const schedule = () => { tick() }

onMounted(() => { schedule() })
onUnmounted(() => { clearTimeout(timer) })
</script>

<style scoped>
.typewriter {
  display: inline-flex; align-items: baseline; gap: 1px;
  font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;
}
.tw-cursor {
  display: inline-block; font-weight: 400; color: var(--red-primary);
  animation: tw-blink 0.7s step-end infinite;
}
@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
</style>
