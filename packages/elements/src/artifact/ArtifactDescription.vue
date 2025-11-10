<script setup lang="ts">
import type { ArtifactDescriptionProps } from './props'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<ArtifactDescriptionProps>()

const classes = computed(() => cn('text-muted-foreground text-sm', props.class))
</script>

<template>
  <p
    v-bind="{
      ...props,
      class: classes,
    }"
  >
    <slot />
  </p>
</template>
