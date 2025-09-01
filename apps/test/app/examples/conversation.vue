<script setup lang="ts">
import { Conversation, ConversationContent } from '@repo/elements/conversation'
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'

const messages = [
  { id: 1, from: 'assistant', text: 'Welcome! Ask me anything.' },
  { id: 2, from: 'user', text: 'Show me an example conversation.' },
  { id: 3, from: 'assistant', text: 'Here is a scrollable chat area with auto-stick-to-bottom.' },
]
</script>

<template>
  <div class="h-[300px] rounded-xl border">
    <Conversation class="h-full">
      <ConversationContent class="p-2 space-y-2">
        <Message v-for="m in messages" :key="m.id" :from="m.from === 'user' ? 'user' : 'assistant'">
          <MessageAvatar src="https://github.com/openai.png" :name="m.from === 'user' ? 'Me' : 'AI'" />
          <MessageContent>{{ m.text }}</MessageContent>
        </Message>
      </ConversationContent>
    </Conversation>
  </div>
</template>
