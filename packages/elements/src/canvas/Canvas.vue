<script setup lang="ts">
import type { FlowEmits, FlowProps } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { VueFlow } from '@vue-flow/core'
import { useForwardPropsEmits } from 'reka-ui'
import { Controls } from '../controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const props = withDefaults(defineProps<FlowProps>(), {
  deleteKeyCode: () => ['Backspace', 'Delete'],
  fitViewOnInit: true,
  panOnDrag: false,
  panOnScroll: true,
  selectNodesOnDrag: true,
  zoomOnDoubleClick: false,
})

const emits = defineEmits<FlowEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <VueFlow data-slot="canvas" v-bind="forwarded">
    <Background />
    <Controls />
    <slot />
  </VueFlow>
</template>
