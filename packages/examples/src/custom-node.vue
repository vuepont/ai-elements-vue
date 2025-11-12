<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from '@repo/elements/node'

const props = defineProps<NodeProps>()
</script>

<template>
  <Node :handles="props.data?.handles">
    <NodeHeader>
      <NodeTitle>{{ props.data?.label }}</NodeTitle>
      <NodeDescription>{{ props.data?.description }}</NodeDescription>
    </NodeHeader>

    <NodeContent>
      <p class="text-sm">
        {{ props.data?.content }}
      </p>
    </NodeContent>

    <NodeFooter>
      <p class="text-muted-foreground text-xs">
        {{ props.data?.footer }}
      </p>
    </NodeFooter>
  </Node>
</template>
