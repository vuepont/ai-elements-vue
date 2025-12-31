<script setup lang="ts">
import type { PromptInputMessage } from '@repo/elements/prompt-input'
import type { ToolUIPart } from 'ai'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@repo/elements/conversation'
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from '@repo/elements/message'
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,

  PromptInputTextarea,
  PromptInputTools,
} from '@repo/elements/prompt-input'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@repo/elements/reasoning'
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@repo/elements/sources'
import { Suggestion, Suggestions } from '@repo/elements/suggestion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  AudioWaveformIcon,
  BarChartIcon,
  BoxIcon,
  CameraIcon,
  CodeSquareIcon,
  FileIcon,
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  NotepadTextIcon,
  PaperclipIcon,
  ScreenShareIcon,
} from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { onMounted, onUnmounted, ref } from 'vue'
import { toast } from 'vue-sonner'

interface MessageType {
  key: string
  from: 'user' | 'assistant'
  sources?: { href: string, title: string }[]
  versions: {
    id: string
    content: string
  }[]
  reasoning?: {
    content: string
    duration: number
  }
  tools?: {
    name: string
    description: string
    status: ToolUIPart['state']
    parameters: Record<string, unknown>
    result: string | undefined
    error: string | undefined
  }[]
  isReasoningComplete?: boolean
  isContentComplete?: boolean
  isReasoningStreaming?: boolean
}

const mockMessages: MessageType[] = [
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content: 'Can you explain how to use Vue reactivity effectively?',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    sources: [
      {
        href: 'https://vuejs.org/api/reactivity-core.html',
        title: 'Vue Reactivity Core',
      },
      {
        href: 'https://vuejs.org/guide/extras/composition-api-faq.html',
        title: 'Composition API FAQ',
      },
    ],
    tools: [
      {
        name: 'mcp',
        description: 'Searching Vue documentation',
        status: 'input-available' as ToolUIPart['state'],
        parameters: {
          query: 'Vue reactivity best practices',
          source: 'vuejs.org',
        },
        result: `{
  "query": "Vue reactivity best practices",
  "results": [
    {
      "title": "Reactivity Core",
      "url": "https://vuejs.org/api/reactivity-core.html",
      "snippet": "Reactivity Core is a set of core APIs for creating reactive data in Vue. It provides the basic building blocks for creating reactive data in Vue."
    },
     {
      "title": "Computed Properties",
      "url": "https://vuejs.org/guide/essentials/computed.html",
      "snippet": "Computed properties are cached based on their dependencies and only re-evaluate when necessary."
    },
    {
      "title": "Watchers",
      "url": "https://vuejs.org/guide/essentials/watchers.html",
      "snippet": "Watch is used to perform side effects in response to reactive state changes."
    }
  ]
}`,
        error: undefined,
      },
    ],
    versions: [
      {
        id: nanoid(),
        content: `# Vue Reactivity Best Practices

Vue reactivity is a powerful feature that let you use state and other Vue features without writing classes. Here are some tips for using them effectively:

## Rules of Reactivity

1. **Only call reactivity at the top level** of your component or custom hooks
2. **Don't call reactivity inside loops, conditions, or nested functions**

## Core Reactivity APIs

- **ref()** – for primitive reactive values
- **reactive()** – for objects
- **computed()** – memoized derived values
- **watch()** – respond to state changes
- **watchEffect()** – run effects automatically

## Example of ref() and watchEffect()

\`\`\`vue
<script setup>
import { ref, watchEffect } from "vue";

const userId = ref(1);
const user = ref(null);

watchEffect(async () => {
  user.value = await fetchUser(userId.value);
});
<\/script>

<template>
  <Profile v-if="user" :user="user" />
  <Loading v-else />
</template>
\`\`\`

Want deeper explanation of computed() and handling expensive logic?
`,
      },
    ],
  },
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content:
          'Yes, could you explain computed and function memoization in more detail? When should I use one over the other?',
      },
      {
        id: nanoid(),
        content:
          'I\'m particularly interested in understanding the performance implications of computed and memoized functions in Vue. Could you break down when each is most appropriate?',
      },
      {
        id: nanoid(),
        content:
          'Thanks for the overview! Could you dive deeper into the specific use cases where computed and memoized functions make the biggest difference in Vue applications?',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    reasoning: {
      content: `The user is asking for a detailed explanation of how Vue handles memoized values and reactive updates. I should provide a clear and concise explanation of each concept's purpose and how they differ.

The computed() function is used to create cached, derived values that only update when their reactive dependencies change.

Regular functions inside setup() rely on Vue’s reactivity system and only run when the state they depend on changes.

Both features help with performance optimization, but they serve different purposes.`,
      duration: 10,
    },
    versions: [
      {
        id: nanoid(),
        content: `## computed vs watch

Both features help with _performance optimization_, but they serve different purposes:

### computed

\`computed\` memoizes **derived values** and only updates when their reactive dependencies change.

\`\`\`ts
// A simple reactive state
const count = ref(0);

// Using computed - value is cached until 'count' changes
const doubled = computed(() => count.value * 2);
\`\`\`

### watch

\`watch\` is used to run **side effects** in response to reactive state changes.

\`\`\`ts
// Watching a value - function runs only when 'count' changes
watch(count, (newValue) => {
  console.log("Count changed:", newValue);
});
\`\`\`

### When to use which?

- Use **computed** when:
  - You need a cached, derived value
  - You want something to behave like state but depend on other state
  - You want to avoid recalculating expensive logic on every update

- Use **watch** when:
  - You need to run side effects (API calls, logging, syncing data)
  - You want to respond to changes without returning a value

### Performance Note

Don't overuse \`watch\` for things that should be computed values. \`computed\` is more efficient and should be preferred for derived state.

### ~~Common Mistakes~~

Avoid these ~~anti-patterns~~ when using Vue reactivity:
- ~~Doing heavy computation directly inside templates~~ — move logic to \`computed\`
- Overusing \`watch\` for transformations that should be computed
- Mutating reactive objects in ways Vue can't track (e.g., replacing arrays incorrectly)`,

      },
    ],
  },
]

