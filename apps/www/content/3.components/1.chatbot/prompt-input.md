---
title: Prompt Input
description: Allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.
icon: lucide:corner-down-left
---

The `PromptInput` component allows a user to send a message to a large language model. It includes a textarea, a submit button, and a dropdown for selecting the model.

:::ComponentLoader{label="Preview" componentName="PromptInput"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add prompt-input
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/prompt-input.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [PromptInputProvider.vue] height=300 collapse
<script setup lang="ts">
import type { PromptInputMessage } from './types'
import { usePromptInputProvider } from './context'

const props = defineProps<{
  initialInput?: string
  maxFiles?: number
  maxFileSize?: number
  accept?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: PromptInputMessage): void
  (e: 'error', payload: { code: string, message: string }): void
}>()

usePromptInputProvider({
  initialInput: props.initialInput,
  maxFiles: props.maxFiles,
  maxFileSize: props.maxFileSize,
  accept: props.accept,
  onSubmit: msg => emit('submit', msg),
  onError: err => emit('error', err),
})
</script>

<template>
  <slot />
</template>
```

```vue [PromptInput.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PromptInputMessage } from './types'
import { InputGroup } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { usePromptInputProvider } from './context'
import { PROMPT_INPUT_KEY } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
  accept?: string
  multiple?: boolean
  globalDrop?: boolean
  maxFiles?: number
  maxFileSize?: number
  initialInput?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: PromptInputMessage): void
  (e: 'error', payload: { code: string, message: string }): void
}>()

const formRef = ref<HTMLFormElement | null>(null)

// --- Dual-mode context handling ---
const inheritedContext = inject(PROMPT_INPUT_KEY, null)
const localContext = inheritedContext
  ? null
  : usePromptInputProvider({
      initialInput: props.initialInput,
      maxFiles: props.maxFiles,
      maxFileSize: props.maxFileSize,
      accept: props.accept,
      onSubmit: msg => emit('submit', msg as any),
      onError: err => emit('error', err),
    })

const context = inheritedContext || localContext

if (!context) {
  throw new Error('PromptInput context is missing.')
}

const { fileInputRef, addFiles, submitForm } = context

function handleDragOver(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) {
    e.preventDefault()
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) {
    e.preventDefault()
  }
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    addFiles(e.dataTransfer.files)
  }
}

onMounted(() => {
  if (props.globalDrop) {
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)
  }
})

onUnmounted(() => {
  if (props.globalDrop) {
    document.removeEventListener('dragover', handleDragOver)
    document.removeEventListener('drop', handleDrop)
  }
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) {
    addFiles(input.files)
  }
  input.value = ''
}

function onSubmit(e: Event) {
  e.preventDefault()
  submitForm()
}
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    >
    <form
      ref="formRef"
      :class="cn('w-full', props.class)"
      @submit="onSubmit"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
    >
      <InputGroup class="overflow-hidden">
        <slot />
      </InputGroup>
    </form>
  </div>
</template>
```

```vue [PromptInputTextarea.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupTextarea } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref } from 'vue'
import { usePromptInput } from './context'

type PromptInputTextareaProps = InstanceType<typeof InputGroupTextarea>['$props']

interface Props extends /* @vue-ignore */ PromptInputTextareaProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { textInput, setTextInput, submitForm, addFiles, files, removeFile } = usePromptInput()
const isComposing = ref(false)

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if (isComposing.value || e.shiftKey)
      return
    e.preventDefault()
    submitForm()
  }

  // Remove last attachment on backspace if input is empty
  if (e.key === 'Backspace' && textInput.value === '' && files.value.length > 0) {
    const lastFile = files.value[files.value.length - 1]
    if (lastFile) {
      removeFile(lastFile.id)
    }
  }
}

function handlePaste(e: ClipboardEvent) {
  const items = e.clipboardData?.items
  if (!items)
    return

  const pastedFiles: File[] = []
  for (const item of Array.from(items)) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file)
        pastedFiles.push(file)
    }
  }

  if (pastedFiles.length > 0) {
    e.preventDefault()
    addFiles(pastedFiles)
  }
}

const modelValue = computed({
  get: () => textInput.value,
  set: val => setTextInput(val),
})
</script>

<template>
  <InputGroupTextarea
    v-model="modelValue"
    placeholder="What would you like to know?"
    name="message"
    :class="cn('field-sizing-content max-h-48 min-h-16', props.class)"
    v-bind="props"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    @compositionstart="isComposing = true"
    @compositionend="isComposing = false"
  />
