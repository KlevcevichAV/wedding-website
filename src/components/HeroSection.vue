<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Саша & Рита</h1>
      <p class="date">3 сентября 2026</p>
      <p class="subtitle">Мы женимся и будем рады видеть вас!</p>
    </div>
  </section>
</template>

<script setup>
// Логика компонента (например, таймер обратного отсчета) может быть здесь
</script>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url('@/assets/a9f2d2a21c8a09d1582ab3629fbd0423.jpg');
  background-size: cover;
  background-position: center;
}

.hero-content {
  background: rgba(255, 255, 255, 0.8);
  padding: 3rem;
  border-radius: 12px;
}

h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>