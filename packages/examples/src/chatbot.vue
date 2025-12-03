<script setup lang="ts">
import type { PromptInputMessage } from '@repo/elements/prompt-input'
import type { ChatStatus, ToolUIPart } from 'ai'
import { Conversation, ConversationContent, ConversationScrollButton } from '@repo/elements/conversation'
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
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@repo/elements/prompt-input'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@repo/elements/reasoning'
import { Source, Sources, SourcesContent, SourcesTrigger } from '@repo/elements/sources'
import { Suggestion, Suggestions } from '@repo/elements/suggestion'
import { CheckIcon, GlobeIcon, MicIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

interface MessageVersion {
  id: string
  content: string
}

interface MessageSource {
  href: string
  title: string
}

interface MessageReasoning {
  content: string
  duration: number
}

interface MessageTool {
  name: string
  description: string
  status: ToolUIPart['state']
  parameters: Record<string, unknown>
  result?: string
  error?: string
}

interface MessageType {
  key: string
  from: 'user' | 'assistant'
  sources?: MessageSource[]
  versions: MessageVersion[]
  reasoning?: MessageReasoning
  tools?: MessageTool[]
}

const initialMessages: MessageType[] = [
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content: 'Can you explain how to use the Vue 3 Composition API effectively?',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    sources: [
      {
        href: 'https://vuejs.org/guide/introduction.html',
        title: 'Vue 3 Documentation - Introduction',
      },
      {
        href: 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html',
        title: 'Vue 3 Reactivity Fundamentals',
      },
    ],
    tools: [
      {
        name: 'mcp',
        description: 'Searching Vue 3 documentation',
        status: 'input-available',
        parameters: {
          query: 'Vue 3 Composition API best practices',
          source: 'vuejs.org',
        },
        result: `{
  "query": "Vue 3 Composition API best practices",
  "results": [
    {
      "title": "Reactivity Fundamentals",
      "url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
      "snippet": "Vue's reactivity system is based on tracking reactive state and automatically updating the DOM when that state changes. The core primitives are ref() and reactive()."
    },
    {
      "title": "Composition API: setup()",
      "url": "https://vuejs.org/guide/essentials/composition-api-setup.html",
      "snippet": "The setup() hook is the entry point for using the Composition API in components. It runs before the component is created and is where you declare reactive state and logic."
    },
    {
      "title": "Reactivity Core API",
      "url": "https://vuejs.org/api/reactivity-core.html",
      "snippet": "The reactivity core APIs provide low-level building blocks like ref(), reactive(), computed(), and watch() for creating and working with reactive state."
    }
  ]
}`,
        error: undefined,
      },
    ],
    versions: [
      {
        id: nanoid(),
        content: `# Vue 3 Composition API Overview

The Vue 3 Composition API is a powerful way to organize component logic using plain functions and reactive primitives.

## Core Concepts

1. **setup()** is the entry point for using the Composition API in a component.
2. **ref()** creates a reactive reference for primitive values.
3. **reactive()** creates a deeply reactive object for structured state.
4. **computed()** derives values from other reactive state.
5. **watch() / watchEffect()** run side effects in response to reactive changes.

## Basic Example with ref() and computed()

\`\`\`ts
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return {
      count,
      doubled,
      increment,
    }
  },
}
\`\`\`

This component uses the Composition API to declare reactive state and derived values in a single place. Would you like me to dive deeper into a specific function like \`ref\` or \`reactive\`?`,
      },
    ],
  },
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content: 'Yes, could you explain ref and reactive in more detail in Vue 3? When should I use one over the other?',
      },
      {
        id: nanoid(),
        content: 'I\'m particularly interested in understanding the differences between ref() and reactive() in Vue 3. Could you break down when each is most appropriate?',
      },
      {
        id: nanoid(),
        content: 'Thanks for the overview! Could you dive deeper into the specific use cases where ref() and reactive() make the biggest difference in Vue 3 applications?',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    reasoning: {
      content: `The user is asking for a detailed explanation of ref() and reactive() in Vue 3. I should provide a clear and concise explanation of each API's purpose and how they differ.

The ref() API is typically used for primitive values and when you want an explicit .value access.

The reactive() API is typically used for objects and arrays when you want property access to be reactive.

Both are part of Vue's reactivity system, but they serve different ergonomics and use cases.`,
      duration: 10,
    },
    versions: [
      {
        id: nanoid(),
        content: `## ref() vs reactive() in Vue 3

Both APIs create reactive state, but they are optimized for different use cases:

### ref()

\`ref()\` is best for **primitive values** (numbers, strings, booleans) or when you want a single reactive value.

\`\`\`ts
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    return { count, increment }
  },
}
\`\`\`

- Access the value via \`.value\` in JavaScript.
- In templates, Vue automatically unwraps refs, so you can use \`{{ count }}\` directly.
- Useful when you need to pass a single reactive value around.

### reactive()

\`reactive()\` is best for **objects and arrays** where you want property access to be reactive.

\`\`\`ts
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      user: { name: 'Alice' },
    })

    function increment() {
      state.count++
    }

    return { state, increment }
  },
}
\`\`\`

- You work with properties directly: \`state.count++\`.
- When destructuring, you should use \`toRefs()\` or \`toRef()\` to preserve reactivity.

### When to use which?

- Use **ref()** when:
  - You have a single primitive value.
  - You want to expose a reactive value from a composable.
  - You need explicit \`.value\` semantics (e.g., for deeply nested or shared state).

- Use **reactive()** when:
  - You have a state object with multiple related fields.
  - You want a more \"state-like\" object API (e.g., \`state.count\`, \`state.user.name\`).

### Conclusion

In many real apps you'll mix both: use \`reactive()\` for grouped state and \`ref()\` for individual values that need to be passed around or derived.`,
      },
    ],
  },
]

