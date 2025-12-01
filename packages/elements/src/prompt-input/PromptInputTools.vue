<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const attrs = useAttrs()

const classes = computed(() => [
  'flex items-center gap-1',
  '[&_button:first-child]:rounded-bl-xl',
  props.class,
])
</script>

<template>
  <div :class="classes" v-bind="attrs">
    <slot />
  </div>
</template>
