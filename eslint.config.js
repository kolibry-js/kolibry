import nyxb from '@nyxb/eslint-config'

export default nyxb(
  {
    overrides: {
      vue: {
        'vue/no-v-text-v-html-on-component': 'off',
        'vue/component-name-in-template-casing': 'off',
      },
    },
  },
)
