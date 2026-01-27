<script setup lang="ts">
import type { PromptInputMessage } from '@repo/elements/prompt-input'
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
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputCommand,
  PromptInputCommandEmpty,
  PromptInputCommandGroup,
  PromptInputCommandInput,
  PromptInputCommandItem,
  PromptInputCommandList,
  PromptInputCommandSeparator,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputHoverCard,
  PromptInputHoverCardContent,
  PromptInputHoverCardTrigger,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTab,
  PromptInputTabBody,
  PromptInputTabItem,
  PromptInputTabLabel,
  PromptInputTextarea,
  PromptInputTools,
} from '@repo/elements/prompt-input'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  AtSignIcon,
  CheckIcon,
  FilesIcon,
  GlobeIcon,
  ImageIcon,
  RulerIcon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'

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

const SUBMITTING_TIMEOUT = 200
const STREAMING_TIMEOUT = 2000

const sampleFiles = {
  activeTabs: [{ path: 'prompt-input.tsx', location: 'packages/elements/src' }],
  recents: [
    { path: 'queue.tsx', location: 'apps/test/app/examples' },
    { path: 'queue.tsx', location: 'packages/elements/src' },
  ],
  added: [
    { path: 'prompt-input.tsx', location: 'packages/elements/src' },
    { path: 'queue.tsx', location: 'apps/test/app/examples' },
    { path: 'queue.tsx', location: 'packages/elements/src' },
  ],
  filesAndFolders: [
    { path: 'prompt-input.tsx', location: 'packages/elements/src' },
    { path: 'queue.tsx', location: 'apps/test/app/examples' },
  ],
  code: [{ path: 'prompt-input.tsx', location: 'packages/elements/src' }],
  docs: [{ path: 'README.md', location: 'packages/elements' }],
}

const sampleTabs = {
  active: [{ path: 'packages/elements/src/task-queue-panel.tsx' }],
  recents: [
    { path: 'apps/test/app/examples/task-queue-panel.tsx' },
    { path: 'apps/test/app/page.tsx' },
    { path: 'packages/elements/src/task.tsx' },
    { path: 'apps/test/app/examples/prompt-input.tsx' },
    { path: 'packages/elements/src/queue.tsx' },
    { path: 'apps/test/app/examples/queue.tsx' },
  ],
}

const model = ref<string>(models[0].id)
const modelSelectorOpen = ref(false)
const status = ref<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const selectedModelData = computed(() => models.find(m => m.id === model.value))

