<script setup lang="ts">
import { Branch, BranchMessages, BranchNext, BranchPage, BranchPrevious, BranchSelector } from '@repo/elements/branch'
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
import { nanoid } from 'nanoid'

interface SimpleMessage {
  id: string
  content: string
}

const userMessages: SimpleMessage[] = [
  { id: nanoid(), content: 'What are the key strategies for optimizing Vue performance?' },
  { id: nanoid(), content: 'How can I improve the performance of my Vue application?' },
  { id: nanoid(), content: 'What performance optimization techniques should I use in Vue?' },
]

const assistantMessages: SimpleMessage[] = [
  { id: nanoid(), content: 'Here\'s the first response to your question. This approach focuses on performance optimization.' },
  { id: nanoid(), content: 'Here\'s an alternative response. This approach emphasizes code readability and maintainability over pure performance.' },
  { id: nanoid(), content: 'And here\'s a third option. This balanced approach considers both performance and maintainability, making it suitable for most use cases.' },
]

function handleBranchChange(branchIndex: number) {
  // eslint-disable-next-line no-console
  console.log('Branch changed to:', branchIndex)
}
</script>

<template>
  <div class="space-y-8">
    <Branch :default-branch="0" :on-branch-change="handleBranchChange">
      <BranchMessages>
        <Message v-for="message in userMessages" :key="message.id" from="user">
          <MessageContent>{{ message.content }}</MessageContent>
          <MessageAvatar name="Hayden Bleasel" src="https://github.com/haydenbleasel.png" />
        </Message>
      </BranchMessages>
      <BranchSelector from="user">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>

    <Branch :default-branch="0" :on-branch-change="handleBranchChange">
      <BranchMessages>
        <Message v-for="message in assistantMessages" :key="message.id" from="assistant">
          <MessageContent>{{ message.content }}</MessageContent>
          <MessageAvatar name="AI" src="https://github.com/openai.png" />
        </Message>
      </BranchMessages>
      <BranchSelector from="assistant">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  </div>
</template>
