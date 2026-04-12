<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Саша & Рита</h1>
      <p class="date">4 сентября 2026</p>
      <p class="subtitle">Мы женимся и будем рады видеть вас!</p>
    </div>
  </section>
</template>

<script setup>

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

@media (max-width: 600px) {
  .hero-content {
    padding: 2rem 1rem;
    width: 90%;
  }

  h1 {
    font-size: 2.5rem;
  }
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