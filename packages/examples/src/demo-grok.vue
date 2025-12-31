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
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from '@repo/elements/model-selector'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  AudioWaveformIcon,
  CameraIcon,
  CheckIcon,
  ChevronDownIcon,
  FileIcon,
  ImageIcon,
  LightbulbIcon,
  PaperclipIcon,
  ScreenShareIcon,
  SearchIcon,
} from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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

const models = [
  {
    id: 'grok-3',
    name: 'Grok-3',
    chef: 'xAI',
    chefSlug: 'xai',
    providers: ['xai'],
  },
  {
    id: 'grok-2-1212',
    name: 'Grok-2-1212',
    chef: 'xAI',
    chefSlug: 'xai',
    providers: ['xai'],
  },
]

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
        status: 'input-available',
        parameters: {
          query: 'Vue reactivity best practices',
          source: 'vuejs.org',
        },
        result: `{
  "query": "Vue reactivity best practices",
  "results": [
    {
      "title": "Reactivity Fundamentals",
      "url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
      "snippet": "Vue's reactivity system automatically tracks dependencies and triggers updates when reactive values change."
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

Vue's reactivity system is built on proxies and tracks dependencies automatically. The key tools you will use are:

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

const mockMessageResponses = [
  'That\'s a great question! Let me help you understand this concept better. The key thing to remember is that proper implementation requires careful consideration of the underlying principles and best practices in the field.',
  'I\'d be happy to explain this topic in detail. From my understanding, there are several important factors to consider when approaching this problem. Let me break it down step by step for you.',
  'This is an interesting topic that comes up frequently. The solution typically involves understanding the core concepts and applying them in the right context. Here\'s what I recommend...',
  'Great choice of topic! This is something that many developers encounter. The approach I\'d suggest is to start with the fundamentals and then build up to more complex scenarios.',
  'That\'s definitely worth exploring. From what I can see, the best way to handle this is to consider both the theoretical aspects and practical implementation details.',
]

const model = ref<string>(models[0].id)
const modelSelectorOpen = ref(false)
const text = ref<string>('')
const useWebSearch = ref<boolean>(false)
const useMicrophone = ref<boolean>(false)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
const messages = ref<MessageType[]>([])
const streamingMessageId = ref<string | null>(null)

const selectedModelData = computed(() => models.find(m => m.id === model.value))

const timers: (number | NodeJS.Timeout)[] = []

async function streamReasoning(messageKey: string, versionId: string, reasoningContent: string) {
  const words = reasoningContent.split(' ')
  let currentContent = ''

  for (let i = 0; i < words.length; i++) {
    currentContent += (i > 0 ? ' ' : '') + words[i]

    const msg = messages.value.find(m => m.key === messageKey)
    if (msg && msg.reasoning) {
      msg.reasoning.content = currentContent
    }

    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 30 + 20),
    )
  }

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

async function streamMessageResponse(
  messageKey: string,
  versionId: string,
  content: string,
  reasoning?: { content: string, duration: number },
) {
  status.value = 'streaming'
  streamingMessageId.value = versionId

  // First stream the reasoning if it exists
  if (reasoning) {
    await streamReasoning(messageKey, versionId, reasoning.content)
    await new Promise(resolve => setTimeout(resolve, 500)) // Pause
  }

  // Then stream the content
  await streamContent(messageKey, versionId, content)

  status.value = 'ready'
  streamingMessageId.value = null
}

async function streamMessage(message: MessageType) {
  if (message.from === 'user') {
    messages.value = [...messages.value, message]
    return
  }

  const newMessage: MessageType = {
    ...message,
    versions: message.versions.map(v => ({ ...v, content: '' })),
    reasoning: message.reasoning ? { ...message.reasoning, content: '' } : undefined,
    isReasoningComplete: false,
    isContentComplete: false,
    isReasoningStreaming: !!message.reasoning,
  }

  messages.value = [...messages.value, newMessage]

  const firstVersion = message.versions[0]
  if (!firstVersion)
    return

  await streamMessageResponse(newMessage.key, firstVersion.id, firstVersion.content, message.reasoning)
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

  messages.value = [...messages.value, userMessage]

  const timer = setTimeout(() => {
    const assistantMessageKey = `assistant-${Date.now()}`
    const assistantMessageId = `version-${Date.now()}`
    const randomMessageResponse = mockMessageResponses[Math.floor(Math.random() * mockMessageResponses.length)]

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

    messages.value = [...messages.value, assistantMessage]
    streamMessageResponse(
      assistantMessageKey,
      assistantMessageId,
      randomMessageResponse,
      reasoning,
    )
  }, 500)
  timers.push(timer)
}

let timer: NodeJS.Timeout
onMounted(() => {
  messages.value = []

  const processMessages = async () => {
    for (let i = 0; i < mockMessages.length; i++) {
      await streamMessage(mockMessages[i])

      if (i < mockMessages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  timer = setTimeout(() => {
    processMessages()
  }, 100)
})

onBeforeUnmount(() => {
  // timers.forEach(t => clearTimeout(t))
  // messages.value = []
  clearTimeout(timer)
})

function handleSubmit(message: PromptInputMessage) {
  const hasText = !!message.text
  const hasAttachments = !!message.files?.length

  if (!hasText && !hasAttachments) {
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
</script>

<template>
  <div class="relative flex size-full flex-col divide-y overflow-hidden">
    <div class="h-[498px] overflow-y-scroll">
      <Conversation>
        <ConversationContent>
          <template
            v-for="message in messages"
            :key="message.key"
          >
            <MessageBranch :default-branch="0">
              <MessageBranchContent>
                <template
                  v-for="version in message.versions"
                  :key="`${message.key}-${version.id}`"
                >
                  <Message :from="message.from">
                    <div>
                      <Sources v-if="message.sources?.length">
                        <SourcesTrigger :count="message.sources.length" />
                        <SourcesContent>
                          <template
                            v-for="source in message.sources"
                            :key="source.href"
                          >
                            <Source
                              :href="source.href"
                              :title="source.title"
                            />
                          </template>
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
                          'group-[.is-user]:rounded-[24px] group-[.is-user]:rounded-br-sm group-[.is-user]:border group-[.is-user]:bg-background group-[.is-user]:text-foreground',
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
          placeholder="How can Grok help?"
        />
        <PromptInputFooter class="p-2.5">
          <PromptInputTools>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <PromptInputButton
                  class="rounded-full! border text-foreground"
                  variant="outline"
                >
                  <PaperclipIcon :size="16" />
                  <span class="sr-only">Attach</span>
                </PromptInputButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem @click="handleFileAction('upload-file')">
                  <FileIcon
                    class="mr-2"
                    :size="16"
                  />
                  Upload file
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('upload-photo')">
                  <ImageIcon
                    class="mr-2"
                    :size="16"
                  />
                  Upload photo
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('take-screenshot')">
                  <ScreenShareIcon
                    class="mr-2"
                    :size="16"
                  />
                  Take screenshot
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleFileAction('take-photo')">
                  <CameraIcon
                    class="mr-2"
                    :size="16"
                  />
                  Take photo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div class="flex items-center rounded-full border">
              <PromptInputButton
                class="rounded-l-full! text-foreground"
                variant="ghost"
                @click="useWebSearch = !useWebSearch"
              >
                <SearchIcon :size="16" />
                <span>DeepSearch</span>
              </PromptInputButton>
              <div class="h-full w-px bg-border" />
              <PromptInputButton
                class="rounded-r-full"
                size="icon-sm"
                variant="ghost"
              >
                <ChevronDownIcon :size="16" />
              </PromptInputButton>
            </div>
            <PromptInputButton
              class="rounded-full! text-foreground"
              variant="outline"
            >
              <LightbulbIcon :size="16" />
              <span>Think</span>
            </PromptInputButton>
          </PromptInputTools>
          <div class="flex items-center gap-2">
            <ModelSelector v-model:open="modelSelectorOpen">
              <ModelSelectorTrigger as-child>
                <PromptInputButton>
                  <ModelSelectorLogo
                    v-if="selectedModelData?.chefSlug"
                    :provider="selectedModelData.chefSlug"
                  />
                  <ModelSelectorName v-if="selectedModelData?.name">
                    {{ selectedModelData.name }}
                  </ModelSelectorName>
                </PromptInputButton>
              </ModelSelectorTrigger>
              <ModelSelectorContent>
                <ModelSelectorInput placeholder="Search models..." />
                <ModelSelectorList>
                  <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                  <ModelSelectorGroup heading="xAI">
                    <template
                      v-for="m in models"
                      :key="m.id"
                    >
                      <ModelSelectorItem
                        :value="m.id"
                        @select="() => { model = m.id; modelSelectorOpen = false; }"
                      >
                        <ModelSelectorLogo :provider="m.chefSlug" />
                        <ModelSelectorName>{{ m.name }}</ModelSelectorName>
                        <ModelSelectorLogoGroup>
                          <template
                            v-for="provider in m.providers"
                            :key="provider"
                          >
                            <ModelSelectorLogo :provider="provider" />
                          </template>
                        </ModelSelectorLogoGroup>
                        <CheckIcon
                          v-if="model === m.id"
                          class="ml-auto size-4"
                        />
                        <div
                          v-else
                          class="ml-auto size-4"
                        />
                      </ModelSelectorItem>
                    </template>
                  </ModelSelectorGroup>
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector>
            <PromptInputButton
              class="rounded-full bg-foreground font-medium text-background"
              variant="default"
              @click="useMicrophone = !useMicrophone"
            >
              <AudioWaveformIcon :size="16" />
              <span class="sr-only">Voice</span>
            </PromptInputButton>
          </div>
        </PromptInputFooter>
      </PromptInput>
    </div>
  </div>
</template>