const models = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure'],
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure'],
  },
  {
    id: 'claude-opus-4-20250514',
    name: 'Claude 4 Opus',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude 4 Sonnet',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock'],
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    chef: 'Google',
    chefSlug: 'google',
    providers: ['google'],
  },
]

const suggestions = [
  'Explain the Vue 3 Composition API with examples.',
  'What is the difference between ref() and reactive() in Vue 3?',
  'How does Vue\'s reactivity system work under the hood?',
  'Show me how to migrate an Options API component to the Composition API.',
  'How do computed properties work in Vue 3?',
  'When should I use watch() vs watchEffect() in Vue 3?',
  'How do I organize logic using composables in a large Vue 3 app?',
  'Explain the lifecycle of a Vue 3 component using setup().',
]

const mockResponses = [
  'That\'s a great question! Let me help you understand this concept better. The key thing to remember is that proper implementation requires careful consideration of the underlying principles and best practices in the field.',
  'I\'d be happy to explain this topic in detail. From my understanding, there are several important factors to consider when approaching this problem. Let me break it down step by step for you.',
  'This is an interesting topic that comes up frequently. The solution typically involves understanding the core concepts and applying them in the right context. Here\'s what I recommend...',
  'Great choice of topic! This is something that many developers encounter. The approach I\'d suggest is to start with the fundamentals and then build up to more complex scenarios.',
  'That\'s definitely worth exploring. From what I can see, the best way to handle this is to consider both the theoretical aspects and practical implementation details.',
]

const modelId = ref<string>(models[0].id)
const modelSelectorOpen = ref(false)
const useWebSearch = ref(false)
const useMicrophone = ref(false)
const status = ref<ChatStatus>('ready')
const messages = ref<MessageType[]>(cloneMessages(initialMessages))

const selectedModelData = computed(() => models.find(m => m.id === modelId.value))

function cloneMessages(data: MessageType[]): MessageType[] {
  return data.map(message => ({
    ...message,
    versions: message.versions.map(version => ({ ...version })),
    sources: message.sources ? message.sources.map(source => ({ ...source })) : undefined,
    reasoning: message.reasoning ? { ...message.reasoning } : undefined,
    tools: message.tools
      ? message.tools.map(tool => ({
          ...tool,
          parameters: { ...tool.parameters },
        }))
      : undefined,
  }))
}

function updateStreamingContent(versionId: string, content: string) {
  const target = messages.value.find(msg => msg.versions.some(version => version.id === versionId))
  if (!target)
    return
  const version = target.versions.find(v => v.id === versionId)
  if (!version)
    return
  version.content = content
  messages.value = [...messages.value]
}

async function streamResponse(versionId: string, content: string) {
  status.value = 'streaming'
  const words = content.split(' ')
  let currentContent = ''

  for (let i = 0; i < words.length; i += 1) {
    currentContent += (i > 0 ? ' ' : '') + words[i]
    updateStreamingContent(versionId, currentContent)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))
  }

  status.value = 'ready'
}

