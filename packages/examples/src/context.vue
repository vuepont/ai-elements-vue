<script setup lang="ts">
import type { LanguageModelUsage } from 'ai'
import { Context, ContextCacheUsage, ContextContent, ContextContentBody, ContextContentFooter, ContextContentHeader, ContextInputUsage, ContextOutputUsage, ContextReasoningUsage, ContextTrigger } from '@repo/elements/context'

const usageData: LanguageModelUsage = {
  inputTokens: 32000,
  inputTokenDetails: {
    noCacheTokens: 32000,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
  },
  outputTokens: 8000,
  outputTokenDetails: {
    textTokens: 8000,
    reasoningTokens: 0,
  },
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
