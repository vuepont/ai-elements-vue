<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject } from 'vue'
import { EnvironmentVariableKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = inject(EnvironmentVariableKey)

if (!context) {
  throw new Error('EnvironmentVariableName must be used within EnvironmentVariable')
}

const { name } = context
</script>

<template>
  <span :class="cn('font-mono text-sm', props.class)" v-bind="$attrs">
    <slot>{{ name }}</slot>
  </span>
</template>
