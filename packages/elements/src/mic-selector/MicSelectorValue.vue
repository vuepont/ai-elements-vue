<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useMicSelector } from './context'
import MicSelectorLabel from './MicSelectorLabel.vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { devices, value } = useMicSelector('MicSelectorValue')

const currentDevice = computed(() => {
  return devices.value.find(d => d.deviceId === value.value)
})
</script>

<template>
  <span
    v-if="!currentDevice"
    :class="cn('flex-1 text-left', props.class)"
  >
    Select microphone...
  </span>
  <MicSelectorLabel
    v-else
    :class="cn('flex-1 text-left', props.class)"
    :device="currentDevice"
  />
</template>
