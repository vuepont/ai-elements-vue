<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import Card from '@repo/shadcn-vue/components/ui/card/Card.vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Handle, Position } from '@vue-flow/core'
import { reactiveOmit } from '@vueuse/core'

interface NodeHandles {
  target?: boolean
  source?: boolean
}

interface NodeProps {
  class?: HTMLAttributes['class']
  handles?: NodeHandles
}

const props = defineProps<NodeProps>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Card
    v-bind="delegatedProps"
    :class="cn('node-container relative size-full h-auto w-sm gap-0 rounded-md p-0', props.class)"
  >
    <Handle v-if="props.handles?.target" :position="Position.Left" type="target" />
    <Handle v-if="props.handles?.source" :position="Position.Right" type="source" />
    <slot />
  </Card>
</template>
