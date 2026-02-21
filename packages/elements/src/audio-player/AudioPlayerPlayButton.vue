<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-play-button
      :class="cn('bg-transparent', props.class)"
      data-slot="audio-player-play-button"
    />
  </Button>
</template>
