<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
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
  class?: HTMLAttributes['class']
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
