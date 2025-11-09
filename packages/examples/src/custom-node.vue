<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from '@repo/elements/node'
import { Toolbar } from '@repo/elements/toolbar'
import { Button } from '@repo/shadcn-vue/components/ui/button'

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

    <Toolbar>
      <Button size="sm" variant="ghost">
        Edit
      </Button>
      <Button size="sm" variant="ghost">
        Delete
      </Button>
    </Toolbar>
  </Node>
</template>
