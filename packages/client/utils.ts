import type { RouteRecordRaw } from 'vue-router'

export function getSlideClass(route?: RouteRecordRaw, extra = '') {
  const classes = ['kolibry-page', extra]

  const no = route?.meta?.slide?.no
  if (no != null)
    classes.push(`kolibry-page-${no}`)

  return classes.filter(Boolean).join(' ')
}
