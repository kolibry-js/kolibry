import type { RouteRecordRaw } from 'vue-router'

export function getSlideClass(route?: RouteRecordRaw) {
  const no = route?.meta?.slide?.no
  if (no != null)
    return `kolibry-page-${no}`
  return ''
}
