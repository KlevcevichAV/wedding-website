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

  // Данные бота (в идеале вынести в .env файл)
  const token = import.meta.env.VITE_TELEGRAM_TOKEN
  const chatId = import.meta.env.VITE_CHAT_ID

  // Формируем текст сообщения
  const message = `
🔔 **Новый ответ на приглашение!**
━━━━━━━━━━━━━━━━━━
👤 **Имя:** ${form.name}
📍 **Статус:** ${form.status === 'yes' ? '✅ Приду' : '❌ Не смогу'}
💬 **Комментарий:** ${form.dietaryNotes || 'Нет особых пожеланий'}
━━━━━━━━━━━━━━━━━━
  `

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown' // Чтобы текст был с жирным шрифтом
      })
    })

    if (response.ok) {
      alert('Спасибо! Ваш ответ успешно отправлен.')
      // Очистка формы после успеха
      form.name = ''
      form.dietaryNotes = ''
    }
  } catch (error) {
    console.error('Ошибка:', error)
    alert('Произошла ошибка при отправке. Попробуйте еще раз.')
  } finally {
    loading.value = false
  }
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