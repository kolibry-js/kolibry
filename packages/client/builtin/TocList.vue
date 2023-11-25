<!--
TOC list
(used by Toc component, you don't need to use this component directly)

Usage:

<TocList :list="list"/>
-->
<script setup lang="ts">
import { computed } from 'vue'
import { toArray } from '@nyxb/utils'
import type { TocItem } from '@kolibrijs/types'
import Titles from '/@kolibrijs/titles.md'

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
    'kolibri-toc-list',
    `kolibri-toc-list-level-${props.level}`,
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
      :key="item.path" class="kolibri-toc-item"
      :class="[{ 'kolibri-toc-item-active': item.active }, { 'kolibri-toc-item-parent-active': item.activeParent }]"
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
.kolibri-layout .kolibri-toc-item p {
  margin: 0;
}
.kolibri-layout .kolibri-toc-item div, .kolibri-layout .kolibri-toc-item div p {
  display: initial;
}
</style>
