import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import i18n from './i18n'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(i18n).mount('#app')
