<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const classes = computed(() => [
  'p-4',
  props.class,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
