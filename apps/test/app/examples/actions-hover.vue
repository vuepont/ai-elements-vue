<script setup lang="ts">
import { Action, Actions } from '@repo/elements/actions'
import { Message, MessageContent } from '@repo/elements/message'
import { Copy, Heart, RefreshCcw, Share, ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import { ref } from 'vue'

const liked = ref(false)
const disliked = ref(false)
const favorited = ref(false)

const responseContent = `This is a response from an assistant.

Try hovering over this message to see the actions appear!`

function handleRetry() {
  // eslint-disable-next-line no-console
  console.log('Retrying request...')
}

function handleCopy(content?: string) {
  // eslint-disable-next-line no-console
  console.log('Copied:', content)
}

function handleShare(content?: string) {
  // eslint-disable-next-line no-console
  console.log('Sharing:', content)
}

const actions = [
  { icon: RefreshCcw, label: 'Retry', onClick: handleRetry },
  { icon: ThumbsUp, label: 'Like', onClick: () => (liked.value = !liked.value) },
  { icon: ThumbsDown, label: 'Dislike', onClick: () => (disliked.value = !disliked.value) },
  { icon: Copy, label: 'Copy', onClick: () => handleCopy(responseContent) },
  { icon: Share, label: 'Share', onClick: () => handleShare(responseContent) },
  { icon: Heart, label: 'Favorite', onClick: () => (favorited.value = !favorited.value) },
]
</script>

<template>
  <Message class="group flex flex-col items-start gap-2" from="assistant">
    <MessageContent>{{ responseContent }}</MessageContent>
    <Actions class="mt-2 opacity-0 group-hover:opacity-100">
      <Action v-for="action in actions" :key="action.label" :label="action.label" @click="action.onClick">
        <component :is="action.icon" class="size-3" />
      </Action>
    </Actions>
  </Message>
</template>
