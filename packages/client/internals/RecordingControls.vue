<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, watch } from 'vue'
import { recorder } from '../logic/recording'
import { currentCamera, showRecordingDialog } from '../state'
import DevicesList from './DevicesList.vue'
import MenuButton from './MenuButton.vue'
import HiddenText from './HiddenText.vue'

const {
  recording,
  showAvatar,
  streamCamera,
  stopRecording,
  toggleAvatar,
} = recorder

const previousAvatar = useLocalStorage('kolibri-webcam-show', false)
watch(showAvatar, () => {
  previousAvatar.value = showAvatar.value
})

function toggleRecording() {
  if (recording.value)
    stopRecording()
  else
    showRecordingDialog.value = true
}

onMounted(() => {
  if (previousAvatar.value && !showAvatar.value)
    toggleAvatar()
})
</script>

<template>
  <button
    v-if="currentCamera !== 'none'"
    class="kolibri-icon-btn <md:hidden"
    :class="{ 'text-green-500': Boolean(showAvatar && streamCamera) }"
    title="Show camera view"
    @click="toggleAvatar"
  >
    <HiddenText text="Toggle camera view" />
    <carbon:user-avatar />
  </button>

  <button
    class="kolibri-icon-btn"
    :class="{ 'text-red-500': recording }"
    title="Recording"
    @click="toggleRecording"
  >
    <HiddenText :text="recording ? 'Stop record video' : 'Record video'" />
    <carbon:stop-outline v-if="recording" />
    <carbon:video v-else />
  </button>
  <MenuButton :disabled="recording">
    <template #button>
      <button class="kolibri-icon-btn h-full !text-sm !px-0">
        <HiddenText text="Select recording device" />
        <carbon:chevron-up class="opacity-50" />
      </button>
    </template>
    <template #menu>
      <DevicesList />
    </template>
  </MenuButton>
</template>
