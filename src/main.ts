import './assets/normalize.css'
import 'animate.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { useGlobalStore } from '@/stores/globalStore'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore()
    if (to.name !== 'home' && !globalStore.userData.authenticated) next({ name: 'home' })
    else next()
})

app.mount('#app')
