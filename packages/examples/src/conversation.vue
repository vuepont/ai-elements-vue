<script setup lang="ts">
import { Conversation, ConversationContent, ConversationScrollButton } from '@repo/elements/conversation'
import { Message, MessageContent } from '@repo/elements/message'
import { nanoid } from 'nanoid'
import { onMounted, onUnmounted, ref } from 'vue'

interface MessageItem {
  key: string
  value: string
  from: 'user' | 'assistant'
}

const messages: MessageItem[] = [
  {
    key: nanoid(),
    value: 'Hello, how are you?',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'I\'m good, thank you! How can I assist you today?',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'I\'m looking for information about your services.',
    from: 'user',
  },
  {
    key: nanoid(),
    value:
      'Sure! We offer a variety of AI solutions. What are you interested in?',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'I\'m interested in natural language processing tools.',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'Great choice! We have several NLP APIs. Would you like a demo?',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'Yes, a demo would be helpful.',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'Alright, I can show you a sentiment analysis example. Ready?',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'Yes, please proceed.',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'Here is a sample: \'I love this product!\' → Positive sentiment.',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'Impressive! Can it handle multiple languages?',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'Absolutely, our models support over 20 languages.',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'How do I get started with the API?',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'You can sign up on our website and get an API key instantly.',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'Is there a free trial available?',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'Yes, we offer a 14-day free trial with full access.',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'What kind of support do you provide?',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'We provide 24/7 chat and email support for all users.',
    from: 'assistant',
  },
  {
    key: nanoid(),
    value: 'Thank you for the information!',
    from: 'user',
  },
  {
    key: nanoid(),
    value: 'You\'re welcome! Let me know if you have any more questions.',
    from: 'assistant',
  },
]

const visibleMessages = ref<MessageItem[]>([])

let timer: number | null = null

onMounted(() => {
  let index = 0
  timer = window.setInterval(() => {
    const next = messages[index]
    if (!next) {
      if (timer !== null) {
        clearInterval(timer)
        timer = null
      }
      return
    }
    visibleMessages.value = [...visibleMessages.value, next]
    index += 1
  }, 500)
})

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div class="h-[498px]">
    <Conversation class="relative size-full">
      <ConversationContent>
        <ConversationEmptyState
          v-if="visibleMessages.length === 0"
          title="Start a conversation"
          description="Messages will appear here as the conversation progresses."
        >
          <MessageSquareIcon class="size-6" />
        </ConversationEmptyState>

        <template v-else>
          <Message
            v-for="msg in visibleMessages"
            :key="msg.key"
            :from="msg.from"
          >
            <MessageContent>
              {{ msg.value }}
            </MessageContent>
          </Message>
        </template>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  </div>
</template>
