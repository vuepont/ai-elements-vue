<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const classes = computed(() => cn('font-medium text-foreground text-sm', props.class))
const attrs = useAttrs()
</script>

<template>
  <p
    v-bind="attrs"
    :class="classes"
  >
    <slot />
  </p>
</template>
