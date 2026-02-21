<script setup lang="ts">
import type { MediaSeekBackwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

type Props = /* @vue-ignore */ Partial<Omit<MediaSeekBackwardButton, 'seekOffset'>> & {
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
      :seekoffset="props.seekOffset"
    />
  </Button>
</template>
