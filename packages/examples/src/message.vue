<!-- eslint-disable no-console -->
<script setup lang="ts">
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAttachment,
  MessageAttachments,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from '@repo/elements/message'
import {
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface Attachment {
  type: 'file'
  url: string
  mediaType?: string
  filename?: string
}

interface Version {
  id: string
  content: string
}

interface MessageType {
  key: string
  from: 'user' | 'assistant'
  versions?: Version[]
  content?: string
  attachments?: Attachment[]
}

const messages: {
  key: string
  from: 'user' | 'assistant'
  versions?: { id: string, content: string }[]
  content?: string
  attachments?: {
    type: 'file'
    url: string
    mediaType?: string
    filename?: string
  }[]
}[] = [
  {
    key: nanoid(),
    from: 'user',
    content: 'How do Vue composition APIs work and when should I use them?',
    attachments: [
      {
        type: 'file',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        mediaType: 'image/jpeg',
        filename: 'palace-of-fine-arts.jpg',
      },
      {
        type: 'file',
        url: '',
        mediaType: 'application/pdf',
        filename: 'react-hooks-guide.pdf',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    versions: [
      {
        id: nanoid(),
        content: `# Vue Composition API Guide

The Vue Composition API is a set of functions that let you use Vue’s reactivity and lifecycle features inside the \`setup()\` function of your components. Here's what you need to know:

## Core Composables

### ref()
Creates reactive primitive values:

\`\`\`vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
<\/script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>
\`\`\`

### watch()
Runs side effects when reactive values change:

\`\`\`vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(\`Count changed from \${oldVal} to \${newVal}\`)
})
<\/script>
\`\`\`

## When to Use the Composition API

- ✅ **For complex logic** — Easier to organize and reuse reactive state
- ✅ **For reusable code** — Create your own composables (like custom hooks)
- ✅ **For TypeScript support** — More type-friendly than Options API
- ❌ **For simple components** — The Options API might be enough

## Rules of the Composition API

1. Only use Vue composables **inside \`setup()\`** or other composables
2. Always return what you want to use in your template from \`setup()\`

Would you like to explore more advanced composables like \`computed\` or \`onMounted\`?`,
      },
      {
        id: nanoid(),
        content: `The Vue Composition API is a modern way to write components in Vue 3. It replaces the Options API’s data, methods, and computed properties with a single \`setup()\` function.

Here are the most common composables:

- **ref()** — creates reactive primitive values
- **reactive()** — makes entire objects reactive
- **computed()** — creates derived reactive values
- **watch()** — runs side effects on data changes
- **onMounted()** — lifecycle hook for when a component is mounted

Here's a simple example:

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() => {
  console.log('Component mounted!')
})
<\/script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>
\`\`\`

Which specific composable would you like to learn more about?`,
      },
      {
        id: nanoid(),
        content: `Absolutely! The Vue Composition API brings a new, more flexible way to manage logic and reactivity in Vue components.

## Key Benefits

1. **Cleaner code organization** — Group related logic by feature
2. **Reusable logic** — Build and share your own composables
3. **Better TypeScript support** — Stronger typing than the Options API

## Most Popular Composables

| Composable | Purpose |
|-------------|----------|
| ref | Reactive primitive values |
| reactive | Reactive objects |
| computed | Derived reactive values |
| watch | React to data changes |
| onMounted | Run code when component mounts |
| onUnmounted | Cleanup logic when destroyed |

The beauty of the Composition API is that it lets you reuse stateful logic without changing your component structure. Want to dive into a specific composable?`,
      },
    ],
  },
]

const liked = ref<Record<string, boolean>>({})
const disliked = ref<Record<string, boolean>>({})

function handleCopy(content: string) {
  navigator.clipboard.writeText(content)
}

function handleRetry() {
  console.log('Retrying...')
}

function toggleLike(key: string) {
  liked.value = {
    ...liked.value,
    [key]: !liked.value[key],
  }
}

function toggleDislike(key: string) {
  disliked.value = {
    ...disliked.value,
    [key]: !disliked.value[key],
  }
}

function hasMultipleVersions(message: MessageType) {
  return message.versions && message.versions.length > 1
}

function handleBranchChange(index: number) {
  console.log('Branch changed to:', index)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Message
      v-for="message in messages"
      :key="message.key"
      :from="message.from"
    >
      <!-- Multiple versions with branch selector -->
      <MessageBranch
        v-if="hasMultipleVersions(message)"
        :default-branch="0"
        @branch-change="handleBranchChange"
      >
        <MessageBranchContent>
          <MessageContent
            v-for="version in message.versions"
            :key="version.id"
          >
            <MessageResponse :content="version.content" />
          </MessageContent>
        </MessageBranchContent>

        <MessageToolbar v-if="message.from === 'assistant'">
          <MessageBranchSelector :from="message.from">
            <MessageBranchPrevious />
            <MessageBranchPage />
            <MessageBranchNext />
          </MessageBranchSelector>

          <MessageActions>
            <MessageAction
              label="Retry"
              tooltip="Regenerate response"
              @click="handleRetry"
            >
              <RefreshCcwIcon class="size-4" />
            </MessageAction>

            <MessageAction
              label="Like"
              tooltip="Like this response"
              @click="toggleLike(message.key)"
            >
              <ThumbsUpIcon
                class="size-4"
                :fill="liked[message.key] ? 'currentColor' : 'none'"
              />
            </MessageAction>

            <MessageAction
              label="Dislike"
              tooltip="Dislike this response"
              @click="toggleDislike(message.key)"
            >
              <ThumbsDownIcon
                class="size-4"
                :fill="disliked[message.key] ? 'currentColor' : 'none'"
              />
            </MessageAction>

            <MessageAction
              label="Copy"
              tooltip="Copy to clipboard"
              @click="handleCopy(message.versions?.find((v) => v.id)?.content || '')"
            >
              <CopyIcon class="size-4" />
            </MessageAction>
          </MessageActions>
        </MessageToolbar>
      </MessageBranch>

      <!-- Single version without branch selector -->
      <div v-else>
        <MessageAttachments
          v-if="message.attachments && message.attachments.length > 0"
          class="mb-2"
        >
          <MessageAttachment
            v-for="attachment in message.attachments"
            :key="attachment.url"
            :data="{ ...attachment, mediaType: attachment.mediaType ?? 'application/octet-stream' }"
          />
        </MessageAttachments>

        <MessageContent>
          <MessageResponse v-if="message.from === 'assistant'" :content="message.content" />
          <template v-else>
            {{ message.content }}
          </template>
        </MessageContent>

        <MessageActions v-if="message.from === 'assistant' && message.versions">
          <MessageAction
            label="Retry"
            tooltip="Regenerate response"
            @click="handleRetry"
          >
            <RefreshCcwIcon class="size-4" />
          </MessageAction>

          <MessageAction
            label="Like"
            tooltip="Like this response"
            @click="toggleLike(message.key)"
          >
            <ThumbsUpIcon
              class="size-4"
              :fill="liked[message.key] ? 'currentColor' : 'none'"
            />
          </MessageAction>

          <MessageAction
            label="Dislike"
            tooltip="Dislike this response"
            @click="toggleDislike(message.key)"
          >
            <ThumbsDownIcon
              class="size-4"
              :fill="disliked[message.key] ? 'currentColor' : 'none'"
            />
          </MessageAction>

          <MessageAction
            label="Copy"
            tooltip="Copy to clipboard"
            @click="handleCopy(message.content || '')"
          >
            <CopyIcon class="size-4" />
          </MessageAction>
        </MessageActions>
      </div>
    </Message>
  </div>
</template>
