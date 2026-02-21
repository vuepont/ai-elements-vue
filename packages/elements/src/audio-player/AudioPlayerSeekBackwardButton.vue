<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'

interface Props {
  seekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  seekOffset: 10,
})
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-seek-backward-button
      data-slot="audio-player-seek-backward-button"
      :seek-offset="props.seekOffset"
    />
  </Button>
</template>
