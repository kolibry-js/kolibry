<template>
  <div class="kolibri-layout end">
    <slot>END</slot>
  </div>
</template>

<style scoped lang="postcss">
.kolibri-layout.end {
  @apply text-white text-opacity-85 text-xl tracking-widest bg-black h-full text-center grid place-content-center select-none;
}
</style>
