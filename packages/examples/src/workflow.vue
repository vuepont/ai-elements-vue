<script setup lang="ts">
import type { Edge, Node, NodeTypesObject } from '@vue-flow/core'
import { Canvas } from '@repo/elements/canvas'
import { Connection } from '@repo/elements/connection'
import { Controls } from '@repo/elements/controls'
import { Panel } from '@repo/elements/panel'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { nanoid } from 'nanoid'
import { markRaw, ref } from 'vue'
import CustomNode from './custom-node.vue'

const nodeIds = {
  start: nanoid(),
  process1: nanoid(),
}

const nodes = ref<Node[]>([
  {
    id: nodeIds.start,
    type: 'custom',
    position: { x: 80, y: 80 },
    data: {
      label: 'start',
      description: 'test',
      content: 'test',
      footer: 'test',
      handles: { target: false, source: true },
    },
  },
  {
    id: nodeIds.process1,
    type: 'custom',
    position: { x: 320, y: 260 },
    data: {
      label: 'process1',
      description: 'test',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: true },
    },
  },
])

const edges = ref<Edge[]>([
  {
    id: nanoid(),
    source: nodeIds.start,
    target: nodeIds.process1,
  },
])

const nodeTypes: NodeTypesObject = {
  custom: markRaw(CustomNode),
}
</script>

<template>
  <div style="height: 400px">
    <Canvas :nodes="nodes" :edges="edges" :node-types="nodeTypes">
      <template #connection-line="connectionLineProps">
        <Connection v-bind="connectionLineProps" />
      </template>

      <Controls />
      <Panel position="top-right">
        <Button size="sm" variant="secondary">
          Export
        </Button>
      </Panel>
    </Canvas>
  </div>
</template>
