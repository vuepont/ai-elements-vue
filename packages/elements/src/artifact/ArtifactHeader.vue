<script setup lang="ts">
import type { ArtifactHeaderProps } from './props'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<ArtifactHeaderProps>()

const classes = computed(() => cn(
  'flex items-center justify-between border-b bg-muted/50 px-4 py-3',
  props.class,
))
</script>

<template>
  <div
    :class="classes"
    v-bind="{
      ...props,
      class: classes,
    }"
  >
    <slot />
  </div>
</template>
