<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<Props>()

const deviceIdRegex = /\(([\da-f]{4}:[\da-f]{4})\)$/i

interface Props {
  device: MediaDeviceInfo
  class?: HTMLAttributes['class']
}

const parsedLabel = computed(() => {
  const matches = props.device.label.match(deviceIdRegex)

  if (!matches) {
    return { name: props.device.label, deviceId: null }
  }

  const [, deviceId] = matches
  const name = props.device.label.replace(deviceIdRegex, '')
  return { name, deviceId }
})
</script>

<template>
  <span :class="cn(props.class)">
    <span>{{ parsedLabel.name }}</span>
    <span v-if="parsedLabel.deviceId" class="text-muted-foreground"> ({{ parsedLabel.deviceId }})</span>
  </span>
</template>
