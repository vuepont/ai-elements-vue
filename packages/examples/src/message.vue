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

const messages: MessageType[] = [
  {
    key: nanoid(),
    from: 'user',
    content: 'How do React hooks work and when should I use them?',
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
        content: `# React Hooks Guide

React hooks are functions that let you "hook into" React state and lifecycle features from function components. Here's what you need to know:

## Core Hooks

### useState
Adds state to functional components:

\`\`\`jsx
const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);
\`\`\`

### useEffect
Handles side effects (data fetching, subscriptions, DOM updates):

\`\`\`jsx
useEffect(() => {
  document.title = \`You clicked \${count} times\`;

  // Cleanup function (optional)
  return () => {
    document.title = 'React App';
  };
}, [count]); // Dependency array
\`\`\`

## When to Use Hooks

- ✅ **Function components** - Hooks only work in function components
- ✅ **Replacing class components** - Modern React favors hooks over classes
- ✅ **Sharing stateful logic** - Create custom hooks to reuse logic
- ❌ **Class components** - Use lifecycle methods instead

## Rules of Hooks

1. Only call hooks at the **top level** (not inside loops, conditions, or nested functions)
2. Only call hooks from **React functions** (components or custom hooks)

Would you like to explore more advanced hooks like \`useCallback\` or \`useMemo\`?`,
      },
      {
        id: nanoid(),
        content: `React hooks are special functions that let you use React features in function components. The most common ones are:

- **useState** - for managing component state
- **useEffect** - for side effects like data fetching
- **useContext** - for consuming context values
- **useRef** - for accessing DOM elements

Here's a simple example:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

Which specific hook would you like to learn more about?`,
      },
      {
        id: nanoid(),
        content: `Absolutely! React hooks are a powerful feature introduced in React 16.8. They solve several problems:

## Key Benefits

1. **Simpler code** - No need for class components
2. **Reusable logic** - Extract stateful logic into custom hooks
3. **Better organization** - Group related code together

## Most Popular Hooks

| Hook | Purpose |
|------|---------|
| useState | Add state to components |
| useEffect | Handle side effects |
| useContext | Access context values |
| useReducer | Complex state logic |
| useCallback | Memoize functions |
| useMemo | Memoize values |

The beauty of hooks is that they let you reuse stateful logic without changing your component hierarchy. Want to dive into a specific hook?`,
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
            <!-- <MessageResponse>{{ version.content }}</MessageResponse> -->
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
          <MessageResponse v-if="message.from === 'assistant'" :content="message.content">
            <!-- {{ message.content }} -->
          </MessageResponse>
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
