<script setup lang="ts">
import { inject } from 'vue'
import { injectionKolibriContext } from '../constants'

const $kolibri = inject(injectionKolibriContext)
</script>

<template>
  <span>{{ $kolibri.nav.total }}</span>
</template>