function addUserMessage(content: string) {
  const timestamp = Date.now()
  const userMessage: MessageType = {
    key: `user-${timestamp}`,
    from: 'user',
    versions: [
      {
        id: `user-${timestamp}`,
        content,
      },
    ],
  }

  messages.value = [...messages.value, userMessage]

  setTimeout(() => {
    const assistantVersionId = `assistant-${Date.now()}`
    const assistantMessage: MessageType = {
      key: `assistant-${Date.now()}`,
      from: 'assistant',
      versions: [
        {
          id: assistantVersionId,
          content: '',
        },
      ],
    }

    messages.value = [...messages.value, assistantMessage]
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    streamResponse(assistantVersionId, randomResponse)
  }, 500)
}

function handleSubmit(message: PromptInputMessage) {
  const text = message.text.trim()
  const hasText = text.length > 0
  const hasAttachments = message.files.length > 0

  if (!hasText && !hasAttachments)
    return

  status.value = 'submitted'

  addUserMessage(hasText ? text : 'Sent with attachments')
}

function handleSuggestionClick(suggestion: string) {
  status.value = 'submitted'
  addUserMessage(suggestion)
}

function handleModelSelect(id: string) {
  modelId.value = id
  modelSelectorOpen.value = false
}

function toggleMicrophone() {
  useMicrophone.value = !useMicrophone.value
}

function toggleWebSearch() {
  useWebSearch.value = !useWebSearch.value
}
</script>

<template>
  <div class="relative flex size-full flex-col divide-y overflow-hidden">
    <Conversation>
      <ConversationContent>
        <MessageBranch
          v-for="message in messages"
          :key="message.key"
          :default-branch="0"
        >
          <MessageBranchContent>
            <Message
              v-for="version in message.versions"
              :key="`${message.key}-${version.id}`"
              :from="message.from"
            >
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
                >
                  <ReasoningTrigger />
                  <ReasoningContent :content="message.reasoning.content" />
                </Reasoning>

                <MessageContent>
                  <MessageResponse :content="version.content" />
                </MessageContent>
              </div>
            </Message>
          </MessageBranchContent>

          <MessageBranchSelector
            v-if="message.versions.length > 1"
            :from="message.from"
          >
            <MessageBranchPrevious />
            <MessageBranchPage />
            <MessageBranchNext />
          </MessageBranchSelector>
        </MessageBranch>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <div class="grid shrink-0 gap-4 pt-4">
      <Suggestions class="px-4">
        <Suggestion
          v-for="suggestion in suggestions"
          :key="suggestion"
          :suggestion="suggestion"
          @click="handleSuggestionClick"
        />
      </Suggestions>

      <div class="w-full px-4 pb-4">
        <PromptInput
          class="w-full"
          multiple
          global-drop
          @submit="handleSubmit"
        >
          <PromptInputHeader>
            <PromptInputAttachments>
              <template #default="{ file }">
                <PromptInputAttachment :file="file" />
              </template>
            </PromptInputAttachments>
          </PromptInputHeader>

          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>

          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>

              <PromptInputButton
                :variant="useMicrophone ? 'default' : 'ghost'"
                @click="toggleMicrophone"
              >
                <MicIcon :size="16" />
                <span class="sr-only">Microphone</span>
              </PromptInputButton>

              <PromptInputButton
                :variant="useWebSearch ? 'default' : 'ghost'"
                @click="toggleWebSearch"
              >
                <GlobeIcon :size="16" />
                <span>Search</span>
              </PromptInputButton>

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

                    <ModelSelectorGroup
                      v-for="chef in ['OpenAI', 'Anthropic', 'Google']"
                      :key="chef"
                      :heading="chef"
                    >
                      <ModelSelectorItem
                        v-for="m in models.filter(model => model.chef === chef)"
                        :key="m.id"
                        :value="m.id"
                        @select="() => handleModelSelect(m.id)"
                      >
                        <ModelSelectorLogo :provider="m.chefSlug" />
                        <ModelSelectorName>{{ m.name }}</ModelSelectorName>
                        <ModelSelectorLogoGroup>
                          <ModelSelectorLogo
                            v-for="provider in m.providers"
                            :key="provider"
                            :provider="provider"
                          />
                        </ModelSelectorLogoGroup>
                        <CheckIcon
                          v-if="modelId === m.id"
                          class="ml-auto size-4"
                        />
                        <div v-else class="ml-auto size-4" />
                      </ModelSelectorItem>
                    </ModelSelectorGroup>
                  </ModelSelectorList>
                </ModelSelectorContent>
              </ModelSelector>
            </PromptInputTools>

            <PromptInputSubmit
              :disabled="status === 'streaming'"
              :status="status"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  </div>
</template>
