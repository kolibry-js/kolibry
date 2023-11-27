export {}
declare global {
  const __DEV__: boolean
  const __KOLIBRY_HASH_ROUTE__: boolean
  const __KOLIBRY_CLIENT_ROOT__: string
  const __KOLIBRY_FEATURE_DRAWINGS__: boolean
  const __KOLIBRY_FEATURE_DRAWINGS_PERSIST__: boolean
  const __KOLIBRY_FEATURE_EDITOR__: boolean
  const __KOLIBRY_FEATURE_RECORD__: boolean
  const __KOLIBRY_FEATURE_PRESENTER__: boolean
  const __KOLIBRY_HAS_SERVER__: boolean
}

declare module 'vue' {
  interface ComponentCustomProperties {
    __DEV__: boolean
    __KOLIBRY_HASH_ROUTE__: boolean
    __KOLIBRY_CLIENT_ROOT__: string
    __KOLIBRY_FEATURE_DRAWINGS__: boolean
    __KOLIBRY_FEATURE_DRAWINGS_PERSIST__: boolean
    __KOLIBRY_FEATURE_EDITOR__: boolean
    __KOLIBRY_FEATURE_RECORD__: boolean
    __KOLIBRY_FEATURE_PRESENTER__: boolean
    __KOLIBRY_HAS_SERVER__: boolean
  }
}
