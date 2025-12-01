<script setup lang="ts">
import type { PromptInputMessage } from '@repo/elements/prompt-input/'
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
  PromptInputProvider,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@repo/elements/prompt-input'

import { CheckIcon, GlobeIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import HeaderControls from './prompt-input-header-controls.vue'

const SUBMITTING_TIMEOUT = 200
const STREAMING_TIMEOUT = 2000

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

const modelId = ref<string>(models[0].id)
const modelSelectorOpen = ref(false)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
const selectedModelData = computed(() => models.find(m => m.id === modelId.value))

function handleSubmit(message: PromptInputMessage) {
  const hasText = !!message.text
  const hasAttachments = message.files?.length > 0

  if (!hasText && !hasAttachments) {
    return
  }

  status.value = 'submitted'

  // eslint-disable-next-line no-console
  console.log('Submitting message:', message)

  setTimeout(() => {
    status.value = 'streaming'
  }, SUBMITTING_TIMEOUT)

  setTimeout(() => {
    status.value = 'ready'
  }, STREAMING_TIMEOUT)
}
</script>

<template>
  <div class="size-full">
    <PromptInputProvider
      @submit="handleSubmit"
    >
      <PromptInput
        multiple
        global-drop class="w-full"
      >
        <PromptInputAttachments>
          <template #default="{ file }">
            <PromptInputAttachment :file="file" />
          </template>
        </PromptInputAttachments>

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

            <PromptInputSpeechButton />

            <PromptInputButton>
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
                      v-for="m in models.filter((item) => item.chef === chef)"
                      :key="m.id"
                      :value="m.id"
                      @select="() => {
                        modelId = m.id;
                        modelSelectorOpen = false;
                      }"
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

                      <CheckIcon v-if="modelId === m.id" class="ml-auto size-4" />
                      <div v-else class="ml-auto size-4" />
                    </ModelSelectorItem>
                  </ModelSelectorGroup>
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector>
          </PromptInputTools>

          <PromptInputSubmit :status="status" />
        </PromptInputFooter>
      </PromptInput>

      <HeaderControls />
    </PromptInputProvider>
  </div>
</template>
