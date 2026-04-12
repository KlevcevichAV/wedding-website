<template>
  <section class="dress-code">
    <h2>Дресс-код</h2>
    <p>Будем признательны, если вы поддержите цветовую гамму нашей свадьбы:</p>
    <div class="palette">
      <div v-for="color in colors"
           :key="color"
           class="swatch"
           :style="{ backgroundColor: color }">
      </div>
    </div>
  </section>
</template>

<script setup>
const colors = ['#E6D5C3', '#D4A373', '#FAEDCD', '#CCD5AE', '#E9EDC9']
</script>

<style scoped>
.dress-code { padding: 4rem 1rem; background-color: #f9f9f9; text-align: center; }
.palette { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
.swatch { width: 50px; height: 50px; border-radius: 50%; border: 1px solid #ddd; }
</style>