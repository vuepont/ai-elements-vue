<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const classes = computed(() => [
  'max-w-[80%] flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm',
  'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
  'group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground',
  'is-user:dark',
  props.class,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
