<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { Canvas } from '@repo/elements/canvas'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const nodeIds = {
  start: nanoid(),
  process1: nanoid(),
}

const nodes = ref<Node[]>([
  {
    id: nodeIds.start,
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  },
  {
    id: nodeIds.process1,
    position: { x: 50, y: 250 },
    data: { label: 'Node 2' },
  },
])

const edges = ref<Edge[]>([
  {
    id: nanoid(),
    source: nodeIds.start,
    target: nodeIds.process1,
  },
])
</script>

<template>
  <div style="height: 400px">
    <Canvas :nodes="nodes" :edges="edges" />
  </div>
</template>
