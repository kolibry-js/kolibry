<script setup lang="ts">
import { inject } from 'vue'
import { injectionEnigmaSlidevContext } from '../constants'

const $enigmaslidev = inject(injectionEnigmaSlidevContext)
</script>

<template>
  <span>{{ $enigmaslidev.nav.total }}</span>
</template>
