import type { App } from 'vue'
import { computed, reactive } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import type { ComputedRef } from '@vue/reactivity'
import type { configs } from '../env'
import * as nav from '../logic/nav'
import { clicks, route } from '../logic/nav'
import { isDark } from '../logic/dark'
import { injectionClicks, injectionCurrentPage, injectionKolibryContext } from '../constants'
import { useContext } from '../composables/useContext'

export type KolibryContextNavKey = 'path' | 'total' | 'currentPage' | 'currentPath' | 'currentRoute' | 'currentSlideId' | 'currentLayout' | 'nextRoute' | 'rawTree' | 'treeWithActiveStatuses' | 'tree' | 'downloadPDF' | 'next' | 'nextSlide' | 'openInEditor' | 'prev' | 'prevSlide' | 'rawRoutes' | 'go'
export type KolibryContextNavClicksKey = 'clicks' | 'clicksElements' | 'clicksTotal' | 'hasNext' | 'hasPrev'

export interface KolibryContextNav extends Pick<typeof nav, KolibryContextNavKey> {
  route: ComputedRef<RouteRecordRaw | RouteLocationNormalizedLoaded>
}
export type KolibryContextNavClicks = Pick<typeof nav, KolibryContextNavClicksKey>

export interface KolibryContext {
  nav: KolibryContextNav & KolibryContextNavClicks
  configs: typeof configs
  themeConfigs: ComputedRef<typeof configs['themeConfig']>
}

export default function createKolibryContext() {
  return {
    install(app: App) {
      const context = reactive(useContext(route, clicks))
      app.provide(injectionKolibryContext, context)
      app.provide(injectionCurrentPage, computed(() => context.nav.currentPage))
      app.provide(injectionClicks, computed(() => context.nav.clicks))

      // allows controls from postMessages
      if (__DEV__) {
        // @ts-expect-error expose global
        window.__kolibry__ = context
        window.addEventListener('message', ({ data }) => {
          if (data && data.target === 'kolibry') {
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
