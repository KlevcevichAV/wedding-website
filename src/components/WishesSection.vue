<template>
  <section class="wishes">
    <div class="container">
      <h2 class="section-title">
        <span class="line-1">Смотря какой <span class="accent fabric">Fabric</span>,</span>
        <span class="line-2">смотря сколько <span class="accent details">Details</span></span>
      </h2>
      <p class="description">
        Пожалуйста, не ломайте голову над выбором подарка! Наши вкусы настолько специфичны, что угодить нам могут только
        деньги!
      </p>

      <p class="description">
        Из-за романтического путешествия мы не сможем в полной мере насладиться красотой и ароматом цветов, зато подаренная Вами бутылочка вина для домашней коллекции придется кстати после возвращения
      </p>
    </div>
  </section>
</template>

<script setup>
// Используем Vue 3
</script>

<style scoped>
.wishes {
  padding: 4rem 1rem;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem); /* Адаптивный размер шрифта */
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  text-align: left; /* Выравнивание по левому краю */
  line-height: 1.2;
}

/* Первая строка */
.line-1 {
  align-self: flex-start;
}

/* Вторая строка со смещением вправо */
.line-2 {
  padding-left: 20%; /* Смещение второй строки */
  margin-top: 0.5rem;
}

/* Общие стили для "гламурных" слов */
.accent {
  font-family: 'Alex Brush', cursive; /* Или другой рукописный шрифт, например 'Great Vibes' */
  font-weight: 400;
  text-transform: none;
  font-size: 1.2em;
  color: #78866b;
  display: inline-block;
  padding: 0 5px;
}

.fabric {
  /* Можно добавить специфичный стиль именно для Fabric */
}

.details {
  /* Можно добавить специфичный стиль именно для Details */
}

.description {
  text-align: center; /* Текст описания оставляем по центру */
  font-size: 1.1rem;
  margin-top: 3rem;
  line-height: 1.6;
  opacity: 0.9;
}
</style>