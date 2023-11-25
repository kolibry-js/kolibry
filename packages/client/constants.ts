import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { RenderContext } from '@enigmaslidev/types'
import type { EnigmaSlidevContext } from './modules/context'

export const injectionClicks: InjectionKey<Ref<number>> = Symbol('v-click-clicks')
export const injectionClicksElements: InjectionKey<Ref<(Element | string)[]>> = Symbol('v-click-clicks-elements')
export const injectionClicksDisabled: InjectionKey<Ref<boolean>> = Symbol('v-click-clicks-disabled')
export const injectionOrderMap: InjectionKey<Ref<Map<number, HTMLElement[]>>> = Symbol('v-click-clicks-order-map')
export const injectionCurrentPage: InjectionKey<Ref<number>> = Symbol('enigmaslidev-page')
export const injectionSlideScale: InjectionKey<ComputedRef<number>> = Symbol('enigmaslidev-slide-scale')
export const injectionEnigmaSlidevContext: InjectionKey<UnwrapNestedRefs<EnigmaSlidevContext>> = Symbol('enigmaslidev-slidev-context')
export const injectionRoute: InjectionKey<RouteRecordRaw> = Symbol('enigmaslidev-route')
export const injectionRenderContext: InjectionKey<Ref<RenderContext>> = Symbol('slidev-render-context')
export const injectionActive: InjectionKey<Ref<boolean>> = Symbol('slidev-active')
export const injectionFrontmatter: InjectionKey<Record<string, any>> = Symbol('slidev-fontmatter')

export const CLASS_VCLICK_TARGET = 'enigmaslidev-vclick-target'
export const CLASS_VCLICK_HIDDEN = 'enigmaslidev-vclick-hidden'
export const CLASS_VCLICK_FADE = 'enigmaslidev-vclick-fade'
export const CLASS_VCLICK_GONE = 'enigmaslidev-vclick-gone'
export const CLASS_VCLICK_HIDDEN_EXP = 'enigmaslidev-vclick-hidden-explicitly'
export const CLASS_VCLICK_CURRENT = 'enigmaslidev-vclick-current'
export const CLASS_VCLICK_PRIOR = 'enigmaslidev-vclick-prior'

export const TRUST_ORIGINS = [
  'localhost',
  '127.0.0.1',
]
