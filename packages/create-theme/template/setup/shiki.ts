import { defineShikiSetup } from '@kolibrijs/types'

export default defineShikiSetup(async () => {
  return {
    theme: {
      dark: 'lumos-dark',
      light: 'lumos-light',
    },
  }
})
