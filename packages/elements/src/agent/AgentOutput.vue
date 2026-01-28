<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CodeBlock } from '../code-block'

const props = defineProps<{
  schema: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('space-y-2', props.class)"
    v-bind="$attrs"
  >
    <span class="font-medium text-muted-foreground text-sm">
      Output Schema
    </span>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="props.schema" language="typescript" />
    </div>
  </div>
</template>
