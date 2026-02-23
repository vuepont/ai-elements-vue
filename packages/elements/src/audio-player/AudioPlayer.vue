<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import 'media-chrome'

interface Props {
  class?: HTMLAttributes['class']
  style?: HTMLAttributes['style']
}

const props = defineProps<Props>()
</script>

<template>
  <media-controller
    audio
    data-slot="audio-player"
    :class="props.class"
    :style="[
      {
        '--media-background-color': 'transparent',
        '--media-button-icon-height': '1rem',
        '--media-button-icon-width': '1rem',
        '--media-control-background': 'transparent',
        '--media-control-hover-background': 'hsl(var(--accent))',
        '--media-control-padding': '0',
        '--media-font': 'var(--font-sans)',
        '--media-font-size': '10px',
        '--media-icon-color': 'currentColor',
        '--media-preview-time-background': 'hsl(var(--background))',
        '--media-preview-time-border-radius': 'var(--radius-md)',
        '--media-preview-time-text-shadow': 'none',
        '--media-primary-color': 'hsl(var(--primary))',
        '--media-range-bar-color': 'hsl(var(--primary))',
        '--media-range-track-background': 'hsl(var(--secondary))',
        '--media-secondary-color': 'hsl(var(--secondary))',
        '--media-text-color': 'hsl(var(--foreground))',
        '--media-tooltip-arrow-display': 'none',
        '--media-tooltip-background': 'hsl(var(--background))',
        '--media-tooltip-border-radius': 'var(--radius-md)',
      },
      props.style,
    ]"
  >
    <slot />
  </media-controller>
</template>
