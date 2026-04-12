<template>
  <section class="dress-code">
    <h2>Дресс-код</h2>
    <p>Будем признательны, если вы поддержите цветовую гамму нашей свадьбы:</p>
    <div class="palette">
      <img v-for="image in images"
           :key="image"
           class="swatch"
           :src="image"
           alt="Wedding color">
      </img>
    </div>
  </section>
</template>

<script setup>
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
</script>

<style scoped>
.dress-code { padding: 4rem 1rem; background-color: var(--color-background); text-align: center; color: var(--color-text); }
.palette { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
.swatch { width: 80px; height: 100px; object-fit: contain; }

@media (max-width: 600px) {
  .palette { gap: 0.5rem; justify-content: center; padding: 0 1rem; }
  .swatch { width: 60px; height: 75px; }
}
</style>