import type { RouteRecordRaw } from 'vue-router'

export function getSlideClass(route?: RouteRecordRaw, extra = '') {
  const classes = ['kolibri-page', extra]

  const no = route?.meta?.slide?.no
  if (no != null)
    classes.push(`kolibri-page-${no}`)

  return classes.filter(Boolean).join(' ')
}
