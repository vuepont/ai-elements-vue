<script setup lang="ts">
import { ButtonGroup } from '@repo/shadcn-vue/components/ui/button-group'

interface Props {
  // Add any media-chrome control bar props if needed
}

defineProps<Props>()
</script>

<template>
  <media-control-bar data-slot="audio-player-control-bar">
    <ButtonGroup orientation="horizontal">
      <slot />
    </ButtonGroup>
  </media-control-bar>
</template>
