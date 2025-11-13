<script setup lang="ts">
import { Context, ContextCacheUsage, ContextContent, ContextContentBody, ContextContentFooter, ContextContentHeader, ContextInputUsage, ContextOutputUsage, ContextReasoningUsage, ContextTrigger } from '@repo/elements/context'

const usageData = {
  inputTokens: 32000,
  outputTokens: 8000,
  totalTokens: 40000,
  cachedInputTokens: 0,
  reasoningTokens: 0,
}

const contextProps = {
  usedTokens: 40000,
  maxTokens: 128000,
  modelId: 'openai:gpt-5',
  usage: usageData,
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <Context v-bind="contextProps">
      <ContextTrigger />

      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  </div>
</template>
