<script setup lang="ts">
import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from '@repo/elements/checkpoint'
import { Conversation, ConversationContent } from '@repo/elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@repo/elements/message'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

interface MessageType {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: MessageType[] = [
  {
    id: nanoid(),
    role: 'user',
    content: 'What is Vue?',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue is a JavaScript library for building user interfaces. It was developed by Evan You and is now maintained by him and a community of developers.',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'How does component state work?',
  },
]

const messages = ref<MessageType[]>(initialMessages)
const checkpoints = ref([
  { messageCount: 2, timestamp: new Date(Date.now() - 3_600_000) },
])

const messagesWithCheckpoints = computed(() => {
  return messages.value.map((message, index) => {
    const checkpoint = checkpoints.value.find(
      cp => cp.messageCount === index + 1,
    )
    return { message, checkpoint }
  })
})

function handleRestore(messageCount: number) {
  messages.value = initialMessages.slice(0, messageCount)
}
</script>

<template>
  <div class="flex size-full flex-col rounded-lg border p-6">
    <Conversation>
      <ConversationContent>
        <template
          v-for="{ message, checkpoint } in messagesWithCheckpoints"
          :key="message.id"
        >
          <Message :from="message.role">
            <MessageContent>
              <MessageResponse>{{ message.content }}</MessageResponse>
            </MessageContent>
          </Message>

          <Checkpoint v-if="checkpoint">
            <CheckpointIcon />
            <CheckpointTrigger
              tooltip="Restores workspace and chat to this point"
              @click="handleRestore(checkpoint.messageCount)"
            >
              Restore checkpoint
            </CheckpointTrigger>
          </Checkpoint>
        </template>
      </ConversationContent>
    </Conversation>
  </div>
</template>