</template>
```

```vue [PromptInputTools.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('flex items-center gap-1', props.class)">
    <slot />
  </div>
</template>
```

```vue [PromptInputButton.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useSlots } from 'vue'

type InputGroupButtonProps = InstanceType<typeof InputGroupButton>['$props']

interface Props extends /* @vue-ignore */ InputGroupButtonProps {
  class?: HTMLAttributes['class']
  variant?: InputGroupButtonProps['variant']
  size?: InputGroupButtonProps['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
})

const slots = useSlots()

const computedSize = computed(() => {
  if (props.size)
    return props.size

  const slotNodes = slots.default?.()

  if (!slotNodes)
    return 'icon-sm'

  const validChildren = slotNodes.filter((node) => {
    if (node.type === Comment)
      return false
    if (node.type === Text && !node.children?.toString().trim())
      return false
    return true
  })

  return validChildren.length > 1 ? 'sm' : 'icon-sm'
})

const { size, variant, class: _, ...restProps } = props
</script>

<template>
  <InputGroupButton
    type="button"
    :size="computedSize"
    :class="cn($props.class)"
    :variant="variant"
    v-bind="restProps"
  >
    <slot />
  </InputGroupButton>
</template>
```

```vue [PromptInputSubmit.vue] height=300 collapse
<script setup lang="ts">
import type { ChatStatus } from 'ai'
import type { HTMLAttributes } from 'vue'
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CornerDownLeftIcon, Loader2Icon, SquareIcon, XIcon } from 'lucide-vue-next'
import { computed } from 'vue'

type InputGroupButtonProps = InstanceType<typeof InputGroupButton>['$props']

interface Props extends /* @vue-ignore */ InputGroupButtonProps {
  class?: HTMLAttributes['class']
  status?: ChatStatus
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'icon-sm',
})

const icon = computed(() => {
  if (props.status === 'submitted') {
    return Loader2Icon
  }
  else if (props.status === 'streaming') {
    return SquareIcon
  }
  else if (props.status === 'error') {
    return XIcon
  }
  return CornerDownLeftIcon
})

const iconClass = computed(() => {
  if (props.status === 'submitted') {
    return 'size-4 animate-spin'
  }
  return 'size-4'
})

const { status, size, variant, class: _, ...restProps } = props
</script>

<template>
  <InputGroupButton
    aria-label="Submit"
    :class="cn(props.class)"
    :size="size"
    :variant="variant"
    type="submit"
    v-bind="restProps"
  >
    <slot>
      <component :is="icon" :class="iconClass" />
    </slot>
  </InputGroupButton>
