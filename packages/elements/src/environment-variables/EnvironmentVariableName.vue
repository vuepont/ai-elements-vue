<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useEnvironmentVariableContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { name } = useEnvironmentVariableContext()
</script>

<template>
  <span :class="cn('font-mono text-sm', props.class)" v-bind="$attrs">
    <slot>{{ name }}</slot>
  </span>
</template>
