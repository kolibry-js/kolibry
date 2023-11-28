import type { KolibryConfig } from '@kolibry/types'
import { computed } from 'vue'
import { objectMap } from '@nyxb/utils'

// @ts-expect-error missing types
import _configs from '/@kolibry/configs'

export const configs = _configs as KolibryConfig
export const slideAspect = configs.aspectRatio ?? (16 / 9)
export const slideWidth = configs.canvasWidth ?? 980
export const slideHeight = Math.round(slideWidth / slideAspect)

export const themeVars = computed(() => {
  return objectMap(configs.themeConfig || {}, (k, v) => [`--kolibry-theme-${k}`, v])
})