</template>
```

```vue [PromptInputBody.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('contents', props.class)" v-bind="props">
    <slot />
  </div>
</template>
```

```vue [PromptInputAttachments.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { usePromptInput } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { files } = usePromptInput()
</script>

<template>
  <div
    v-if="files.length > 0"
    :class="cn('flex flex-wrap items-center gap-2 p-3 w-full', props.class)"
  >
    <template v-for="file in files" :key="file.id">
      <slot :file="file" />
    </template>
  </div>
</template>
```

```vue [PromptInputAttachment.vue] height=300 collapse
<script setup lang="ts">
import type { AttachmentFile } from './types'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@repo/shadcn-vue/components/ui/hover-card'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PaperclipIcon, XIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { usePromptInput } from './context'

const props = defineProps<{
  file: AttachmentFile
  class?: string
}>()

const { removeFile } = usePromptInput()

const filename = computed(() => props.file.filename || '')
const isImage = computed(() =>
  props.file.mediaType?.startsWith('image/') && props.file.url,
)
const label = computed(() => filename.value || (isImage.value ? 'Image' : 'Attachment'))

function handleRemove(e: Event) {
  e.stopPropagation()
  removeFile(props.file.id)
}
</script>

<template>
  <HoverCard :open-delay="0" :close-delay="0">
    <HoverCardTrigger as-child>
      <div
        :class="cn(
          'group relative flex h-8 cursor-pointer select-none items-center gap-1.5 rounded-md border border-border px-1.5 font-medium text-sm transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          props.class,
        )"
      >
        <div class="relative size-5 shrink-0">
          <div class="absolute inset-0 flex size-5 items-center justify-center overflow-hidden rounded bg-background transition-opacity group-hover:opacity-0">
            <img
              v-if="isImage"
              :src="file.url"
              :alt="label"
              class="size-5 object-cover"
            >
            <div v-else class="flex size-5 items-center justify-center text-muted-foreground">
              <PaperclipIcon class="size-3" />
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="absolute inset-0 size-5 cursor-pointer rounded p-0 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 [&>svg]:size-2.5"
            @click="handleRemove"
          >
            <XIcon />
            <span class="sr-only">Remove</span>
          </Button>
        </div>

        <span class="flex-1 truncate max-w-[150px]">{{ label }}</span>
      </div>
    </HoverCardTrigger>

    <HoverCardContent class="w-auto p-2" align="start">
      <div class="w-auto space-y-3">
        <div v-if="isImage" class="flex max-h-96 w-96 items-center justify-center overflow-hidden rounded-md border">
          <img
            :src="file.url"
            :alt="label"
            class="max-h-full max-w-full object-contain"
          >
        </div>
        <div class="flex items-center gap-2.5">
          <div class="min-w-0 flex-1 space-y-1 px-0.5">
            <h4 class="truncate font-semibold text-sm leading-none">
              {{ label }}
            </h4>
            <p v-if="file.mediaType" class="truncate font-mono text-muted-foreground text-xs">
              {{ file.mediaType }}
            </p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
```

```vue [PromptInputHeader.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupAddon } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputHeaderProps = InstanceType<typeof InputGroupAddon>['$props']

interface Props extends /* @vue-ignore */ Omit<PromptInputHeaderProps, 'align'> {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <InputGroupAddon
    align="block-end"
    :class="cn('order-first flex-wrap gap-1', props.class)"
    v-bind="props"
  >
    <slot />
  </InputGroupAddon>
</template>
```

```vue [PromptInputFooter.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupAddon } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputFooterProps = InstanceType<typeof InputGroupAddon>['$props']

interface Props extends /* @vue-ignore */ Omit<PromptInputFooterProps, 'align'> {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <InputGroupAddon
    align="block-end"
    :class="cn('justify-between gap-1', props.class)"
    v-bind="props"
  >
    <slot />
  </InputGroupAddon>
</template>
```

```vue [PromptInputActionMenu.vue] height=300 collapse
<script setup lang="ts">
import { DropdownMenu } from '@repo/shadcn-vue/components/ui/dropdown-menu'

type DropdownMenuProps = InstanceType<typeof DropdownMenu>['$props']

interface Props extends /* @vue-ignore */ DropdownMenuProps {}

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenu v-bind="props">
    <slot />
  </DropdownMenu>
</template>
```

```vue [PromptInputActionMenuTrigger.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuTrigger } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { PlusIcon } from 'lucide-vue-next'
import PromptInputButton from './PromptInputButton.vue'

type DropdownMenuTriggerProps = InstanceType<typeof DropdownMenuTrigger>['$props']

interface Props extends /* @vue-ignore */ DropdownMenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenuTrigger as-child>
    <PromptInputButton :class="props.class" v-bind="props">
      <slot><PlusIcon class="size-4" /></slot>
    </PromptInputButton>
  </DropdownMenuTrigger>
</template>
```

```vue [PromptInputActionMenuContent.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuContent } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'

type DropdownMenuContentProps = InstanceType<typeof DropdownMenuContent>['$props']

interface Props extends /* @vue-ignore */ DropdownMenuContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { align, class: _, ...restProps } = props
</script>

<template>
  <DropdownMenuContent align="start" :class="cn(props.class)" v-bind="restProps">
    <slot />
  </DropdownMenuContent>
</template>
```

```vue [PromptInputActionMenuItem.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputActionMenuItemProps = InstanceType<typeof DropdownMenuItem>['$props']

interface Props extends /* @vue-ignore */ PromptInputActionMenuItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenuItem :class="cn(props.class)">
    <slot />
  </DropdownMenuItem>
</template>
```

```vue [PromptInputActionAddAttachments.vue] height=300 collapse
<script setup lang="ts">
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { ImageIcon } from 'lucide-vue-next'
import { usePromptInput } from './context'

defineProps<{ label?: string }>()

const { openFileDialog } = usePromptInput()
</script>

<template>
  <DropdownMenuItem @select.prevent="openFileDialog">
    <ImageIcon class="mr-2 size-4" />
    {{ label || 'Add photos or files' }}
  </DropdownMenuItem>
</template>
```

```vue [PromptInputSpeechButton.vue] height=300 collapse
<script setup lang="ts">
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { MicIcon } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePromptInput } from './context'

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: any) => any) | null
  onerror: ((this: SpeechRecognition, ev: any) => any) | null
}

const props = defineProps<{ class?: string }>()

const { textInput, setTextInput } = usePromptInput()
const isListening = ref(false)
const recognition = ref<SpeechRecognition | null>(null)

onMounted(() => {
  const Win = window as any
  const SpeechRecognition = Win.SpeechRecognition || Win.webkitSpeechRecognition

  if (SpeechRecognition) {
    const sr = new SpeechRecognition()
    sr.continuous = true
    sr.interimResults = true
    sr.lang = 'en-US'

    sr.onstart = () => isListening.value = true
    sr.onend = () => isListening.value = false

    sr.onresult = (event: any) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0]?.transcript ?? ''
        }
      }

      if (finalTranscript) {
        const newValue = textInput.value + (textInput.value ? ' ' : '') + finalTranscript
        setTextInput(newValue)
      }
    }

    sr.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      isListening.value = false
    }

    recognition.value = sr
  }
})

onUnmounted(() => {
  recognition.value?.stop()
})

function toggleListening() {
  if (!recognition.value)
    return
  if (isListening.value) {
    recognition.value.stop()
  }
  else {
    recognition.value.start()
  }
}
</script>

<template>
  <InputGroupButton
    type="button"
    variant="ghost"
    size="icon-sm"
    :disabled="!recognition"
    :class="cn(
      'relative transition-all duration-200',
      isListening && 'animate-pulse bg-accent text-accent-foreground',
      props.class,
    )"
    @click="toggleListening"
  >
    <MicIcon class="size-4" />
  </InputGroupButton>
