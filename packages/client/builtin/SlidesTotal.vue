<script setup lang="ts">
import { inject } from 'vue'
import { injectionKolibryiContext } from '../constants'

const $kolibry = inject(injectionKolibryiContext)
</script>

<template>
  <span>{{ $kolibry.nav.total }}</span>
</template>
