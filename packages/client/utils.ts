import type { RouteRecordRaw } from 'vue-router'

export function getSlideClass(route?: RouteRecordRaw, extra = '') {
  const classes = ['enigmaslidev-page', extra]

  const no = route?.meta?.slide?.no
  if (no != null)
    classes.push(`enigmaslidev-page-${no}`)

  return classes.filter(Boolean).join(' ')
}
