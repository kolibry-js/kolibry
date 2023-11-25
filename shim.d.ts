export {}
declare global {
  const __DEV__: boolean
  const __KOLIBRI_HASH_ROUTE__: boolean
  const __KOLIBRI_CLIENT_ROOT__: string
  const __KOLIBRI_FEATURE_DRAWINGS__: boolean
  const __KOLIBRI_FEATURE_DRAWINGS_PERSIST__: boolean
  const __KOLIBRI_FEATURE_EDITOR__: boolean
  const __KOLIBRI_FEATURE_RECORD__: boolean
  const __KOLIBRI_FEATURE_PRESENTER__: boolean
  const __KOLIBRI_HAS_SERVER__: boolean
}

declare module 'vue' {
  interface ComponentCustomProperties {
    __DEV__: boolean
    __KOLIBRI_HASH_ROUTE__: boolean
    __KOLIBRI_CLIENT_ROOT__: string
    __KOLIBRI_FEATURE_DRAWINGS__: boolean
    __KOLIBRI_FEATURE_DRAWINGS_PERSIST__: boolean
    __KOLIBRI_FEATURE_EDITOR__: boolean
    __KOLIBRI_FEATURE_RECORD__: boolean
    __KOLIBRI_FEATURE_PRESENTER__: boolean
    __KOLIBRI_HAS_SERVER__: boolean
  }
}
