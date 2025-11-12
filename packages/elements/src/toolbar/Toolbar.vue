<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { reactiveOmit } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    position?: Position
  }>(),
  {
    position: Position.Bottom,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <NodeToolbar
    data-slot="toolbar"
    v-bind="delegatedProps"
    :class="cn(
      'flex items-center gap-1 rounded-sm border bg-background p-1.5',
      props.class,
    )"
  >
    <slot />
  </NodeToolbar>
</template>
