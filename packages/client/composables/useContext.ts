import type { ComputedRef, WritableComputedRef } from 'vue'
import { computed } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { KolibriContext } from '../modules/context'
import { configs } from '../env'
import { useNav } from './useNav'
import { useNavClicks } from './useNavClicks'

export function useContext(
  route: ComputedRef<RouteLocationNormalizedLoaded>,
  clicks: WritableComputedRef<number>,
): KolibriContext {
  const nav = useNav(route)
  const navClicks = useNavClicks(clicks, nav.currentRoute, nav.currentPage)
  return {
    nav: {
      ...nav,
      ...navClicks,
    },
    configs,
    themeConfigs: computed(() => configs.themeConfig),
  }
}
