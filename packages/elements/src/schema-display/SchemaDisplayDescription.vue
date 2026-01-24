<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useSchemaDisplayContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { description } = useSchemaDisplayContext('SchemaDisplayDescription')
</script>

<template>
  <p
    :class="cn(
      'border-b px-4 py-3 text-muted-foreground text-sm',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>{{ description }}</slot>
  </p>
</template>
