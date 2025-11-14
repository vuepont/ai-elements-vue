<script setup lang="ts">
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@repo/elements/tool'

const toolCall = {
  type: 'tool-api_request' as const,
  toolCallId: 'api_request_1',
  state: 'output-error' as const,
  input: {
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token123',
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  },
  output: undefined,
  errorText:
    'Connection timeout: The request took longer than 5000ms to complete. Please check your network connection and try again.',
}
</script>

<template>
  <div style="height: 500px">
    <Tool>
      <ToolHeader :state="toolCall.state" :type="toolCall.type" />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <ToolOutput
          v-if="toolCall.state === 'output-error'"
          :error-text="toolCall.errorText"
          :output="toolCall.output"
        />
      </ToolContent>
    </Tool>
  </div>
</template>
