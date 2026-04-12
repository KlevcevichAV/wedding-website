<template>
  <section class="rsvp">
    <h2>Подтвердите ваше присутствие</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" type="text" placeholder="Ваше Имя и Фамилия" required>

      <select v-model="form.status">
        <option value="yes">Я приду</option>
        <option value="no">Не смогу быть</option>
      </select>

      <textarea v-model="form.dietaryNotes" placeholder="Особые пожелания по меню (аллергии и т.д.)"></textarea>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Отправка...' : 'Отправить' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import {ref, reactive} from 'vue'

const loading = ref(false)
const form = reactive({
  name: '',
  status: 'yes',
  dietaryNotes: ''
})

const submitForm = async () => {
  loading.value = true
  // Здесь будет логика отправки (например, на твой Java-бэкенд или в Telegram Bot)
  console.log('Данные формы:', form)

  setTimeout(() => {
    alert('Спасибо! Мы получили ваш ответ.')
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.rsvp {
  padding: 4rem 1rem;
  max-width: 500px;
  margin: 0 auto;
  color: var(--color-text);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, select, textarea {
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  background-color: var(--color-background-soft);
  color: var(--color-heading);
}

input::placeholder, textarea::placeholder {
  color: var(--color-text);
}

button {
  padding: 1rem;
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.5;
}
</style>