<script setup lang="ts">
import type { PanelPositionType } from '@vue-flow/core'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Panel as PanelPrimitive } from '@vue-flow/core'
import { reactiveOmit } from '@vueuse/core'

interface PanelProps {
  class?: HTMLAttributes['class']
  position?: PanelPositionType
}

const props = withDefaults(defineProps<PanelProps>(), {
  position: 'top-right',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <PanelPrimitive
    data-slot="panel"
    v-bind="delegatedProps"
    :class="cn('m-4 overflow-hidden rounded-md border bg-card p-1', props.class)"
  >
    <slot />
  </PanelPrimitive>
</template>
