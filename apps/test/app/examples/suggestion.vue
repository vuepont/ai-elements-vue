<script setup lang="ts">
import { Suggestion, Suggestions } from '@repo/elements/suggestion'

const suggestions = [
  'What are the latest trends in AI?',
  'How does machine learning work?',
  'Explain quantum computing',
  'Best practices for React development',
  'Tell me about TypeScript benefits',
  'How to optimize database queries?',
  'What is the difference between SQL and NoSQL?',
  'Explain cloud computing basics',
]

function handleSuggestionClick(suggestion: string) {
  // eslint-disable-next-line no-console
  console.log('Selected suggestion:', suggestion)
}
</script>

<template>
  <Suggestions>
    <Suggestion
      v-for="suggestion in suggestions"
      :key="suggestion"
      :suggestion="suggestion"
      @click="handleSuggestionClick"
    />
  </Suggestions>
</template>
