import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { RenderContext } from '@kolibry/types'
import type { KolibryContext } from './modules/context'

export const injectionClicks: InjectionKey<Ref<number>> = Symbol('v-click-clicks')
export const injectionClicksElements: InjectionKey<Ref<(Element | string)[]>> = Symbol('v-click-clicks-elements')
export const injectionOrderMap: InjectionKey<Ref<Map<number, HTMLElement[]>>> = Symbol('v-click-clicks-order-map')
export const injectionClicksDisabled: InjectionKey<Ref<boolean>> = Symbol('v-click-clicks-disabled')
export const injectionSlideScale: InjectionKey<ComputedRef<number>> = Symbol('kolibry-slide-scale')
export const injectionKolibryContext: InjectionKey<KolibryContext> = Symbol('kolibry-kolibry-context')
export const injectionRoute: InjectionKey<RouteRecordRaw> = Symbol('kolibry-route')
export const injectionSlideContext: InjectionKey<RenderContext> = Symbol('kolibry-slide-context')

export const CLASS_VCLICK_TARGET = 'kolibry-vclick-target'
export const CLASS_VCLICK_HIDDEN = 'kolibry-vclick-hidden'
export const CLASS_VCLICK_FADE = 'kolibry-vclick-fade'
export const CLASS_VCLICK_GONE = 'kolibry-vclick-gone'
export const CLASS_VCLICK_HIDDEN_EXP = 'kolibry-vclick-hidden-explicitly'
export const CLASS_VCLICK_CURRENT = 'kolibry-vclick-current'
export const CLASS_VCLICK_PRIOR = 'kolibry-vclick-prior'
