<script setup lang="ts">
import type { MediaMuteButton } from 'media-chrome'
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ MediaMuteButton {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-mute-button
      :class="cn('', props.class)"
      data-slot="audio-player-mute-button"
    />
  </ButtonGroupText>
</template>
