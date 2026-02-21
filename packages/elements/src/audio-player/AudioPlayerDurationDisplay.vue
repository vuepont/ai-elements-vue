<script setup lang="ts">
import type { MediaDurationDisplay } from 'media-chrome'
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ MediaDurationDisplay {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-duration-display
      :class="cn('tabular-nums', props.class)"
      data-slot="audio-player-duration-display"
    />
  </ButtonGroupText>
</template>
