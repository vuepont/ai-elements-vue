<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
const attrs = useAttrs()

const classes = computed(() => cn('flex-1 overflow-auto p-4', props.class))
</script>

<template>
  <div
    :class="classes"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>
