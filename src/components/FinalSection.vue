<template>
  <section class="final-section">
    <div class="container">
      <div class="content">
        <h3 class="title">Топ-1 мест, куда сходить этой осенью: <span class="main-text">наша свадьба!</span></h3>
        <p class="sub-text">Будем очень рады разделить этот день с вами!</p>
        <p class="signature">С любовью,<br>Александр и Маргарита</p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.final-section {
  padding: 6rem 1rem 0.5rem 1rem;
  background-color: var(--color-background);
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 0;
}

.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-text);
  margin: 0;
}

.main-text {
  font-family: 'Alex Brush', cursive;
  font-weight: 400;
  text-transform: none;
  font-size: 1.2em;
  color: #78866b;
  display: inline-block;
  padding: 0 5px;
  margin: 0;
}

.sub-text {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-top: 1rem;
  line-height: 1.6;
}

.signature {
  font-family: 'Alex Brush', cursive;
  font-size: 2.5rem;
  color: #78866b;
  margin-top: 3rem;
  margin-bottom: 0;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .final-section {
    padding: 4rem 1rem 0.5rem 1rem;
  }
  
  .signature {
    font-size: 2rem;
  }
}
</style>