</template>
```

```vue [PromptInputSelect.vue] height=300 collapse
<script setup lang="ts">
import { Select } from '@repo/shadcn-vue/components/ui/select'

type PromptInputSelectProps = InstanceType<typeof Select>['$props']

interface Props extends /* @vue-ignore */ PromptInputSelectProps {}

const props = defineProps<Props>()
</script>

<template>
  <Select v-bind="props">
    <slot />
  </Select>
</template>
```

```vue [PromptInputSelectTrigger.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectTrigger } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type SelectTriggerProps = InstanceType<typeof SelectTrigger>['$props']

interface Props extends /* @vue-ignore */ SelectTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectTrigger
    :class="cn(
      'border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors',
      'hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground',
      props.class,
    )"
    v-bind="props"
  >
    <slot />
  </SelectTrigger>
</template>
```

```vue [PromptInputSelectContent.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectContent } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type SelectContentProps = InstanceType<typeof SelectContent>['$props']

interface Props extends /* @vue-ignore */ SelectContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectContent :class="cn(props.class)" v-bind="props">
    <slot />
  </SelectContent>
</template>
```

```vue [PromptInputSelectItem.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectItem } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputSelectItemProps = InstanceType<typeof SelectItem>['$props']

interface Props extends /* @vue-ignore */ PromptInputSelectItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectItem :class="cn(props.class)" v-bind="props">
    <slot />
  </SelectItem>
</template>
```

```vue [PromptInputSelectValue.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectValue } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputSelectValueProps = InstanceType<typeof SelectValue>['$props']

interface Props extends /* @vue-ignore */ PromptInputSelectValueProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectValue :class="cn(props.class)" v-bind="props">
    <slot />
  </SelectValue>
</template>
```

```vue [PromptInputHoverCard.vue] height=300 collapse
<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

type PromptInputHoverCardProps = InstanceType<typeof HoverCard>['$props']

interface Props extends /* @vue-ignore */ PromptInputHoverCardProps {
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  openDelay: 0,
  closeDelay: 0,
})

const { openDelay, closeDelay, ...restProps } = props
</script>

<template>
  <HoverCard :open-delay="openDelay" :close-delay="closeDelay" v-bind="restProps">
    <slot />
  </HoverCard>
</template>
```

```vue [PromptInputHoverCardTrigger.vue] height=300 collapse
<script setup lang="ts">
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'

type PromptInputHoverCardTriggerProps = InstanceType<typeof HoverCardTrigger>['$props']

interface Props extends /* @vue-ignore */ PromptInputHoverCardTriggerProps {}

const props = defineProps<Props>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
```

```vue [PromptInputHoverCardContent.vue] height=300 collapse
<script setup lang="ts">
import { HoverCardContent } from '@repo/shadcn-vue/components/ui/hover-card'

type PromptInputHoverCardContentProps = InstanceType<typeof HoverCardContent>['$props']

interface Props extends /* @vue-ignore */ PromptInputHoverCardContentProps {}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
})

const { align, ...restProps } = props
</script>

<template>
  <HoverCardContent :align="props.align" v-bind="restProps">
    <slot />
  </HoverCardContent>