function handleSubmit(message: PromptInputMessage) {
  const hasText = !!message.text
  const hasAttachments = !!message.files?.length

  if (!hasText && !hasAttachments) {
    return
  }

  status.value = 'submitted'

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
  <div class="flex size-full flex-col justify-end">
    <PromptInputProvider @submit="handleSubmit">
      <PromptInput
        global-drop
        multiple
      >
        <PromptInputHeader>
          <PromptInputHoverCard>
            <PromptInputHoverCardTrigger>
              <PromptInputButton
                class="!h-8"
                size="icon-sm"
                variant="outline"
              >
                <AtSignIcon
                  class="text-muted-foreground"
                  :size="12"
                />
              </PromptInputButton>
            </PromptInputHoverCardTrigger>
            <PromptInputHoverCardContent class="w-[400px] p-0">
              <PromptInputCommand>
                <PromptInputCommandInput
                  class="border-none focus-visible:ring-0"
                  placeholder="Add files, folders, docs..."
                />
                <PromptInputCommandList>
                  <PromptInputCommandEmpty class="p-3 text-muted-foreground text-sm">
                    No results found.
                  </PromptInputCommandEmpty>
                  <PromptInputCommandGroup heading="Added">
                    <PromptInputCommandItem value="active-tabs">
                      <GlobeIcon />
                      <span>Active Tabs</span>
                      <span class="ml-auto text-muted-foreground">✓</span>
                    </PromptInputCommandItem>
                  </PromptInputCommandGroup>
                  <PromptInputCommandSeparator />
                  <PromptInputCommandGroup heading="Other Files">
                    <PromptInputCommandItem
                      v-for="(file, index) in sampleFiles.added"
                      :key="`${file.path}-${index}`"
                      :value="file.path"
                    >
                      <GlobeIcon class="text-primary" />
                      <div class="flex flex-col">
                        <span class="font-medium text-sm">
                          {{ file.path }}
                        </span>
                        <span class="text-muted-foreground text-xs">
                          {{ file.location }}
                        </span>
                      </div>
                    </PromptInputCommandItem>
                  </PromptInputCommandGroup>
                </PromptInputCommandList>
              </PromptInputCommand>
            </PromptInputHoverCardContent>
          </PromptInputHoverCard>
          <PromptInputHoverCard>
            <PromptInputHoverCardTrigger>
              <PromptInputButton
                size="sm"
                variant="outline"
              >
                <RulerIcon
                  class="text-muted-foreground"
                  :size="12"
                />
                <span>1</span>
              </PromptInputButton>
            </PromptInputHoverCardTrigger>
            <PromptInputHoverCardContent class="divide-y overflow-hidden p-0">
              <div class="space-y-2 p-3">
                <p class="font-medium text-muted-foreground text-sm">
                  Attached Project Rules
                </p>
                <p class="ml-4 text-muted-foreground text-sm">
                  Always Apply:
                </p>
                <p class="ml-8 text-sm">
                  ultracite.mdc
                </p>
              </div>
              <p class="bg-sidebar px-4 py-3 text-muted-foreground text-sm">
                Click to manage
              </p>
            </PromptInputHoverCardContent>
          </PromptInputHoverCard>
          <PromptInputHoverCard>
            <PromptInputHoverCardTrigger>
              <PromptInputButton
                size="sm"
                variant="outline"
              >
                <FilesIcon
                  class="text-muted-foreground"
                  :size="12"
                />
                <span>1 Tab</span>
              </PromptInputButton>
            </PromptInputHoverCardTrigger>
            <PromptInputHoverCardContent class="w-[300px] space-y-4 px-0 py-3">
              <PromptInputTab>
                <PromptInputTabLabel>Active Tabs</PromptInputTabLabel>
                <PromptInputTabBody>
                  <PromptInputTabItem
                    v-for="tab in sampleTabs.active"
                    :key="tab.path"
                  >
                    <GlobeIcon
                      class="text-primary"
                      :size="16"
                    />
                    <span
                      class="truncate"
                      dir="rtl"
                    >
                      {{ tab.path }}
                    </span>
                  </PromptInputTabItem>
                </PromptInputTabBody>
              </PromptInputTab>
              <PromptInputTab>
                <PromptInputTabLabel>Recents</PromptInputTabLabel>
                <PromptInputTabBody>
                  <PromptInputTabItem
                    v-for="tab in sampleTabs.recents"
                    :key="tab.path"
                  >
                    <GlobeIcon
                      class="text-primary"
                      :size="16"
                    />
                    <span
                      class="truncate"
                      dir="rtl"
                    >
                      {{ tab.path }}
                    </span>
                  </PromptInputTabItem>
                </PromptInputTabBody>
              </PromptInputTab>
              <div class="border-t px-3 pt-2 text-muted-foreground text-xs">
                Only file paths are included
              </div>
            </PromptInputHoverCardContent>
          </PromptInputHoverCard>
          <PromptInputAttachments>
            <template #default="{ file }">
              <PromptInputAttachment :file="file" />
            </template>
          </PromptInputAttachments>
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea
            ref="textareaRef"
            placeholder="Plan, search, build anything"
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
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
                      v-for="m in models.filter(item => item.chef === chef)"
                      :key="m.id"
                      :value="m.id"
                      @select="() => {
                        model = m.id;
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
                      <CheckIcon
                        v-if="model === m.id"
                        class="ml-auto size-4"
                      />
                      <div
                        v-else
                        class="ml-auto size-4"
                      />
                    </ModelSelectorItem>
                  </ModelSelectorGroup>
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector>
          </PromptInputTools>
          <div class="flex items-center gap-2">
            <Button
              size="icon-sm"
              variant="ghost"
            >
              <ImageIcon
                class="text-muted-foreground"
                :size="16"
              />
            </Button>
            <PromptInputSubmit
              class="!h-8"
              :status="status"
            />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  </div>
</template>
