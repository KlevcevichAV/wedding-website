<template>
  <Transition name="fade">
    <div v-if="isOpen" class="lightbox-overlay" @click.self="close">
      <div class="lightbox-content">
        <button class="close-btn" @click="close">&times;</button>
        
        <button class="mute-btn" @click="$emit('toggle-mute')" :title="isMuted ? $t('dresscode.unmute') : $t('dresscode.mute')">
          <svg v-if="isMuted" viewBox="0 0 24 24" class="audio-svg"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="audio-svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </button>
        
        <div class="image-container">
          <Transition :name="transitionName" mode="out-in">
            <img :key="currentIndex" :src="images[currentIndex]" class="lightbox-image" alt="Outfit example" @touchstart="handleTouchStart" @touchend="handleTouchEnd" />
          </Transition>
        </div>

        <button v-if="images.length > 1" class="nav-btn prev" @click="prev">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button v-if="images.length > 1" class="nav-btn next" @click="next">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        <div class="counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isMuted: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'toggle-mute'])

const currentIndex = ref(0)
const transitionName = ref('slide-right')

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    currentIndex.value = 0
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const close = () => {
  emit('close')
}

const next = () => {
  transitionName.value = 'slide-left'
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  transitionName.value = 'slide-right'
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// Touch support
let touchStartX = 0
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}
const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchStartX - touchEndX
  if (Math.abs(diff) > 50) {
    if (diff > 0) next()
    else prev()
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from { opacity: 0; transform: translateX(20px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-20px); }

.slide-right-enter-from { opacity: 0; transform: translateX(-20px); }
.slide-right-leave-to { opacity: 0; transform: translateX(20px); }

.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
}

.mute-btn {
  position: absolute;
  top: -40px;
  right: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: opacity 0.3s;
}

.mute-btn:hover {
  opacity: 0.7;
}

.audio-svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn svg {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.prev { left: -60px; }
.next { right: -60px; }

.counter {
  position: absolute;
  bottom: -40px;
  color: white;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .prev { left: 10px; }
  .next { right: 10px; }
  .nav-btn {
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.3);
  }
  .mute-btn {
    right: 40px;
    top: -35px;
  }
  .close-btn {
    top: -35px;
  }
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from { opacity: 0; transform: translateX(20px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-20px); }

.slide-right-enter-from { opacity: 0; transform: translateX(-20px); }
.slide-right-leave-to { opacity: 0; transform: translateX(20px); }
</style>
