<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@repo/elements/reasoning'
import { onMounted, ref } from 'vue'

const reasoningSteps = [
  'Let me think about this problem step by step.',
  '\n\nFirst, I need to understand what the user is asking for.',
  '\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.',
  '\n\nThis seems like a collapsible component with state management would be the right approach.',
].join('')

const content = ref('')
const isStreaming = ref(false)
const currentTokenIndex = ref(0)
const tokens = ref<string[]>([])

function chunkIntoTokens(text: string): string[] {
  const tokenArray: string[] = []
  let i = 0
  while (i < text.length) {
    const chunkSize = Math.floor(Math.random() * 2) + 3
    tokenArray.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return tokenArray
}

function streamToken() {
  if (!isStreaming.value || currentTokenIndex.value >= tokens.value.length) {
    if (isStreaming.value) {
      isStreaming.value = false
    }
    return
  }

  content.value += tokens.value[currentTokenIndex.value]
  currentTokenIndex.value++

  setTimeout(streamToken, 25)
}

function startSimulation() {
  tokens.value = chunkIntoTokens(reasoningSteps)
  content.value = ''
  currentTokenIndex.value = 0
  isStreaming.value = true
  streamToken()
}

onMounted(() => {
  startSimulation()
})
</script>

<template>
  <div class="w-full p-4" style="height: 300px">
    <Reasoning class="w-full" :is-streaming="isStreaming">
      <ReasoningTrigger />
      <ReasoningContent :content="content" />
    </Reasoning>
  </div>
</template>
