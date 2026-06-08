<template>
  <section class="rsvp">
    <div class="container">
      <h2 class="section-title">{{ $t('rsvp.title') }}</h2>
      <p class="description">
        {{ $t('rsvp.description') }}
      </p>

      <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submitForm" class="rsvp-form">
        <!-- Attendance Question -->
        <div class="form-section">
          <p class="question-text">{{ $t('rsvp.questions.attendance') }}</p>
          <v-radio-group
            v-model="form.status"
            :rules="[rules.required]"
            required
            class="mt-2"
            @update:model-value="onStatusChange"
          >
            <v-radio :label="$t('rsvp.options.yes')" value="yes"></v-radio>
            <v-radio :label="$t('rsvp.options.no')" value="no"></v-radio>
          </v-radio-group>
        </div>

        <!-- Declining Guest Name -->
        <div v-if="form.status === 'no'" class="form-section">
          <p class="question-text">{{ $t('rsvp.questions.introduce') }}</p>
          <v-text-field
            v-model="form.declinerName"
            :label="$t('rsvp.placeholders.name')"
            :rules="[rules.required]"
            variant="outlined"
            density="comfortable"
            class="mt-2"
          ></v-text-field>
        </div>

        <template v-if="form.status === 'yes'">
          <!-- Guests Section -->
          <div class="form-section">
            <p class="question-text">{{ $t('rsvp.questions.who') }}</p>
            <p class="sub-description">{{ $t('rsvp.questions.whoSub') }}</p>
            
            <div v-for="(guest, index) in form.guests" :key="index" class="guest-input-wrapper">
              <v-text-field
                v-model="form.guests[index]"
                :label="index === 0 ? $t('rsvp.placeholders.name') : $t('rsvp.placeholders.guestName', { n: index + 1 })"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                class="mb-2"
              ></v-text-field>
              <v-btn
                v-if="form.guests.length > 1"
                icon="mdi-delete-outline"
                variant="text"
                color="error"
                @click="removeGuest(index)"
                class="remove-guest-btn"
              ></v-btn>
            </div>
            
            <v-btn
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="addGuest"
              class="mt-2"
            >
              {{ $t('rsvp.buttons.addGuest') }}
            </v-btn>
          </div>

          <!-- Alcohol Preferences -->
          <div class="form-section">
            <p class="question-text">{{ $t('rsvp.questions.alcohol') }}</p>
            <v-select
              v-model="form.alcohol"
              :items="alcoholOptions"
              :label="$t('rsvp.placeholders.selectAlcohol')"
              multiple
              chips
              :rules="[rules.requiredSelection]"
              variant="outlined"
              density="comfortable"
              class="mt-2"
            ></v-select>
            
            <v-text-field
              v-if="form.alcohol.includes($t('rsvp.alcohol.other'))"
              v-model="form.alcoholCustom"
              :label="$t('rsvp.placeholders.alcoholCustom')"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mt-2"
            ></v-text-field>
          </div>

          <!-- Favorite Song -->
          <div class="form-section">
            <p class="question-text">{{ $t('rsvp.questions.song') }}</p>
            <v-text-field
              v-model="form.favoriteSong"
              :label="$t('rsvp.placeholders.track')"
              variant="outlined"
              density="comfortable"
              class="mt-2"
            ></v-text-field>
          </div>

          <!-- Fun Fact -->
          <div class="form-section">
            <p class="question-text">{{ $t('rsvp.questions.funFact') }}</p>
            <v-textarea
              v-model="form.funFact"
              :label="$t('rsvp.placeholders.optional')"
              variant="outlined"
              auto-grow
              rows="2"
              class="mt-2"
            ></v-textarea>
          </div>

          <!-- Wishes / Notes -->
          <div class="form-section">
            <p class="question-text">{{ $t('rsvp.questions.wishes') }}</p>
            <v-textarea
              v-model="form.wishes"
              :label="$t('rsvp.placeholders.message')"
              variant="outlined"
              auto-grow
              rows="3"
              class="mt-2"
            ></v-textarea>
          </div>
        </template>

        <!-- Submit Button -->
        <div class="form-actions mt-6">
          <v-btn
            type="submit"
            color="var(--color-primary)"
            size="large"
            block
            :loading="loading"
            :disabled="!isFormValid || loading"
            class="submit-btn"
          >
            {{ form.status === 'no' ? $t('rsvp.buttons.submitNo') : $t('rsvp.buttons.submitYes') }}
          </v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formRef = ref(null)