</template>
```

```vue [PromptInputTabsList.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn(props.class)" v-bind="props">
    <slot />
  </div>
</template>
```

```vue [PromptInputTab.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn(props.class)" v-bind="props">
    <slot />
  </div>
</template>
```

```vue [PromptInputTabLabel.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <h3 :class="cn('mb-2 px-3 font-medium text-muted-foreground text-xs', props.class)" v-bind="props">
    <slot />
  </h3>
</template>
```

```vue [PromptInputTabBody.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('space-y-1', props.class)" v-bind="props">
    <slot />
  </div>
</template>
```

```vue [PromptInputTabItem.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent', props.class)" v-bind="props">
    <slot />
  </div>
</template>
```

```vue [PromptInputCommand.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandProps = InstanceType<typeof Command>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Command :class="cn(props.class)" v-bind="props">
    <slot />
  </Command>
</template>
```

```vue [PromptInputCommandInput.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandInputProps = InstanceType<typeof CommandInput>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput :class="cn(props.class)" v-bind="props" />
</template>
```

```vue [PromptInputCommandList.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandList } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandListProps = InstanceType<typeof CommandList>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandList :class="cn(props.class)" v-bind="props" />
</template>
```

```vue [PromptInputCommandEmpty.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandEmptyProps = InstanceType<typeof CommandEmpty>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandEmptyProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandEmpty :class="cn(props.class)" v-bind="props">
    <slot />
  </CommandEmpty>
</template>
```

```vue [PromptInputCommandGroup.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandGroupProps = InstanceType<typeof CommandGroup>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandGroupProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandGroup :class="cn(props.class)" v-bind="props">
    <slot />
  </CommandGroup>
</template>
```

```vue [PromptInputCommandItem.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandItem v-bind="props" :class="cn(props.class)">
    <slot />
  </CommandItem>
</template>
```

```vue [PromptInputCommandSeparator.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandSeparator } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputCommandSeparatorProps = InstanceType<typeof CommandSeparator>['$props']

interface Props extends /* @vue-ignore */ PromptInputCommandSeparatorProps {
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()
</script>

<template>
  <CommandSeparator :class="cn(props.class)" v-bind="props" />
</template>
```

```ts [context.ts] height=300 collapse
import type { AttachmentFile, PromptInputContext } from './types'
import { nanoid } from 'nanoid'
import { inject, onBeforeUnmount, provide, ref } from 'vue'
import { PROMPT_INPUT_KEY } from './types'

export function usePromptInputProvider(props: {
  initialInput?: string
  maxFiles?: number
  maxFileSize?: number
  accept?: string
  onSubmit?: (message: { text: string, files: any[] }) => void | Promise<void>
  onError?: (err: { code: string, message: string }) => void
}) {
  const textInput = ref(props.initialInput || '')
  const files = ref<AttachmentFile[]>([])
  const fileInputRef = ref<HTMLInputElement | null>(null)
  const isLoading = ref(false)

  // Cleanup object URLs to avoid memory leaks
  onBeforeUnmount(() => {
    files.value.forEach((f) => {
      if (f.url && f.url.startsWith('blob:')) {
        URL.revokeObjectURL(f.url)
      }
    })
  })

  const setTextInput = (val: string) => {
    textInput.value = val
  }

  const matchesAccept = (file: File) => {
    if (!props.accept || props.accept.trim() === '')
      return true
    if (props.accept.includes('image/*'))
      return file.type.startsWith('image/')
    // Add more mime-type checks here if necessary
    return true
  }

  const addFiles = (incoming: File[] | FileList) => {
    const fileList = Array.from(incoming)

    // Validate Accept
    const accepted = fileList.filter(matchesAccept)
    if (fileList.length && accepted.length === 0) {
      props.onError?.({ code: 'accept', message: 'No files match the accepted types.' })
      return
    }

    // Validate Size
    const withinSize = (f: File) => (props.maxFileSize ? f.size <= props.maxFileSize : true)
    const sized = accepted.filter(withinSize)
    if (accepted.length > 0 && sized.length === 0) {
      props.onError?.({ code: 'max_file_size', message: 'All files exceed the maximum size.' })
      return
    }

    // Validate Count
    const currentCount = files.value.length
    const capacity = props.maxFiles ? Math.max(0, props.maxFiles - currentCount) : undefined
    const capped = typeof capacity === 'number' ? sized.slice(0, capacity) : sized

    if (typeof capacity === 'number' && sized.length > capacity) {
      props.onError?.({ code: 'max_files', message: 'Too many files. Some were not added.' })
    }

    const newAttachments: AttachmentFile[] = capped.map(file => ({
      id: nanoid(),
      type: 'file',
      url: URL.createObjectURL(file),
      mediaType: file.type,
      filename: file.name,
      file,
    }))

    files.value = [...files.value, ...newAttachments]
  }

  const removeFile = (id: string) => {
    const file = files.value.find(f => f.id === id)
    if (file?.url && file.url.startsWith('blob:')) {
      URL.revokeObjectURL(file.url)
    }
    files.value = files.value.filter(f => f.id !== id)
  }

  const clearFiles = () => {
    files.value.forEach((f) => {
      if (f.url && f.url.startsWith('blob:')) {
        URL.revokeObjectURL(f.url)
      }
    })
    files.value = []
  }

  const clearInput = () => {
    textInput.value = ''
  }

  const openFileDialog = () => {
    fileInputRef.value?.click()
  }

  const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      })
    }
    catch {
      return null
    }
  }

  const submitForm = async () => {
    if (!props.onSubmit)
      return

    // Process files (convert blobs to base64 if needed for AI SDK)
    const processedFiles = await Promise.all(
      files.value.map(async (item) => {
        if (item.url && item.url.startsWith('blob:')) {
          const dataUrl = await convertBlobUrlToDataUrl(item.url)
          return { ...item, url: dataUrl ?? item.url }
        }
        return item
      }),
    )

    const message = {
      text: textInput.value,
      files: processedFiles,
    }

    try {
      isLoading.value = true
      const result = props.onSubmit(message)
      if (result instanceof Promise) {
        await result
      }
      clearInput()
      clearFiles()
    }
    catch (e) {
      if (props.onError) {
        const errorMessage = e instanceof Error
          ? e.message
          : String(e) || 'An unknown error occurred during submission.'
        props.onError({
          code: 'submit_error',
          message: errorMessage,
        })
      }
      console.error('Submission failed:', e)
    }
    finally {
      isLoading.value = false
    }
  }

  const context: PromptInputContext = {
    textInput,
    files,
    fileInputRef,
    isLoading,
    setTextInput,
    addFiles,
    removeFile,
    clearFiles,
    clearInput,
    openFileDialog,
    submitForm,
  }

  provide(PROMPT_INPUT_KEY, context)
  return context
}

export function usePromptInput() {
  const context = inject<PromptInputContext>(PROMPT_INPUT_KEY)
  if (!context) {
    throw new Error('usePromptInput must be used within a PromptInput component')
  }
  return context
}
```

```ts [types.ts] height=300 collapse
import type { FileUIPart } from 'ai'
import type { Ref } from 'vue'

export interface PromptInputMessage {
  text: string
  files: FileUIPart[]
}

export interface AttachmentFile extends FileUIPart {
  id: string
  file?: File
}

export interface PromptInputContext {
  textInput: Ref<string>
  files: Ref<AttachmentFile[]>
  isLoading: Ref<boolean>
  fileInputRef: Ref<HTMLInputElement | null>
  setTextInput: (val: string) => void
  addFiles: (files: File[] | FileList) => void
  removeFile: (id: string) => void
  clearFiles: () => void
  clearInput: () => void
  openFileDialog: () => void
  submitForm: () => void
}

export const PROMPT_INPUT_KEY = Symbol('PromptInputContext')
```

```ts [index.ts] height=300 collapse
export * from './context'
export { default as PromptInput } from './PromptInput.vue'
export { default as PromptInputActionAddAttachments } from './PromptInputActionAddAttachments.vue'
export { default as PromptInputActionMenu } from './PromptInputActionMenu.vue'
export { default as PromptInputActionMenuContent } from './PromptInputActionMenuContent.vue'
export { default as PromptInputActionMenuItem } from './PromptInputActionMenuItem.vue'
export { default as PromptInputActionMenuTrigger } from './PromptInputActionMenuTrigger.vue'
export { default as PromptInputAttachment } from './PromptInputAttachment.vue'
export { default as PromptInputAttachments } from './PromptInputAttachments.vue'
export { default as PromptInputBody } from './PromptInputBody.vue'
export { default as PromptInputButton } from './PromptInputButton.vue'
export { default as PromptInputCommand } from './PromptInputCommand.vue'
export { default as PromptInputCommandEmpty } from './PromptInputCommandEmpty.vue'
export { default as PromptInputCommandGroup } from './PromptInputCommandGroup.vue'
export { default as PromptInputCommandInput } from './PromptInputCommandInput.vue'
export { default as PromptInputCommandItem } from './PromptInputCommandItem.vue'
export { default as PromptInputCommandList } from './PromptInputCommandList.vue'
export { default as PromptInputCommandSeparator } from './PromptInputCommandSeparator.vue'
export { default as PromptInputFooter } from './PromptInputFooter.vue'
export { default as PromptInputHeader } from './PromptInputHeader.vue'
export { default as PromptInputHoverCard } from './PromptInputHoverCard.vue'
export { default as PromptInputHoverCardContent } from './PromptInputHoverCardContent.vue'
export { default as PromptInputHoverCardTrigger } from './PromptInputHoverCardTrigger.vue'
export { default as PromptInputProvider } from './PromptInputProvider.vue'
export { default as PromptInputSelect } from './PromptInputSelect.vue'
export { default as PromptInputSelectContent } from './PromptInputSelectContent.vue'
export { default as PromptInputSelectItem } from './PromptInputSelectItem.vue'
export { default as PromptInputSelectTrigger } from './PromptInputSelectTrigger.vue'
export { default as PromptInputSelectValue } from './PromptInputSelectValue.vue'
export { default as PromptInputSpeechButton } from './PromptInputSpeechButton.vue'
export { default as PromptInputSubmit } from './PromptInputSubmit.vue'
export { default as PromptInputTab } from './PromptInputTab.vue'
export { default as PromptInputTabBody } from './PromptInputTabBody.vue'
export { default as PromptInputTabItem } from './PromptInputTabItem.vue'
export { default as PromptInputTabLabel } from './PromptInputTabLabel.vue'
export { default as PromptInputTabsList } from './PromptInputTabsList.vue'
export { default as PromptInputTextarea } from './PromptInputTextarea.vue'
export { default as PromptInputTools } from './PromptInputTools.vue'
export * from './types'
```
:::

## Usage with AI SDK

Built a fully functional chat app using `PromptInput`, [`Conversation`](/components/conversation) with a model picker:

Add the following component to your frontend:

```vue [pages/index.vue] height=300 collapse
<script setup lang="ts">
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
import { useChat } from '@ai-sdk/vue'
import { GlobeIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message'
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
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools
} from '@/components/ai-elements/prompt-input'

const models = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'claude-opus-4-20250514', name: 'Claude 4 Opus' },
]

const text = ref<string>('')
const model = ref<string>(models[0].id)
const useWebSearch = ref<boolean>(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const { messages, status, sendMessage } = useChat()

function handleSubmit(message: PromptInputMessage) {
  const hasText = Boolean(message.text)
  const hasAttachments = Boolean(message.files?.length)

  if (!(hasText || hasAttachments)) {
    return
  }

  sendMessage(
    {
      text: message.text || 'Sent with attachments',
      files: message.files
    },
    {
      body: {
        model: model.value,
        webSearch: useWebSearch.value,
      },
    },
  )

  text.value = ''
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <Message
            v-for="message in messages"
            :key="message.id"
            :from="message.role"
          >
            <MessageContent>
              <template v-for="(part, i) in message.parts" :key="`${message.id}-${i}`">
                <MessageResponse v-if="part.type === 'text'">
                  {{ part.text }}
                </MessageResponse>
              </template>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        class="mt-4"
        global-drop
        multiple
        @submit="handleSubmit"
      >
        <PromptInputHeader>
          <PromptInputAttachments>
            <template #default="{ attachment }">
              <PromptInputAttachment :data="attachment" />
            </template>
          </PromptInputAttachments>
        </PromptInputHeader>

        <PromptInputBody>
          <PromptInputTextarea
            ref="textareaRef"
            :model-value="text"
            @update:model-value="text = $event"
          />
        </PromptInputBody>

        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>

            <PromptInputSpeechButton
              :textarea-ref="textareaRef?.$el || null"
              @transcription-change="text = $event"
            />

            <PromptInputButton
              :variant="useWebSearch ? 'default' : 'ghost'"
              @click="useWebSearch = !useWebSearch"
            >
              <GlobeIcon :size="16" />
              <span>Search</span>
            </PromptInputButton>

            <PromptInputSelect v-model="model">
              <PromptInputSelectTrigger>
                <PromptInputSelectValue />
              </PromptInputSelectTrigger>
              <PromptInputSelectContent>
                <PromptInputSelectItem
                  v-for="m in models"
                  :key="m.id"
                  :value="m.id"
                >
                  {{ m.name }}
                </PromptInputSelectItem>
              </PromptInputSelectContent>
            </PromptInputSelect>
          </PromptInputTools>

          <PromptInputSubmit
            :disabled="!text && !status"
            :status="status"
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/chat/route.ts] height=300 collapse
import { convertToModelMessages, streamText, UIMessage } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const {
    model,
    messages,
    webSearch
  }: {
    messages: UIMessage[]
    model: string
    webSearch?: boolean
  } = await readBody(event)

  const result = streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
})
```

## Features

- Auto-resizing textarea that adjusts height based on content
- File attachment support with drag-and-drop
- Image preview for image attachments
- Configurable file constraints (max files, max size, accepted types)
- Automatic submit button icons based on status
- Support for keyboard shortcuts (Enter to submit, Shift+Enter for new line)
- Customizable min/max height for the textarea
- Flexible toolbar with support for custom actions and tools
- Built-in model selection dropdown
- Built-in native speech recognition button (Web Speech API)
- Optional provider for lifted state management
- Form automatically resets on submit
- Responsive design with mobile-friendly controls
- Clean, modern styling with customizable themes
- Form-based submission handling
- Hidden file input sync for native form posts
- Global document drop support (opt-in)

## Examples

### Cursor Style

:::ComponentLoader{label="Preview" componentName="PromptInputCursor"}
:::

## Props

### `<PromptInputProvider />`

:::field-group
  ::field{name="initialInput" type="string"}
  Initial text input value.
  ::
:::

### `<PromptInput />`

:::field-group
  ::field{name="accept" type="string" optional}
  File types to accept (e.g., "image/*"). Leave undefined for any.
  ::
  ::field{name="multiple" type="boolean"}
  Whether to allow multiple file selection.
  ::
  ::field{name="globalDrop" type="boolean"}
  When true, accepts file drops anywhere on the document.
  ::
  ::field{name="maxFiles" type="number"}
  Maximum number of files allowed.
  ::
  ::field{name="maxFileSize" type="number"}
  Maximum size of files in bytes.
  ::
   ::field{name="...props" type="HTMLAttributes"}
  Additional props are spread to the root form element.
  ::
:::

### `<PromptInputTextarea />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof InputGroupTextarea>" optional}
  Any other props are spread to the underlying Textarea component.
  ::
:::

### `<PromptInputTools />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props are spread to the underlying div.
  ::
:::

### `<PromptInputButton />`

:::field-group
  ::field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'" defaultValue="'ghost'"}
  Visual style of the button.
  ::
  ::field{name="size" type="'default' | 'sm' | 'lg' | 'icon'" defaultValue="auto"}
  Button size. Defaults to 'icon' when a single child is provided, otherwise 'default'.
  ::
  ::field{name="...props" type="InstanceType<typeof InputGroupButton>"}
  Additional props are spread to the underlying InputGroupButton component.
  ::
:::

### `<PromptInputSubmit />`

:::field-group
  ::field{name="status" type="ChatStatus"}
  Current chat status; controls the icon (submitted, streaming, error, ready).
  ::
  ::field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'" defaultValue="'default'"}
  Visual style of the submit button.
  ::
  ::field{name="size" type="'default' | 'sm' | 'lg' | 'icon'" defaultValue="'icon'"}
  Size of the submit button.
  ::
  ::field{name="...props" type="InstanceType<typeof InputGroupButton>"}
  Additional props are spread to the underlying InputGroupButton component.
  ::
:::

### `<PromptInputBody />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the underlying body div.
  ::
:::

### `<PromptInputAttachments />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the underlying attachments container.
  ::
:::

### `<PromptInputAttachment />`

:::field-group
  ::field{name="file" type="AttachmentFile"}
  The attachment data to display.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the underlying attachment div.
  ::
:::

### `<PromptInputHeader />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof InputGroupAddon>"}
  Any other props (except align) are spread to the underlying InputGroupAddon component.
  ::
:::

### `<PromptInputFooter />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof InputGroupAddon>"}
  Any other props (except align) are spread to the underlying InputGroupAddon component.
  ::
:::

### `<PromptInputActionMenu />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof DropdownMenu>"}
  Any other props are spread to the underlying DropdownMenu component.
  ::
:::

### `<PromptInputActionMenuTrigger />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof DropdownMenuTrigger>"}
  Any other props are spread to the underlying  DropdownMenuTrigger component.
  ::
:::

### `<PromptInputActionMenuContent />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof DropdownMenuContent>"}
  Any other props are spread to the underlying  DropdownMenuContent component.
  ::
:::

### `<PromptInputActionMenuItem />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof DropdownMenuItem>"}
  Any other props are spread to the underlying  DropdownMenuItem component.
  ::
:::

### `<PromptInputActionAddAttachments />`

:::field-group
  ::field{name="label" type="string" optional}
  Label for the menu item.
  ::
  ::field{name="...props" type=" InstanceType<typeof DropdownMenuItem>"}
  Any other props are spread to the underlying DropdownMenuItem component.
  ::
:::

### `<PromptInputSpeechButton />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof PromptInputButton >"}
  Any other props are spread to the underlying PromptInputButton component.
  ::
:::

### `<PromptInputSelect />`

:::field-group
  ::field{name="...props" type=" InstanceType<typeof Select>"}
  Any other props are spread to the underlying  Select component.
  ::
:::

### `<PromptInputSelectTrigger />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof SelectTrigger>"}
  Any other props are spread to the underlying SelectTrigger component.
  ::
:::

### `<PromptInputSelectContent />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof SelectContent>"}
  Any other props are spread to the underlying SelectContent component.
  ::
:::

### `<PromptInputSelectItem />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof SelectItem>"}
  Any other props are spread to the underlying SelectItem component.
  ::
:::

### `<PromptInputSelectValue />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof SelectValue>"}
  Any other props are spread to the underlying SelectValue component.
  ::
:::

### `<PromptInputHoverCard />`

:::field-group
  ::field{name="openDelay" type="number" defaultValue="0"}
  Delay in milliseconds before opening.
  ::
  ::field{name="closeDelay" type="number" defaultValue="0"}
  Delay in milliseconds before closing.
  ::
  ::field{name="...props" type="InstanceType<typeof HoverCard>"}
  Any other props are spread to the HoverCard component.
  ::
:::

### `<PromptInputHoverCardTrigger />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof HoverCardTrigger>"}
  Any other props are spread to the HoverCardTrigger component.
  ::
:::

### `<PromptInputHoverCardContent />`

:::field-group
  ::field{name="align" type="'start' | 'center' | 'end'" defaultValue="'start'"}
  Alignment of the hover card content.
  ::
  ::field{name="...props" type="InstanceType<typeof HoverCardContent>"}
  Any other props are spread to the HoverCardContent component.
  ::
:::

### `<PromptInputTabsList />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the div element.
  ::
:::

### `<PromptInputTab />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the div element.
  ::
:::

### `<PromptInputTabLabel />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the h3 element.
  ::
:::

### `<PromptInputTabBody />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the div element.
  ::
:::

### `<PromptInputTabItem />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the div element.
  ::
:::

### `<PromptInputCommand />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof Command>" optional}
  Any other props are spread to the Command component.
  ::
:::

### `<PromptInputCommandInput />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandInput"> optional}
  Any other props are spread to the CommandInput component.
  ::
:::

### `<PromptInputCommandList />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandList>" optional}
  Any other props are spread to the CommandList component.
  ::
:::

### `<PromptInputCommandEmpty />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandEmpty>" optional}
  Any other props are spread to the CommandEmpty component.
  ::
:::

### `<PromptInputCommandGroup />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandGroup>" optional}
  Any other props are spread to the CommandGroup component.
  ::
:::

### `<PromptInputCommandItem />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandItem>" optional}
  Any other props are spread to the CommandItem component.
  ::
:::

### `<PromptInputCommandSeparator />`

:::field-group
  ::field{name="...props" type="InstanceType<typeof CommandSeparator>" optional}
  Any other props are spread to the CommandSeparator component.
  ::
:::
