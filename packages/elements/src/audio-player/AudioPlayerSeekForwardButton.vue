<script setup lang="ts">
import type { MediaSeekForwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

interface Props extends /* @vue-ignore */ MediaSeekForwardButton {}

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
      :seek-offset="props.seekOffset"
    />
  </Button>
</template>