const suggestions = [
  { icon: BarChartIcon, text: 'Analyze data', color: '#76d0eb' },
  { icon: BoxIcon, text: 'Surprise me', color: '#76d0eb' },
  { icon: NotepadTextIcon, text: 'Summarize text', color: '#ea8444' },
  { icon: CodeSquareIcon, text: 'Code', color: '#6c71ff' },
  { icon: GraduationCapIcon, text: 'Get advice', color: '#76d0eb' },
  { icon: null, text: 'More' },
]

const mockMessageResponses = [
  'That\'s a great question! Let me help you understand this concept better. The key thing to remember is that proper implementation requires careful consideration of the underlying principles and best practices in the field.',
  'I\'d be happy to explain this topic in detail. From my understanding, there are several important factors to consider when approaching this problem. Let me break it down step by step for you.',
  'This is an interesting topic that comes up frequently. The solution typically involves understanding the core concepts and applying them in the right context. Here\'s what I recommend...',
  'Great choice of topic! This is something that many developers encounter. The approach I\'d suggest is to start with the fundamentals and then build up to more complex scenarios.',
  'That\'s definitely worth exploring. From what I can see, the best way to handle this is to consider both the theoretical aspects and practical implementation details.',
]

const text = ref<string>('')
const useWebSearch = ref<boolean>(false)
const useMicrophone = ref<boolean>(false)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
const messages = ref<MessageType[]>([])
const streamingMessageId = ref<string | null>(null)

async function streamReasoning(messageKey: string, versionId: string, reasoningContent: string) {
  const words = reasoningContent.split(' ')
  let currentContent = ''

  for (let i = 0; i < words.length; i++) {
    currentContent += (i > 0 ? ' ' : '') + words[i]

    // Find and update the specific message directly
    const msg = messages.value.find(m => m.key === messageKey)
    if (msg && msg.reasoning) {
      msg.reasoning.content = currentContent
    }

    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 30 + 20),
    )
  }

  // Mark reasoning as complete
  const msg = messages.value.find(m => m.key === messageKey)
  if (msg) {
    msg.isReasoningComplete = true
    msg.isReasoningStreaming = false
  }
}

