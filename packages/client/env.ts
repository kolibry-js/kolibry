import type { KolibriConfig } from '@kolibrijs/types'
import type { UnwrapNestedRefs } from 'vue'
import { computed } from 'vue'
import { objectMap } from '@nyxb/utils'

// @ts-expect-error missing types
import _configs from '/@kolibrijs/configs'
import type { KolibriContext } from './modules/context'

export const configs = _configs as KolibriConfig
export const slideAspect = configs.aspectRatio ?? (16 / 9)
export const slideWidth = configs.canvasWidth ?? 980
// To honor the aspect ratio more as possible, we need to approximate the height to the next integer.
// Doing this, we will prevent on print, to create an additional empty white page after each page.
export const slideHeight = Math.ceil(slideWidth / slideAspect)

export const themeVars = computed(() => {
  return objectMap(configs.themeConfig || {}, (k, v) => [`--kolibri-theme-${k}`, v])
})

declare module 'vue' {
  interface ComponentCustomProperties {
    $kolibri: UnwrapNestedRefs<KolibriContext>
  }
}
