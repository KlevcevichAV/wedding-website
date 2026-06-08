<template>
  <section class="dress-code">
    <div class="container">
      <h2 class="section-title">{{ $t('dresscode.title') }}</h2>
      <p class="description">{{ $t('dresscode.description') }}</p>
      <div class="palette">
        <div v-for="(image, index) in images" 
             :key="index" 
             class="swatch-wrapper"
             :style="{ transitionDelay: `${index * 50}ms` }">
          <img :src="image" class="swatch" alt="Wedding color" />
        </div>
      </div>

      <div class="actions">
        <button class="btn-outline" @click="openGallery('women')">
          {{ $t('dresscode.women') }}
        </button>
        <button class="btn-outline" @click="openGallery('men')">
          {{ $t('dresscode.men') }}
        </button>
        <button class="mute-btn-inline" @click="toggleMute" :title="isMuted ? $t('dresscode.unmute') : $t('dresscode.mute')">
          <svg v-if="isMuted" viewBox="0 0 24 24" class="audio-svg"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="audio-svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </button>
      </div>
    </div>

    <ImageGallery 
      :images="currentGalleryImages" 
      :is-open="isGalleryOpen" 
      :is-muted="isMuted"
      @close="closeGallery" 
      @toggle-mute="toggleMute"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageGallery from './ImageGallery.vue'
import backgroundMusicMen from '@/assets/1050761114_1_tiktok_69f75785db7821_01365855.mp3'
import backgroundMusicWomen from '@/assets/-4884169657562792318 (audio-extractor.net).mp3'

// Color palette images
import img1 from '@/assets/dress-code/color/5332410083638811325.webp'
import img2 from '@/assets/dress-code/color/5332410083638811329.webp'
import img3 from '@/assets/dress-code/color/5332410083638811335.webp'
import img4 from '@/assets/dress-code/color/5332410083638811340.webp'
import img5 from '@/assets/dress-code/color/5332410083638811343.webp'
import img6 from '@/assets/dress-code/color/5332410083638811346.webp'
import img7 from '@/assets/dress-code/color/5332410083638811347.webp'
import img8 from '@/assets/dress-code/color/5332410083638811349.webp'
import img9 from '@/assets/dress-code/color/5332410083638811351.webp'

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

// Gallery images - using glob import if possible or manual
// Since I can't easily glob with Vite in this environment without seeing the setup, I'll list them or use a helper
const womenImages = Object.values(import.meta.glob('@/assets/dress-code/ledies/*.JPG', { eager: true, import: 'default' }))
const menImages = Object.values(import.meta.glob('@/assets/dress-code/men/*.JPG', { eager: true, import: 'default' }))

const isGalleryOpen = ref(false)
const galleryType = ref('women')
const isMuted = ref(false)
const audioMen = ref(null)
const audioWomen = ref(null)

onMounted(() => {
  audioMen.value = new Audio(backgroundMusicMen)
  audioMen.value.loop = true
  audioWomen.value = new Audio(backgroundMusicWomen)
  audioWomen.value.loop = true
})

const currentGalleryImages = computed(() => {
  return galleryType.value === 'women' ? womenImages : menImages
})

const toggleMute = () => {
  isMuted.value = !isMuted.value
  const currentAudio = galleryType.value === 'women' ? audioWomen.value : audioMen.value
  if (currentAudio) {
    currentAudio.muted = isMuted.value
  }
}

const openGallery = (type) => {
  galleryType.value = type
  isGalleryOpen.value = true
  
  const currentAudio = type === 'women' ? audioWomen.value : audioMen.value
  if (currentAudio) {
    currentAudio.currentTime = 0
    currentAudio.muted = isMuted.value
    currentAudio.play().catch(e => console.log('Audio play failed:', e))
  }
}

const closeGallery = () => {
  isGalleryOpen.value = false
  if (audioMen.value) {
    audioMen.value.pause()
    audioMen.value.currentTime = 0
  }
  if (audioWomen.value) {
    audioWomen.value.pause()
    audioWomen.value.currentTime = 0
  }
}
</script>

<style scoped>
.dress-code {
  padding: 4rem 1rem;
  background-color: var(--color-background);
  text-align: center;
  color: var(--color-text);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
}

.palette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.swatch-wrapper {
  transition: transform 0.3s ease;
}

.swatch-wrapper:hover {
  transform: translateY(-5px);
}

.swatch {
  width: 70px;
  height: 85px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.mute-btn-inline {
  background: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 0;
}

.mute-btn-inline:hover {
  background: var(--color-text);
  color: var(--color-background);
}

.audio-svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.btn-outline {
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.btn-outline:hover {
  background: var(--color-text);
  color: var(--color-background);
}

@media (max-width: 768px) {
  .palette {
    gap: 1.2rem;
  }
  
  .swatch {
    width: 60px;
    height: 75px;
  }
  
  .actions {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  
  .btn-outline {
    width: auto;
    flex: 1;
    max-width: 150px;
  }

  .mute-btn-inline {
    width: 45px;
    height: 45px;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .palette {
    gap: 0.8rem;
  }
  
  .swatch {
    width: 50px;
    height: 65px;
  }
}
</style>