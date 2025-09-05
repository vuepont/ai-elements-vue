<script setup lang="ts">
import { Conversation, ConversationContent, ConversationScrollButton } from '@repo/elements/conversation'
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
import { nanoid } from 'nanoid'
import { onMounted, onUnmounted, ref } from 'vue'

interface MessageItem {
  key: string
  value: string
  name: string
  avatar: string
}

const messages: MessageItem[] = [
  {
    key: nanoid(),
    value: 'Hello, how are you?',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'I\'m good, thank you! How can I assist you today?',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'I\'m looking for information about your services.',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Sure! We offer a variety of AI solutions. What are you interested in?',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'I\'m interested in natural language processing tools.',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Great choice! We have several NLP APIs. Would you like a demo?',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'Yes, a demo would be helpful.',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Alright, I can show you a sentiment analysis example. Ready?',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'Yes, please proceed.',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Here is a sample: \'I love this product!\' → Positive sentiment.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'Impressive! Can it handle multiple languages?',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Absolutely, our models support over 20 languages.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'How do I get started with the API?',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'You can sign up on our website and get an API key instantly.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'Is there a free trial available?',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'Yes, we offer a 14-day free trial with full access.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'What kind of support do you provide?',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'We provide 24/7 chat and email support for all users.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
  },
  {
    key: nanoid(),
    value: 'Thank you for the information!',
    name: 'Alex Johnson',
    avatar: 'https://github.com/haydenbleasel.png',
  },
  {
    key: nanoid(),
    value: 'You\'re welcome! Let me know if you have any more questions.',
    name: 'AI Assistant',
    avatar: 'https://github.com/openai.png',
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
  <div class="h-[498px] rounded-xl border">
    <Conversation class="relative h-full">
      <ConversationContent class="space-y-2">
        <Message v-for="(m, idx) in visibleMessages" :key="m.key" :from="idx % 2 === 0 ? 'user' : 'assistant'">
          <MessageContent>{{ m.value }}</MessageContent>
          <MessageAvatar :src="m.avatar" :name="m.name" />
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  </div>
</template>
