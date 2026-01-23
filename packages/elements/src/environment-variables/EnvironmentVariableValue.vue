<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useEnvironmentVariableContext, useEnvironmentVariablesContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { value } = useEnvironmentVariableContext()
const { showValues } = useEnvironmentVariablesContext()

const displayValue = computed(() => {
  return showValues.value
    ? value
    : '•'.repeat(Math.min(value.length, 20))
})
</script>

<template>
  <span
    :class="
      cn(
        'font-mono text-muted-foreground text-sm',
        !showValues && 'select-none',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>{{ displayValue }}</slot>
  </span>
</template>
