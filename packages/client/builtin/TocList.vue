<!--
TOC list
(used by Toc component, you don't need to use this component directly)

Usage:

<TocList :list="list"/>
-->
<script setup lang="ts">
import { computed } from 'vue'
import { toArray } from '@nyxb/utils'
import type { TocItem } from '@kolibry/types'
import Titles from '/@kolibry/titles.md'

const props = withDefaults(defineProps<{
  level: number
  start?: number
  listStyle?: string | string[]
  list: TocItem[]
  listClass?: string | string[]
}>(), { level: 1 })

const classes = computed(() => {
  return [
    ...toArray(props.listClass || []),
    'kolibry-toc-list',
    `kolibry-toc-list-level-${props.level}`,
  ]
})

const styles = computed(() => {
  return [
    ...toArray(props.listStyle || []),
  ]
})
</script>

<template>
  <ol
    v-if="list && list.length > 0"
    :class="classes"
    :start="level === 1 ? start : undefined"
    :style="styles.length >= level ? `list-style:${styles[level - 1]}` : undefined"
  >
    <li
      v-for="item of list"
      :key="item.path" class="kolibry-toc-item"
      :class="[{ 'kolibry-toc-item-active': item.active }, { 'kolibry-toc-item-parent-active': item.activeParent }]"
    >
      <Link :to="item.path">
        <Titles :no="item.path" />
      </Link>
      <TocList
        v-if="item.children.length > 0"
        :level="level + 1"
        :list-style="listStyle"
        :list="item.children"
        :list-class="listClass"
      />
    </li>
  </ol>
</template>

<style>
.kolibry-layout .kolibry-toc-item p {
  margin: 0;
}
.kolibry-layout .kolibry-toc-item div, .kolibry-layout .kolibry-toc-item div p {
  display: initial;
}
</style>
