<script setup lang="ts">
import type { MediaSeekForwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

interface Props extends /* @vue-ignore */ Partial<MediaSeekForwardButton> {
  seekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  seekOffset: 20,
})
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-seek-forward-button
      data-slot="audio-player-seek-forward-button"
      :seekoffset="props.seekOffset"
    />
  </Button>
</template>
