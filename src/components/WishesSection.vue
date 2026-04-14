<template>
  <section class="wishes">
    <div class="container">
      <h2 class="section-title">Пожелания</h2>
      <p class="description">Пожалуйста, не ломайте голову над выбором подарка! Наши вкусы настолько специфичны, что угодить нам могут только деньги!</p>
    </div>

  </section>
</template>

<script setup>

</script>

<style scoped>
.wishes {
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
</style>