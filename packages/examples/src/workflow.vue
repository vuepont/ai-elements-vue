<script setup lang="ts">
import type { EdgeTypesObject, NodeTypesObject } from '@vue-flow/core'
import { Canvas } from '@repo/elements/canvas'
import { Animated, Temporary } from '@repo/elements/edge'
import { nanoid } from 'nanoid'
import { markRaw, ref } from 'vue'
import CustomNode from './custom-node.vue'

const nodeIds = {
  start: nanoid(),
  process1: nanoid(),
  process2: nanoid(),
  decision: nanoid(),
  output1: nanoid(),
  output2: nanoid(),
}

const nodes = ref([
  {
    id: nodeIds.start,
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Start',
      description: 'Initialize workflow',
      content: 'test',
      footer: 'test',
      handles: { target: false, source: true },
    },
  },
  {
    id: nodeIds.process1,
    type: 'custom',
    position: { x: 500, y: 0 },
    data: {
      label: 'Process Data',
      description: 'Transform input',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: true },
    },
  },
  {
    id: nodeIds.decision,
    type: 'custom',
    position: { x: 1000, y: 0 },
    data: {
      label: 'Decision Point',
      description: 'Route based on conditions',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: true },
    },
  },
  {
    id: nodeIds.output1,
    type: 'custom',
    position: { x: 1500, y: -100 },
    data: {
      label: 'Success Path',
      description: 'Handle success case',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: true },
    },
  },
  {
    id: nodeIds.output2,
    type: 'custom',
    position: { x: 1500, y: 100 },
    data: {
      label: 'Error Path',
      description: 'Handle error case',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: true },
    },
  },
  {
    id: nodeIds.process2,
    type: 'custom',
    position: { x: 2000, y: 0 },
    data: {
      label: 'Complete',
      description: 'Finalize workflow',
      content: 'test',
      footer: 'test',
      handles: { target: true, source: false },
    },
  },
])

const edges = ref([
  {
    id: nanoid(),
    source: nodeIds.start,
    target: nodeIds.process1,
    type: 'animated',
  },
  {
    id: nanoid(),
    source: nodeIds.process1,
    target: nodeIds.decision,
    type: 'animated',
  },
  {
    id: nanoid(),
    source: nodeIds.decision,
    target: nodeIds.output1,
    type: 'animated',
  },
  {
    id: nanoid(),
    source: nodeIds.decision,
    target: nodeIds.output2,
    type: 'temporary',
  },
  {
    id: nanoid(),
    source: nodeIds.output1,
    target: nodeIds.process2,
    type: 'animated',
  },
  {
    id: nanoid(),
    source: nodeIds.output2,
    target: nodeIds.process2,
    type: 'temporary',
  },
])

const nodeTypes: NodeTypesObject = {
  custom: markRaw(CustomNode),
}

const edgeTypes: EdgeTypesObject = {
  animated: markRaw(Animated),
  temporary: markRaw(Temporary),
}
</script>

<template>
  <div style="height: 400px">
    <Canvas
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
    />
  </div>
</template>
