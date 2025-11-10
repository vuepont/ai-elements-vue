<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
const attrs = useAttrs()

const classes = computed(() => cn('text-muted-foreground text-sm', props.class))
</script>

<template>
  <p
    :class="classes"
    v-bind="attrs"
  >
    <slot />
  </p>
</template>