async function streamContent(messageKey: string, versionId: string, content: string) {
  const words = content.split(' ')
  let currentContent = ''

  for (let i = 0; i < words.length; i++) {
    currentContent += (i > 0 ? ' ' : '') + words[i]

    const msg = messages.value.find(m => m.key === messageKey)
    if (msg) {
      const version = msg.versions.find(v => v.id === versionId)
      if (version) {
        version.content = currentContent
      }
    }

    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 50 + 25),
    )
  }

  // Mark content as complete
  const msg = messages.value.find(m => m.key === messageKey)
  if (msg) {
    msg.isContentComplete = true
  }
}

async function streamMessageResponse(messageKey: string, versionId: string, content: string, reasoning?: { content: string, duration: number }) {
  status.value = 'streaming'
  streamingMessageId.value = versionId

  // First stream the reasoning if it exists
  if (reasoning) {
    await streamReasoning(messageKey, versionId, reasoning.content)
    await new Promise(resolve => setTimeout(resolve, 500)) // Pause between reasoning and content
  }

  // Then stream the content
  await streamContent(messageKey, versionId, content)

  status.value = 'ready'
  streamingMessageId.value = null
}

async function streamMessage(message: MessageType) {
  if (message.from === 'user') {
    messages.value.push(message)
    return
  }

  // Add empty assistant message with reasoning structure
  const newMessage: MessageType = {
    ...message,
    versions: message.versions.map(v => ({ ...v, content: '' })),
    reasoning: message.reasoning
      ? { ...message.reasoning, content: '' }
      : undefined,
    isReasoningComplete: false,
    isContentComplete: false,
    isReasoningStreaming: !!message.reasoning,
  }

  messages.value.push(newMessage)

  // Get the first version for streaming
  const firstVersion = message.versions[0]
  if (!firstVersion)
    return

  // Stream the response
  await streamMessageResponse(
    newMessage.key,
    firstVersion.id,
    firstVersion.content,
    message.reasoning,
  )
}

function addUserMessage(content: string) {
  const userMessage: MessageType = {
    key: `user-${Date.now()}`,
    from: 'user',
    versions: [
      {
        id: `user-${Date.now()}`,
        content,
      },
    ],
  }

  messages.value.push(userMessage)

  setTimeout(() => {
    const assistantMessageKey = `assistant-${Date.now()}`
    const assistantMessageId = `version-${Date.now()}`
    const randomMessageResponse
      = mockMessageResponses[Math.floor(Math.random() * mockMessageResponses.length)]

    // Create reasoning for some responses
    const shouldHaveReasoning = Math.random() > 0.5
    const reasoning = shouldHaveReasoning
      ? {
          content:
            'Let me think about this question carefully. I need to provide a comprehensive and helpful response that addresses the user\'s needs while being clear and concise.',
          duration: 3,
        }
      : undefined

    const assistantMessage: MessageType = {
      key: assistantMessageKey,
      from: 'assistant',
      versions: [
        {
          id: assistantMessageId,
          content: '',
        },
      ],
      reasoning: reasoning ? { ...reasoning, content: '' } : undefined,
      isReasoningComplete: false,
      isContentComplete: false,
      isReasoningStreaming: !!reasoning,
    }

    messages.value.push(assistantMessage)
    streamMessageResponse(
      assistantMessageKey,
      assistantMessageId,
      randomMessageResponse,
      reasoning,
    )
  }, 500)
}

function handleSubmit(message: PromptInputMessage) {
  const hasText = Boolean(message.text)
  const hasAttachments = Boolean(message.files?.length)

  if (!(hasText || hasAttachments)) {
    return
  }

  status.value = 'submitted'
  addUserMessage(message.text || 'Sent with attachments')
  text.value = ''
}

function handleFileAction(action: string) {
  toast.success('File action', {
    description: action,
  })
}

function handleSuggestionClick(suggestion: string) {
  status.value = 'submitted'
  addUserMessage(suggestion)
}

let initTimer: NodeJS.Timeout

