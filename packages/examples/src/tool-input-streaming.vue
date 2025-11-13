<script setup lang="ts">
import { Tool, ToolContent, ToolHeader, ToolInput } from '@repo/elements/tool'
import { nanoid } from 'nanoid'

const toolCall = {
  type: 'tool-web_search' as const,
  toolCallId: nanoid(),
  state: 'input-streaming' as const,
  input: {
    query: 'latest AI market trends 2024',
    max_results: 10,
    include_snippets: true,
  },
  output: undefined,
  errorText: undefined,
}
</script>

<template>
  <div style="height: 500px">
    <Tool>
      <ToolHeader :state="toolCall.state" :type="toolCall.type" />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
      </ToolContent>
    </Tool>
  </div>
</template>
