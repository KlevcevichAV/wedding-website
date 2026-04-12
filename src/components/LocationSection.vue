<template>
  <section class="map-section">
    <h2 class="map-title">Место проведения</h2>

    <div class="map-card">
      <iframe
          src="https://yandex.ru/map-widget/v1/?ll=27.379293%2C53.919293&z=16&pt=27.379293%2C53.919293%2Cpm2rdm~27.379293%2C53.919293%2Corg"
          width="100%"
          height="450"
          frameborder="0"
          allowfullscreen="true"
          style="position:relative;">
      </iframe>
    </div>

    <p class="map-caption">
      д. Тарасово, ул. Олимпийская, 3 (TARASOVO VILLAGE)
    </p>
  </section>
</template>

<style scoped>
/* Стили оставляем те же, они создают нужный дизайн */
.map-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-color: var(--color-background-soft);
}

.map-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  margin-bottom: 35px;
  color: var(--color-heading);
}

.map-card {
  width: 100%;
  max-width: 1000px;
  background-color: var(--color-background);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 8px solid var(--color-background);
}

.map-caption {
  margin-top: 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--color-text);
  font-style: italic;
  text-align: center;
}

@media (max-width: 768px) {
  .map-section {
    padding: 40px 0;
  }
  .map-card {
    border: none;
    border-radius: 0;
  }
  .map-card iframe {
    height: 350px;
  }
}
</style>