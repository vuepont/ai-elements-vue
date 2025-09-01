<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const classes = computed(() => [
  'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
  props.class,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
