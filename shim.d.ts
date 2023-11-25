export {}
declare global {
  const __DEV__: boolean
  const __ENIGMASLIDEV_HASH_ROUTE__: boolean
  const __ENIGMASLIDEV_CLIENT_ROOT__: string
  const __ENIGMASLIDEV_FEATURE_DRAWINGS__: boolean
  const __ENIGMASLIDEV_FEATURE_DRAWINGS_PERSIST__: boolean
  const __ENIGMASLIDEV_FEATURE_EDITOR__: boolean
  const __ENIGMASLIDEV_FEATURE_RECORD__: boolean
  const __ENIGMASLIDEV_FEATURE_PRESENTER__: boolean
  const __ENIGMASLIDEV_HAS_SERVER__: boolean
}

declare module 'vue' {
  interface ComponentCustomProperties {
    __DEV__: boolean
    __ENIGMASLIDEV_HASH_ROUTE__: boolean
    __ENIGMASLIDEV_CLIENT_ROOT__: string
    __ENIGMASLIDEV_FEATURE_DRAWINGS__: boolean
    __ENIGMASLIDEV_FEATURE_DRAWINGS_PERSIST__: boolean
    __ENIGMASLIDEV_FEATURE_EDITOR__: boolean
    __ENIGMASLIDEV_FEATURE_RECORD__: boolean
    __ENIGMASLIDEV_FEATURE_PRESENTER__: boolean
    __ENIGMASLIDEV_HAS_SERVER__: boolean
  }
}
