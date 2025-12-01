<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from '@repo/elements/node'

defineProps<NodeProps>()
</script>

<template>
  <Node :handles="data?.handles">
    <NodeHeader>
      <NodeTitle>{{ data?.label }}</NodeTitle>
      <NodeDescription>{{ data?.description }}</NodeDescription>
    </NodeHeader>

    <NodeContent>
      <p class="text-sm">
        {{ data?.content }}
      </p>
    </NodeContent>

    <NodeFooter>
      <p class="text-muted-foreground text-xs">
        {{ data?.footer }}
      </p>
    </NodeFooter>
  </Node>
</template>
