<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const attrs = useAttrs()

const classes = computed(() => [
  'w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm',
  props.class,
])
</script>

<template>
  <form :class="classes" v-bind="attrs">
    <slot />
  </form>
</template>
