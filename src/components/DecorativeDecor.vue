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
        :variant="item.variant || 1"
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
  // Веточки по углам или краям (новые варианты)
  { type: 'leaf', variant: 1, top: '2%', left: '1%', size: 180, color: '#78866b', rotate: -15, opacity: 0.5 },
  { type: 'leaf', variant: 2, top: '15%', right: '2%', size: 150, color: '#78866b', rotate: 45, opacity: 0.4 },
  { type: 'leaf', variant: 3, top: '35%', left: '2%', size: 160, color: '#78866b', rotate: 180, opacity: 0.4 },
  { type: 'leaf', variant: 1, top: '55%', right: '1%', size: 180, color: '#78866b', rotate: -160, opacity: 0.5 },
  { type: 'leaf', variant: 2, top: '75%', left: '1%', size: 150, color: '#78866b', rotate: 20, opacity: 0.4 },
  { type: 'leaf', variant: 3, top: '95%', right: '2%', size: 170, color: '#78866b', rotate: -30, opacity: 0.5 },
  
  // Сердечки в случайных местах (распределенные по всей высоте)
  // Section 1 (Hero)
  { type: 'heart', top: '5%', left: '10%', size: 24, color: '#624a44', rotate: -10 },
  { type: 'heart', top: '8%', right: '15%', size: 32, color: '#78866b', rotate: 15 },
  { type: 'heart', top: '12%', left: '40%', size: 20, color: '#624a44', rotate: 5 },
  
  // Section 2 (Timer)
  { type: 'heart', top: '18%', right: '10%', size: 22, color: '#624a44', rotate: -15 },
  { type: 'heart', top: '22%', left: '15%', size: 28, color: '#78866b', rotate: 10 },
  
  // Section 3 (Program)
  { type: 'heart', top: '28%', left: '8%', size: 26, color: '#78866b', rotate: 5 },
  { type: 'heart', top: '32%', right: '25%', size: 18, color: '#624a44', rotate: 12 },
  { type: 'heart', top: '35%', left: '45%', size: 22, color: '#78866b', rotate: -8 },
  
  // Section 4 (Location)
  { type: 'heart', top: '42%', right: '12%', size: 24, color: '#624a44', rotate: 20 },
  { type: 'heart', top: '45%', left: '20%', size: 20, color: '#78866b', rotate: -12 },
  { type: 'heart', top: '48%', right: '35%', size: 18, color: '#624a44', rotate: 15 },
  
  // Section 5 (Dress Code)
  { type: 'heart', top: '52%', left: '12%', size: 26, color: '#78866b', rotate: -5 },
  { type: 'heart', top: '55%', right: '5%', size: 22, color: '#624a44', rotate: 18 },
  { type: 'heart', top: '58%', left: '30%', size: 24, color: '#78866b', rotate: 10 },
  
  // Section 6 (RSVP)
  { type: 'heart', top: '62%', right: '15%', size: 20, color: '#624a44', rotate: -10 },
  { type: 'heart', top: '65%', left: '5%', size: 22, color: '#78866b', rotate: 25 },
  { type: 'heart', top: '68%', right: '40%', size: 18, color: '#624a44', rotate: -5 },
  
  // Section 7 (Wishes)
  { type: 'heart', top: '72%', left: '15%', size: 28, color: '#78866b', rotate: 15 },
  { type: 'heart', top: '75%', right: '20%', size: 24, color: '#624a44', rotate: 12 },
  { type: 'heart', top: '78%', left: '45%', size: 20, color: '#78866b', rotate: -8 },
  
  // Section 8 (Chat)
  { type: 'heart', top: '82%', right: '10%', size: 22, color: '#624a44', rotate: 20 },
  { type: 'heart', top: '85%', left: '25%', size: 26, color: '#78866b', rotate: -15 },
  { type: 'heart', top: '88%', right: '30%', size: 18, color: '#624a44', rotate: 5 },
  
  // Section 9 (Final)
  { type: 'heart', top: '92%', left: '10%', size: 24, color: '#78866b', rotate: 15 },
  { type: 'heart', top: '95%', right: '15%', size: 30, color: '#624a44', rotate: -10 },
  { type: 'heart', top: '98%', left: '50%', size: 20, color: '#78866b', rotate: 8 },

  // Дополнительные для плотности
  { type: 'heart', top: '25%', left: '35%', size: 16, color: '#624a44', rotate: 10 },
  { type: 'heart', top: '50%', right: '45%', size: 18, color: '#78866b', rotate: -12 },
  { type: 'heart', top: '70%', left: '40%', size: 16, color: '#624a44', rotate: 5 },
  { type: 'heart', top: '10%', right: '50%', size: 18, color: '#78866b', rotate: -20 },
]

const mobileDecor = [
  { type: 'leaf', variant: 1, top: '2%', left: '-5%', size: 120, color: '#78866b', rotate: -10, opacity: 0.5 },
  { type: 'leaf', variant: 2, top: '25%', right: '-5%', size: 100, color: '#78866b', rotate: 45, opacity: 0.4 },
  { type: 'leaf', variant: 3, top: '50%', left: '-5%', size: 110, color: '#78866b', rotate: 160, opacity: 0.4 },
  { type: 'leaf', variant: 1, top: '75%', right: '-5%', size: 100, color: '#78866b', rotate: -30, opacity: 0.5 },
  { type: 'leaf', variant: 2, top: '95%', left: '-5%', size: 130, color: '#78866b', rotate: -170, opacity: 0.5 },
  
  // Больше сердечек для мобильной версии
  { type: 'heart', top: '5%', right: '10%', size: 20, color: '#624a44', rotate: 15 },
  { type: 'heart', top: '10%', left: '5%', size: 18, color: '#78866b', rotate: -10 },
  { type: 'heart', top: '15%', right: '15%', size: 16, color: '#624a44', rotate: 5 },
  { type: 'heart', top: '20%', left: '10%', size: 22, color: '#78866b', rotate: 10 },
  { type: 'heart', top: '25%', right: '5%', size: 14, color: '#624a44', rotate: -15 },
  { type: 'heart', top: '30%', left: '15%', size: 18, color: '#78866b', rotate: 20 },
  { type: 'heart', top: '35%', right: '10%', size: 20, color: '#624a44', rotate: -10 },
  { type: 'heart', top: '40%', left: '8%', size: 16, color: '#78866b', rotate: 15 },
  { type: 'heart', top: '45%', right: '12%', size: 18, color: '#624a44', rotate: -5 },
  { type: 'heart', top: '50%', left: '10%', size: 20, color: '#78866b', rotate: 10 },
  { type: 'heart', top: '55%', right: '15%', size: 14, color: '#624a44', rotate: -20 },
  { type: 'heart', top: '60%', left: '5%', size: 18, color: '#78866b', rotate: 25 },
  { type: 'heart', top: '65%', right: '20%', size: 16, color: '#624a44', rotate: -12 },
  { type: 'heart', top: '70%', left: '12%', size: 20, color: '#78866b', rotate: 10 },
  { type: 'heart', top: '75%', right: '8%', size: 18, color: '#624a44', rotate: -15 },
  { type: 'heart', top: '80%', left: '15%', size: 16, color: '#78866b', rotate: 5 },
  { type: 'heart', top: '85%', right: '10%', size: 20, color: '#624a44', rotate: 15 },
  { type: 'heart', top: '90%', left: '8%', size: 18, color: '#78866b', rotate: -10 },
  { type: 'heart', top: '95%', right: '5%', size: 22, color: '#624a44', rotate: 10 },
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
