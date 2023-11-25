import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { RenderContext } from '@kolibri/types'
import type { KolibriContext } from './modules/context'

export const injectionClicks: InjectionKey<Ref<number>> = Symbol('v-click-clicks')
export const injectionClicksElements: InjectionKey<Ref<(Element | string)[]>> = Symbol('v-click-clicks-elements')
export const injectionClicksDisabled: InjectionKey<Ref<boolean>> = Symbol('v-click-clicks-disabled')
export const injectionOrderMap: InjectionKey<Ref<Map<number, HTMLElement[]>>> = Symbol('v-click-clicks-order-map')
export const injectionCurrentPage: InjectionKey<Ref<number>> = Symbol('kolibri-page')
export const injectionSlideScale: InjectionKey<ComputedRef<number>> = Symbol('kolibri-slide-scale')
export const injectionKolibriContext: InjectionKey<UnwrapNestedRefs<KolibriContext>> = Symbol('kolibri-kolibri-context')
export const injectionRoute: InjectionKey<RouteRecordRaw> = Symbol('kolibri-route')
export const injectionRenderContext: InjectionKey<Ref<RenderContext>> = Symbol('kolibri-render-context')
export const injectionActive: InjectionKey<Ref<boolean>> = Symbol('kolibri-active')
export const injectionFrontmatter: InjectionKey<Record<string, any>> = Symbol('kolibri-fontmatter')

export const CLASS_VCLICK_TARGET = 'kolibri-vclick-target'
export const CLASS_VCLICK_HIDDEN = 'kolibri-vclick-hidden'
export const CLASS_VCLICK_FADE = 'kolibri-vclick-fade'
export const CLASS_VCLICK_GONE = 'kolibri-vclick-gone'
export const CLASS_VCLICK_HIDDEN_EXP = 'kolibri-vclick-hidden-explicitly'
export const CLASS_VCLICK_CURRENT = 'kolibri-vclick-current'
export const CLASS_VCLICK_PRIOR = 'kolibri-vclick-prior'

export const TRUST_ORIGINS = [
  'localhost',
  '127.0.0.1',
]
