import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import setupMain from './setup/main'
import { router } from './routes'
import createDirectives from './modules/directives'
import createKolibriContext from './modules/context'

import '/@kolibrijs/styles'

const app = createApp(App)
app.use(router)
app.use(createHead())
app.use(createDirectives())
app.use(createKolibriContext())

setupMain({ app, router })

app.mount('#app')
