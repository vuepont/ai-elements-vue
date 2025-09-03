<script setup lang="ts">
import { SelectTrigger } from '@repo/shadcn-vue/components/ui/select'
import { computed, useAttrs } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()

const classes = computed(() => [
  'border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors',
  'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
  props.class,
])
</script>

<template>
  <SelectTrigger :class="classes" v-bind="attrs">
    <slot />
  </SelectTrigger>
</template>
