import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

// import { worker } from './mocks/browser'

// if (import.meta.env.MODE === 'development') {
//   worker.start()
// }

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
