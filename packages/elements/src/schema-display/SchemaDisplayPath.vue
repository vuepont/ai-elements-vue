<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useSchemaDisplayContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { path } = useSchemaDisplayContext('SchemaDisplayPath')

// Highlight path parameters
const highlightedPath = computed(() => path.replace(
  /\{([^}]+)\}/g,
  '<span class="text-blue-600 dark:text-blue-400">{$1}</span>',
))
</script>

<template>
  <span
    :class="cn('font-mono text-sm', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <span v-html="highlightedPath" />
    </slot>
  </span>
</template>
