<script setup lang="ts">
import type { ArtifactProps } from './props'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<ArtifactProps>()

const classes = computed(() => cn(
  'flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm',
  props.class,
))
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
