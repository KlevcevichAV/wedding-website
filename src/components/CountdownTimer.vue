<template>
  <section class="timer-section">
    <h3 class="timer-title">До торжества осталось:</h3>

    <div v-if="!isExpired" class="timer-container">
      <div class="timer-item">
        <span class="value">{{ timeLeft.days }}</span>
        <span class="label">дней</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ timeLeft.hours }}</span>
        <span class="label">часов</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ timeLeft.minutes }}</span>
        <span class="label">минут</span>
      </div>
      <div class="timer-item">
        <span class="value">{{ timeLeft.seconds }}</span>
        <span class="label">секунд</span>
      </div>
    </div>

    <div v-else class="expired-msg">
      <h2>Этот счастливый день настал!</h2>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

const targetDate = new Date('2026-09-03T15:00:00').getTime()

const isExpired = ref(false)
const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let timerInterval = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  // Если дата прошла
  if (distance < 0) {
    isExpired.value = true
    clearInterval(timerInterval)
    return
  }

  // Математика перевода миллисекунд в единицы времени
  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  }
}

// Жизненный цикл: запускаем при монтировании, чистим при уничтожении
onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.timer-section {
  text-align: center;
  padding: 4rem 1rem;
  background-color: #ffffff;
}

.timer-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #4a4a4a;
}

.timer-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.timer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.value {
  font-size: 3rem;
  font-weight: 300;
  color: #333;
  line-height: 1;
}

.label {
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #999;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

/* Адаптив для мобилок */
@media (max-width: 600px) {
  .timer-container {
    gap: 1rem;
  }

  .value {
    font-size: 2rem;
  }

  .timer-item {
    min-width: 60px;
  }
}
</style>