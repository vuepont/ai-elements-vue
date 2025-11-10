<script setup lang="ts">
import type { ArtifactTitleProps } from './props'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<ArtifactTitleProps>()

const classes = computed(() => cn('font-medium text-foreground text-sm', props.class))
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
