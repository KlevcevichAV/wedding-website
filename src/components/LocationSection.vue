<template>
  <section class="map-section">
    <h2 class="map-title">Место проведения</h2>

    <!-- Новый блок с локацией -->
    <div class="location-info">
      <p class="location-name">TARASOVO VILLAGE</p>
      <p class="location-address">(д. Тарасово, ул. Олимпийская, 3)</p>
    </div>

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
  </section>
</template>

<style scoped>
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
  margin-bottom: 25px;
  color: var(--color-heading);
}

/* Новый блок */
.location-info {
  text-align: center;
  margin-bottom: 25px;
}

.location-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-heading);
}

.location-address {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.8;
}

.map-card {
  width: 80%;
  max-width: 1000px;
  background-color: var(--color-background);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 8px solid var(--color-background);
}

@media (max-width: 768px) {
  .map-section {
    padding: 40px 0;
  }

  .map-card {
    border-radius: 10px;
  }

  .map-card iframe {
    height: 350px;
  }
}
</style>