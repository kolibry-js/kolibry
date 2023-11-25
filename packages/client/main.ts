import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import setupMain from './setup/main'
import { router } from './routes'
import createDirectives from './modules/directives'
import createEnigmaSlidevContext from './modules/context'

import '/@enigmaslidev/styles'

const app = createApp(App)
app.use(router)
app.use(createHead())
app.use(createDirectives())
app.use(createEnigmaSlidevContext())

setupMain({ app, router })

app.mount('#app')
