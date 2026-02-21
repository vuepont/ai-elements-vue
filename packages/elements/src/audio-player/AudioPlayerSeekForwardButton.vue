<script setup lang="ts">
import type { MediaSeekForwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

type Props = /* @vue-ignore */ Partial<Omit<MediaSeekForwardButton, 'seekOffset'>> & {
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
    <media-seek-forward-button
      data-slot="audio-player-seek-forward-button"
      :seekoffset="props.seekOffset"
    />
  </Button>
</template>
