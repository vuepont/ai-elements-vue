<script setup lang="ts">
import { Action, Actions } from '@repo/elements/actions'
import { Conversation, ConversationContent } from '@repo/elements/conversation'
import { Message, MessageContent } from '@repo/elements/message'
import { Copy, RefreshCcw, Share, ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface MsgItem {
  key: string
  from: 'user' | 'assistant'
  content: string
  avatar: string
  name: string
}

const messages: MsgItem[] = [
  {
    key: nanoid(),
    from: 'user',
    content: 'Hello, how are you?',
    avatar: 'https://github.com/haydenbleasel.png',
    name: 'Hayden Bleasel',
  },
  {
    key: nanoid(),
    from: 'assistant',
    content: 'I am fine, thank you!',
    avatar: 'https://github.com/openai.png',
    name: 'OpenAI',
  },
]

const liked = ref(false)
const disliked = ref(false)
// removed unused state

function handleRetry() {}
function handleCopy() {}
function handleShare() {}

const actions = [
  { icon: RefreshCcw, label: 'Retry', onClick: handleRetry },
  { icon: ThumbsUp, label: 'Like', onClick: () => (liked.value = !liked.value) },
  { icon: ThumbsDown, label: 'Dislike', onClick: () => (disliked.value = !disliked.value) },
  { icon: Copy, label: 'Copy', onClick: () => handleCopy() },
  { icon: Share, label: 'Share', onClick: () => handleShare() },
]
</script>

<template>
  <Conversation class="relative w-full">
    <ConversationContent>
      <Message
        v-for="message in messages"
        :key="message.key"
        :from="message.from"
        class="flex flex-col gap-2"
        :class="message.from === 'assistant' ? 'items-start' : 'items-end'"
      >
        <MessageContent>{{ message.content }}</MessageContent>
        <Actions v-if="message.from === 'assistant'" class="mt-2">
          <Action v-for="action in actions" :key="action.label" :label="action.label" @click="action.onClick">
            <component :is="action.icon" class="size-4" />
          </Action>
        </Actions>
      </Message>
    </ConversationContent>
  </Conversation>
</template>
