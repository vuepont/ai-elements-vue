---
title: Chatbot
description: An example of how to use the AI Elements to build a chatbot.
icon: lucide:message-circle
---

An example of how to use the AI Elements to build a chatbot.

:::ComponentLoader{label="Chatbot" componentName="Chatbot"}
:::

## Tutorial

Let's walk through how to build a chatbot using AI Elements Vue and AI SDK. Our example will include reasoning, web search with citations, and a model picker.

::steps
  ### Setup

  First, set up a new Nuxt.js repo by running the following command:

  ```sh
  pnpm create nuxt@latest ai-chatbot
  ```

  Navigate to the newly created directory:

  ```sh
  cd ai-chatbot
  ```

  Make sure to complete the project setup according to the guide below.

  ::alert{type="info" icon="lucide:book"}
    Follow this [guide](https://www.shadcn-vue.com/docs/installation/nuxt) to setup **shadcn-vue**, **Nuxt module** and **Tailwind**.
  ::

  Run the following command to install AI Elements:

  :pm-x{command="ai-elements-vue@latest"}

  Now, install the AI SDK dependencies:

  :pm-install{name="ai @ai-sdk/vue zod"}

  ### Configure Shadcn Module

  To ensure that AI Elements components are properly registered and avoid console warnings from Nuxt's auto-import feature, you need to modify your `nuxt.config.ts` to add the AI Elements directory to the shadcn module configuration.

  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    // ...
    modules: ['shadcn-nuxt'],
    shadcn: {
      /**
       * Prefix for all the imported component.
       * @default "Ui"
       */
      prefix: '',
      /**
       * Directory that the component lives in.
       * Will respect the Nuxt aliases.
       * @link https://nuxt.com/docs/api/nuxt-config#alias
       * @default "@/components/ui"
       */
      componentDir: '@/components/ui', // [!code --]
      componentDir: [ // [!code ++]
        '@/components/ui', // [!code ++]
        // AI elements // [!code ++]
        { // [!code ++]
          path: '@/components/ai-elements', // [!code ++]
          prefix: '', // [!code ++]
        }, // [!code ++]
      ], // [!code ++]
    }
  })
  ```

  ### Configure Vercel AI Gateway API key

  Create a `.env` file in your project root and add your [Vercel AI Gateway](https://vercel.com/ai-gateway) API Key.
  This key is used to authenticate your application with the Vercel AI Gateway service.

  ```sh
  touch .env
  ```

  Edit the `.env` file:

  ```env [.env]
  NUXT_AI_GATEWAY_API_KEY=xxxxxxxxx
  ```

  Replace `xxxxxxxxx` with your actual Vercel AI Gateway API key and configure the environment variable in `nuxt.config.ts`:

  ```ts [nuxt.config.ts]
  import process from 'node:process'

  export default defineNuxtConfig({
    // rest of your nuxt config
    runtimeConfig: {
      aiGatewayApiKey: process.env.NUXT_AI_GATEWAY_API_KEY,
    },
  })
  ```

  We're now ready to start building our app!

  ### Create an API route

  Create an API route, `server/api/chat.ts` and add the following code.
  We're using `perplexity/sonar` for web search because by default the model returns search results.
  We also pass `sendSources` and `sendReasoning` to `toUIMessageStreamResponse` in order to receive as parts on the frontend.
  The handler now also accepts file attachments from the client.

  ```ts [server/api/chat.ts] height=360 collapse
  import type { UIMessage } from 'ai'
  import { convertToModelMessages, createGateway, streamText } from 'ai'
  import { createError, readBody } from 'h3'

  export const maxDuration = 30

  const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant that can answer questions and help with tasks'
  const DEFAULT_MODEL = 'openai/gpt-4o'

  interface ChatRequestBody {
    messages: UIMessage[]
    model?: string
    webSearch?: boolean
  }

  export default defineLazyEventHandler(async () => {
    const apiKey = useRuntimeConfig().aiGatewayApiKey

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Missing AI Gateway API key',
      })
    }

    const gateway = createGateway({
      apiKey,
    })

    return defineEventHandler(async (event) => {
      const { messages, model, webSearch = false } = await readBody<ChatRequestBody>(event)

      if (!Array.isArray(messages) || messages.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing messages payload',
        })
      }

      const selectedModel = webSearch ? 'perplexity/sonar' : (model || DEFAULT_MODEL)

      const result = streamText({
        model: gateway(selectedModel),
        messages: convertToModelMessages(messages),
        system: DEFAULT_SYSTEM_PROMPT,
      })

      return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true,
      })
    })
  })
  ```

  ### Wire up the UI

  In your `app/app.vue`, replace the code with the file below.

  ```vue [app/app.vue]
  <template>
    <div class="min-h-screen bg-background">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </template>
  ```

  Create a new page, `pages/index.vue`, and add the code below.

  Here, we use the `PromptInput` component with its compound components to build a rich input experience with file attachments, model picker, and action menu.
  The input component uses the new `PromptInputMessage` type for handling both text and file attachments.

  The whole chat lives in a `Conversation`. We switch on `message.parts` and render the respective part within `Message`, `Reasoning`, and `Sources`.
  We also use `status` from `useChat` to stream reasoning tokens, as well as render `Loader`.

  ```vue [pages/index.vue] height=360 collapse
  <script setup lang="ts">
  import type { ChatStatus, SourceUrlUIPart, UIMessage } from 'ai'
  import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
  import { Chat } from '@ai-sdk/vue'
  import { CopyIcon, GlobeIcon, RefreshCcwIcon } from 'lucide-vue-next'
  import { computed, ref } from 'vue'
  import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation'
  import { Loader } from '@/components/ai-elements/loader'
  import { Message, MessageAction, MessageActions, MessageContent, MessageResponse } from '@/components/ai-elements/message'
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
    PromptInputSelect,
    PromptInputSelectContent,
    PromptInputSelectItem,
    PromptInputSelectTrigger,
    PromptInputSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
    usePromptInputProvider,
  } from '@/components/ai-elements/prompt-input'
  import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
  import { Source, Sources, SourcesContent, SourcesTrigger } from '@/components/ai-elements/sources'

  const models = [
    { name: 'GPT 4o', value: 'openai/gpt-4o' },
    { name: 'Deepseek R1', value: 'deepseek/deepseek-r1' },
  ] as const

  const chat = new Chat({})
  const model = ref(models[0].value)
  const webSearch = ref(false)

  const status = computed<ChatStatus>(() => chat.status)
  const messages = computed(() => chat.messages)
  const lastMessageId = computed(() => messages.value.at(-1)?.id ?? null)
  const lastAssistantMessageId = computed(() => {
    for (let index = messages.value.length - 1; index >= 0; index -= 1) {
      const current = messages.value[index]
      if (current && current.role === 'assistant')
        return current.id
    }
    return null
  })

  async function handleSubmit(message: PromptInputMessage) {
    const hasText = Boolean(message.text?.trim())
    const hasAttachments = Boolean(message.files?.length)

    if (!hasText && !hasAttachments)
      return

    try {
      await chat.sendMessage(
        {
          text: hasText ? message.text : 'Sent with attachments',
          files: hasAttachments ? message.files : undefined,
        },
        {
          body: {
            model: model.value,
            webSearch: webSearch.value,
          },
        },
      )
    }
    catch (error) {
      console.error('Failed to send message', error)
    }
  }

  function handlePromptError(error: { code: string, message: string }) {
    console.error(`Input error (${error.code})`, error.message)
  }

  const promptInput = usePromptInputProvider({
    onSubmit: handleSubmit,
    onError: handlePromptError,
  })

  const hasPendingInput = computed(() => {
    return Boolean(promptInput.textInput.value.trim()) || promptInput.files.value.length > 0
  })

  const submitDisabled = computed(() => !hasPendingInput.value && !status.value)

  function getSourceUrlParts(message: UIMessage) {
    return message.parts.filter((part): part is SourceUrlUIPart => part.type === 'source-url')
  }

  function shouldShowActions(message: UIMessage, partIndex: number) {
    if (message.role !== 'assistant')
      return false
    if (lastAssistantMessageId.value !== message.id)
      return false
    return isLastTextPart(message, partIndex)
  }

  function isLastTextPart(message: UIMessage, partIndex: number) {
    for (let index = partIndex + 1; index < message.parts.length; index += 1) {
      const nextPart = message.parts[index]
      if (nextPart && nextPart.type === 'text')
        return false
    }
    return true
  }

  function isReasoningStreaming(message: UIMessage, partIndex: number) {
    return status.value === 'streaming'
      && message.id === lastMessageId.value
      && partIndex === message.parts.length - 1
  }

  function toggleWebSearch() {
    webSearch.value = !webSearch.value
  }

  async function copyToClipboard(text: string) {
    if (!text)
      return

    if (typeof navigator === 'undefined' || !navigator.clipboard)
      return

    try {
      await navigator.clipboard.writeText(text)
    }
    catch (error) {
      console.error('Failed to copy to clipboard', error)
    }
  }

  function handleRegenerate() {
    chat.regenerate({
      body: {
        model: model.value,
        webSearch: webSearch.value,
      },
    })
  }
  </script>

  <template>
    <div class="relative mx-auto size-full h-screen max-w-4xl p-6">
      <div class="flex h-full flex-col">
        <Conversation class="h-full">
          <ConversationContent>
            <div
              v-for="message in messages"
              :key="message.id"
            >
              <Sources
                v-if="message.role === 'assistant' && getSourceUrlParts(message).length > 0"
              >
                <SourcesTrigger :count="getSourceUrlParts(message).length" />
                <SourcesContent
                  v-for="(source, index) in getSourceUrlParts(message)"
                  :key="`${message.id}-source-${index}`"
                >
                  <Source
                    :href="source.url"
                    :title="source.title ?? source.url"
                  />
                </SourcesContent>
              </Sources>

              <template
                v-for="(part, partIndex) in message.parts"
                :key="`${message.id}-${partIndex}`"
              >
                <Message
                  v-if="part.type === 'text'"
                  :from="message.role"
                >
                  <div>
                    <MessageContent>
                      <MessageResponse :content="part.text" />
                    </MessageContent>

                    <MessageActions v-if="shouldShowActions(message, partIndex)">
                      <MessageAction
                        label="Retry"
                        @click="handleRegenerate"
                      >
                        <RefreshCcwIcon class="size-3" />
                      </MessageAction>
                      <MessageAction
                        label="Copy"
                        @click="copyToClipboard(part.text)"
                      >
                        <CopyIcon class="size-3" />
                      </MessageAction>
                    </MessageActions>
                  </div>
                </Message>

                <Reasoning
                  v-else-if="part.type === 'reasoning'"
                  class="w-full"
                  :is-streaming="isReasoningStreaming(message, partIndex)"
                >
                  <ReasoningTrigger />
                  <ReasoningContent :content="part.text" />
                </Reasoning>
              </template>
            </div>

            <Loader v-if="status === 'submitted'" class="mx-auto" />
          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>

        <PromptInput class="mt-4" global-drop multiple>
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
                :variant="webSearch ? 'default' : 'ghost'"
                @click="toggleWebSearch"
              >
                <GlobeIcon class="size-4" />
                <span>Search</span>
              </PromptInputButton>

              <PromptInputSelect v-model="model">
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  <PromptInputSelectItem
                    v-for="item in models"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </PromptInputSelectItem>
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>

            <PromptInputSubmit
              :disabled="submitDisabled"
              :status="status"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  </template>
  ```

  ### Running Your Application

  With that, you have built everything you need for your chatbot! To start your application, use the command:

  ```sh
  pnpm run dev
  ```
  Head to your browser and open http://localhost:3000.
  You should see an input field. Test it out by entering a message and see the AI chatbot respond in real-time!

  You now have a working chatbot app with file attachment support! The chatbot can handle both text and file inputs through the action menu.
  Feel free to explore other components like [Tool](/components/chatbot/tool) or [Task](/components/chatbot/task) to extend your app, or view the other examples.
::
