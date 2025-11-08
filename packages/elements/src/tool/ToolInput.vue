<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CodeBlock } from '../code-block'

const props = defineProps<{
  class?: HTMLAttributes['class']
  input: ToolUIPart['input']
}>()
</script>

<template>
  <div :class="cn('space-y-2 overflow-hidden p-4', props.class)" v-bind="$attrs">
    <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </h4>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="JSON.stringify(props.input, null, 2)" language="json" />
    </div>
  </div>
</template>
