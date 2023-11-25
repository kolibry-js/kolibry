import type { App } from 'vue'
import { computed, reactive } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import type { ComputedRef } from '@vue/reactivity'
import type { configs } from '../env'
import * as nav from '../logic/nav'
import { clicks, route } from '../logic/nav'
import { isDark } from '../logic/dark'
import { injectionClicks, injectionCurrentPage, injectionEnigmaSlidevContext } from '../constants'
import { useContext } from '../composables/useContext'

export type EnigmaSlidevContextNavKey = 'path' | 'total' | 'currentPage' | 'currentPath' | 'currentRoute' | 'currentSlideId' | 'currentLayout' | 'nextRoute' | 'rawTree' | 'treeWithActiveStatuses' | 'tree' | 'downloadPDF' | 'next' | 'nextSlide' | 'openInEditor' | 'prev' | 'prevSlide' | 'rawRoutes' | 'go'
export type EnigmaSlidevContextNavClicksKey = 'clicks' | 'clicksElements' | 'clicksTotal' | 'hasNext' | 'hasPrev'

export interface EnigmaSlidevContextNav extends Pick<typeof nav, EnigmaSlidevContextNavKey> {
  route: ComputedRef<RouteRecordRaw | RouteLocationNormalizedLoaded>
}
export type EnigmaSlidevContextNavClicks = Pick<typeof nav, EnigmaSlidevContextNavClicksKey>

export interface EnigmaSlidevContext {
  nav: EnigmaSlidevContextNav & EnigmaSlidevContextNavClicks
  configs: typeof configs
  themeConfigs: ComputedRef<typeof configs['themeConfig']>
}

export default function createEnigmaSlidevContext() {
  return {
    install(app: App) {
      const context = reactive(useContext(route, clicks))
      app.provide(injectionEnigmaSlidevContext, context)
      app.provide(injectionCurrentPage, computed(() => context.nav.currentPage))
      app.provide(injectionClicks, computed(() => context.nav.clicks))

      // allows controls from postMessages
      if (__DEV__) {
        // @ts-expect-error expose global
        window.__enigmaslidev__ = context
        window.addEventListener('message', ({ data }) => {
          if (data && data.target === 'enigmaslidev') {
            if (data.type === 'navigate') {
              nav.go(+data.no, +data.clicks || 0)
            }
            else if (data.type === 'css-vars') {
              const root = document.documentElement
              for (const [key, value] of Object.entries(data.vars || {}))
                root.style.setProperty(key, value as any)
            }
            else if (data.type === 'color-schema') {
              isDark.value = data.color === 'dark'
            }
          }
        })
      }
    },
  }
}