const isFormValid = ref(false)
const loading = ref(false)

const alcoholOptions = computed(() => [
  t('rsvp.alcohol.wine'),
  t('rsvp.alcohol.champagne'),
  t('rsvp.alcohol.vodka'),
  t('rsvp.alcohol.whiskey'),
  t('rsvp.alcohol.beer'),
  t('rsvp.alcohol.other')
])

const form = reactive({
  status: 'yes',
  guests: [''],
  declinerName: '',
  favoriteSong: '',
  wishes: '',
  alcohol: [],
  alcoholCustom: '',
  funFact: ''
})

const rules = {
  required: v => !!v || t('rsvp.rules.required'),
  requiredSelection: v => (v && v.length > 0) || t('rsvp.rules.requiredSelection')
}

const onStatusChange = () => {
  if (form.status === 'no') {
    form.guests = ['']
  } else {
    form.declinerName = ''
  }
}

const addGuest = () => {
  form.guests.push('')
}

const removeGuest = (index) => {
  form.guests.splice(index, 1)
}

const submitForm = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true

  const token = import.meta.env.VITE_TELEGRAM_TOKEN
  const chatId = import.meta.env.VITE_CHAT_ID

  let message = `🔔 **${t('rsvp.notification.title')}**\n`
  message += `━━━━━━━━━━━━━━━━━━\n`
  
  if (form.status === 'no') {
    message += `📍 **${t('rsvp.notification.status')}:** ❌ ${t('rsvp.options.no')}\n`
    message += `👤 **${t('rsvp.notification.from')}:** ${form.declinerName || t('rsvp.notification.unknown')}\n`
  } else {
    message += `📍 **${t('rsvp.notification.status')}:** ✅ ${t('rsvp.options.yes')}\n`
    message += `👥 **${t('rsvp.notification.guests')}:**\n${form.guests.filter(g => g).map(g => `  • ${g}`).join('\n')}\n`
    
    const alcoholList = form.alcohol.map(item => {
      if (item === t('rsvp.alcohol.other') && form.alcoholCustom) {
        return `${t('rsvp.alcohol.other')} (${form.alcoholCustom})`
      }
      return item
    })
    message += `🍷 **${t('rsvp.notification.alcohol')}:** ${alcoholList.join(', ')}\n`
    
    if (form.favoriteSong) {
      message += `🎵 **${t('rsvp.notification.song')}:** ${form.favoriteSong}\n`
    }
    
    if (form.funFact) {
      message += `✨ **${t('rsvp.notification.funFact')}:** ${form.funFact}\n`
    }
    
    if (form.wishes) {
      message += `💬 **${t('rsvp.notification.wishes')}:** ${form.wishes}\n`
    }
  }
  
  message += `━━━━━━━━━━━━━━━━━━`

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })

    if (response.ok) {
      alert('Спасибо! Ваш ответ успешно отправлен.')
      resetForm()
    } else {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.status = 'yes'
  form.guests = ['']
  form.declinerName = ''
  form.favoriteSong = ''
  form.wishes = ''
  form.alcohol = []
  form.alcoholCustom = ''
  form.funFact = ''
  if (formRef.value) {
    formRef.value.resetValidation()
  }
}
</script>

<style scoped>
.rsvp {
  padding: 4rem 1rem;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
}

.form-section {
  margin-bottom: 2rem;
}

.question-text {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.sub-description {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.guest-input-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.remove-guest-btn {
  margin-top: 4px;
}

.submit-btn {
  color: white !important;
  font-weight: 600;
  letter-spacing: 1px;
}

:deep(.v-label) {
  color: var(--color-text) !important;
}

:deep(.v-field__outline) {
  color: var(--color-border) !important;
}

:deep(.v-field--focused .v-field__outline) {
  color: var(--color-primary) !important;
}

@media (max-width: 600px) {
  .section-title {
    font-size: 2rem;
  }
  
  .rsvp {
    padding: 3rem 1rem;
  }
}
</style>