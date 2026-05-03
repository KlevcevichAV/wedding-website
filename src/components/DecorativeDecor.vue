<template>
  <div class="decorative-decor" aria-hidden="true">
    <div 
      v-for="(item, index) in activeDecor" 
      :key="index" 
      class="decor-item"
      :style="{
        top: item.top,
        left: item.left,
        right: item.right,
        bottom: item.bottom,
        opacity: item.opacity || 0.6
      }"
    >
      <LeafIcon 
        v-if="item.type === 'leaf'" 
        :size="item.size" 
        :color="item.color" 
        :rotate="item.rotate" 
      />
      <HeartIcon 
        v-if="item.type === 'heart'" 
        :size="item.size" 
        :color="item.color" 
        :rotate="item.rotate" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LeafIcon from './icons/LeafIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'

const desktopDecor = [
  // Веточки по углам или краям
  { type: 'leaf', top: '5%', left: '2%', size: 120, color: '#78866b', rotate: -15, opacity: 0.4 },
  { type: 'leaf', top: '25%', right: '3%', size: 80, color: '#78866b', rotate: 45, opacity: 0.3 },
  { type: 'leaf', bottom: '10%', left: '3%', size: 100, color: '#78866b', rotate: 180, opacity: 0.3 },
  { type: 'leaf', bottom: '5%', right: '2%', size: 130, color: '#78866b', rotate: -160, opacity: 0.4 },
  
  // Сердечки в случайных местах (как на приглашении)
  { type: 'heart', top: '15%', left: '15%', size: 24, color: '#624a44', rotate: -10 },
  { type: 'heart', top: '20%', right: '20%', size: 32, color: '#78866b', rotate: 15 },
  { type: 'heart', top: '45%', left: '10%', size: 20, color: '#624a44', rotate: -20 },
  { type: 'heart', top: '60%', right: '15%', size: 28, color: '#78866b', rotate: 10 },
  { type: 'heart', bottom: '30%', left: '12%', size: 26, color: '#78866b', rotate: 5 },
  { type: 'heart', bottom: '20%', right: '10%', size: 22, color: '#624a44', rotate: -15 },
  { type: 'heart', top: '35%', left: '45%', size: 18, color: '#78866b', rotate: 12 },
  { type: 'heart', bottom: '45%', right: '40%', size: 20, color: '#624a44', rotate: -8 },
  { type: 'heart', top: '75%', left: '8%', size: 24, color: '#78866b', rotate: 20 },
  { type: 'heart', bottom: '15%', left: '25%', size: 18, color: '#624a44', rotate: -5 },
  { type: 'heart', top: '55%', right: '35%', size: 22, color: '#78866b', rotate: 15 },
]

const mobileDecor = [
  { type: 'leaf', top: '2%', left: '-5%', size: 80, color: '#78866b', rotate: -10, opacity: 0.4 },
  { type: 'leaf', bottom: '5%', right: '-5%', size: 90, color: '#78866b', rotate: -170, opacity: 0.4 },
  
  { type: 'heart', top: '10%', right: '10%', size: 20, color: '#624a44', rotate: 15 },
  { type: 'heart', top: '30%', left: '5%', size: 18, color: '#78866b', rotate: -10 },
  { type: 'heart', bottom: '40%', right: '5%', size: 22, color: '#624a44', rotate: 10 },
  { type: 'heart', bottom: '15%', left: '10%', size: 16, color: '#78866b', rotate: -5 },
  { type: 'heart', top: '50%', right: '8%', size: 18, color: '#78866b', rotate: 20 },
  { type: 'heart', top: '70%', left: '12%', size: 14, color: '#624a44', rotate: -15 },
]

const activeDecor = ref([])
const isMobile = ref(false)

const updateDecor = () => {
  isMobile.value = window.innerWidth < 768
  activeDecor.value = isMobile.value ? mobileDecor : desktopDecor
}

onMounted(() => {
  updateDecor()
  window.addEventListener('resize', updateDecor)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDecor)
})
</script>

<style scoped>
.decorative-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.decor-item {
  position: absolute;
  transition: all 0.5s ease;
}

[data-theme='dark'] .decor-item {
  filter: brightness(1.2);
}
</style>
