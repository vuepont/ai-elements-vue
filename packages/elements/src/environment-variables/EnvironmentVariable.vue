<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide } from 'vue'
import { EnvironmentVariableKey } from './context'
import EnvironmentVariableName from './EnvironmentVariableName.vue'
import EnvironmentVariableValue from './EnvironmentVariableValue.vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  name: string
  value: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

provide(EnvironmentVariableKey, {
  name: props.name,
  value: props.value,
})
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between gap-4 px-4 py-3',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>
      <div class="flex items-center gap-2">
        <EnvironmentVariableName />
      </div>
      <EnvironmentVariableValue />
    </slot>
  </div>
</template>
