<script setup lang="ts">
import type { ArtifactActionsProps } from './props'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<ArtifactActionsProps>()

const classes = computed(() => cn('flex items-center gap-1', props.class))
</script>

<template>
  <div
    v-bind="{
      ...props,
      class: classes,
    }"
  >
    <slot />
  </div>
</template>
