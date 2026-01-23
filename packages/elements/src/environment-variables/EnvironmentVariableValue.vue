<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, inject } from 'vue'
import { EnvironmentVariableKey, EnvironmentVariablesKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const variableContext = inject(EnvironmentVariableKey)
const variablesContext = inject(EnvironmentVariablesKey)

if (!variableContext || !variablesContext) {
  throw new Error('EnvironmentVariableValue must be used within EnvironmentVariable and EnvironmentVariables')
}

const { value } = variableContext
const { showValues } = variablesContext

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
