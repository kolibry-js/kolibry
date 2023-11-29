<script setup lang="ts">
import { inject } from 'vue'
import { injectionKolibryContext } from '../constants'

const $kolibry = inject(injectionKolibryContext)
</script>

<template>
  <span>{{ $kolibry.nav.total }}</span>
</template>