onMounted(() => {
  // Reset state on mount to ensure fresh component
  messages.value = []

  const processMessages = async () => {
    for (let i = 0; i < mockMessages.length; i++) {
      await streamMessage(mockMessages[i])

      if (i < mockMessages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  // Small delay to ensure state is reset before starting
  initTimer = setTimeout(() => {
    processMessages()
  }, 100)
})

onUnmounted(() => {
  clearTimeout(initTimer)
})
</script>

<template>
  <div class="relative flex size-full flex-col divide-y overflow-hidden">
    <div class="h-[498px] overflow-y-scroll">
      <Conversation>
        <ConversationContent>
          <template v-for="message in messages" :key="message.key">
            <MessageBranch :default-branch="0">
              <MessageBranchContent>
                <template v-for="version in message.versions" :key="`${message.key}-${version.id}`">
                  <Message :from="message.from">
                    <div>
                      <Sources v-if="message.sources?.length">
                        <SourcesTrigger :count="message.sources.length" />
                        <SourcesContent>
                          <Source
                            v-for="source in message.sources"
                            :key="source.href"
                            :href="source.href"
                            :title="source.title"
                          />
                        </SourcesContent>
                      </Sources>

                      <Reasoning
                        v-if="message.reasoning"
                        :duration="message.reasoning.duration"
                        :is-streaming="message.isReasoningStreaming"
                      >
                        <ReasoningTrigger />
                        <ReasoningContent :content="message.reasoning.content" />
                      </Reasoning>

                      <MessageContent
                        v-if="message.from === 'user' || message.isReasoningComplete || !message.reasoning"
                        :class="cn(
                          'group-[.is-user]:rounded-[24px] group-[.is-user]:bg-secondary group-[.is-user]:text-foreground',
                          'group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-assistant]:text-foreground',
                        )"
                      >
                        <MessageResponse
                          :content="version.content"
                          :shiki-options="{
                            langs: ['vue', 'ts'],
                          }"
                        />
                      </MessageContent>
                    </div>
                  </Message>
                </template>
              </MessageBranchContent>

              <MessageBranchSelector
                v-if="message.versions.length > 1"
                class="px-0"
                :from="message.from"
              >
                <MessageBranchPrevious />
                <MessageBranchPage />
                <MessageBranchNext />
              </MessageBranchSelector>
            </MessageBranch>
          </template>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>

    <div class="grid shrink-0 gap-4 p-4">
      <PromptInput
        class="divide-y-0 rounded-[28px]"
        @submit="handleSubmit"
      >
        <PromptInputTextarea
          v-model="text"
          class="px-5 md:text-base"
          placeholder="Ask anything"
        />

        <PromptInputFooter class="p-2.5">
          <PromptInputTools>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <PromptInputButton
                  class="rounded-full! border font-medium"
                  variant="outline"
                >
                  <PaperclipIcon :size="16" />
                  <span>Attach</span>
                </PromptInputButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem @click="handleFileAction('upload-file')">
                  <FileIcon class="mr-2" :size="16" />
                  Upload file
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('upload-photo')">
                  <ImageIcon class="mr-2" :size="16" />
                  Upload photo
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('take-screenshot')">
                  <ScreenShareIcon class="mr-2" :size="16" />
                  Take screenshot
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('take-photo')">
                  <CameraIcon class="mr-2" :size="16" />
                  Take photo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <PromptInputButton
              class="rounded-full border font-medium"
              variant="outline"
              @click="useWebSearch = !useWebSearch"
            >
              <GlobeIcon :size="16" />
              <span>Search</span>
            </PromptInputButton>
          </PromptInputTools>

          <PromptInputButton
            class="rounded-full font-medium text-foreground"
            variant="secondary"
            @click="useMicrophone = !useMicrophone"
          >
            <AudioWaveformIcon :size="16" />
            <span>Voice</span>
          </PromptInputButton>
        </PromptInputFooter>
      </PromptInput>

      <Suggestions class="px-4">
        <Suggestion
          v-for="item in suggestions"
          :key="item.text"
          class="font-normal"
          :suggestion="item.text"
          @click="handleSuggestionClick(item.text)"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            :size="16"
            :style="{ color: item.color }"
          />
          {{ item.text }}
        </Suggestion>
      </Suggestions>
    </div>
  </div>
</template>
