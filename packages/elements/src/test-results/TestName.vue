<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useTestContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { name } = useTestContext()
</script>

<template>
  <span
    v-if="name"
    :class="cn('flex-1', props.class)"
    v-bind="$attrs"
  >
    <slot>{{ name }}</slot>
  </span>
</template>
