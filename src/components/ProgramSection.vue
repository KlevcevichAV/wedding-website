<template>
  <section class="program">
    <h2>Программа дня</h2>
    <div class="timeline">
      <div v-for="(item, index) in timeline" :key="index" class="event">
        <div class="time">{{ item.time }}</div>
        <div class="description">
          <h3>{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const timeline = [
  {time: '15:30', title: 'Welcome zone'},
  {time: '16:00', title: 'Церемония'},
  {time: '17:00', title: 'Начало банкета'},
  {time: '18:30', title: 'Праздничный торт'},
  {time: '17:00', title: 'Завершение свадьбы и начало счастливой жизни'}
]
</script>

<style scoped>
.program {
  padding: 4rem 2rem;
  text-align: center;
}

.timeline {
  max-width: 600px;
  margin: 0 auto;
  border-left: 2px solid #ccc;
  padding-left: 20px;
}

.event {
  margin-bottom: 2rem;
  text-align: left;
  position: relative;
}

.event::before {
  content: '';
  position: absolute;
  left: -27px;
  top: 5px;
  width: 12px;
  height: 12px;
  background: #E6D5C3;
  border-radius: 50%;
}

.time {
  font-weight: bold;
  color: #888;
}
</style>