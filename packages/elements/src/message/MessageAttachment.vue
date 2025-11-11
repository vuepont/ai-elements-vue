<script setup lang="ts">
import type { FileUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PaperclipIcon, XIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  data: FileUIPart
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'remove'): void
}>()

const filename = computed(() => props.data.filename || '')
const mediaType = computed(() =>
  props.data.mediaType?.startsWith('image/') && props.data.url ? 'image' : 'file',
)
const isImage = computed(() => mediaType.value === 'image')
const attachmentLabel = computed(() =>
  filename.value || (isImage.value ? 'Image' : 'Attachment'),
)
</script>

<template>
  <div
    :class="
      cn(
        'group relative size-24 overflow-hidden rounded-lg',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <template v-if="isImage">
      <img
        :src="props.data.url"
        :alt="filename || 'attachment'"
        class="size-full object-cover"
        height="100"
        width="100"
      >
      <Button
        aria-label="Remove attachment"
        class="absolute top-2 right-2 size-6 rounded-full bg-background/80 p-0 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100 [&>svg]:size-3"
        type="button"
        variant="ghost"
        @click.stop="emits('remove')"
      >
        <XIcon />
        <span class="sr-only">Remove</span>
      </Button>
    </template>

    <template v-else>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <div
              class="flex size-full shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
            >
              <PaperclipIcon class="size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ attachmentLabel }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        aria-label="Remove attachment"
        class="size-6 shrink-0 rounded-full p-0 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100 [&>svg]:size-3"
        type="button"
        variant="ghost"
        @click.stop="emits('remove')"
      >
        <XIcon />
        <span class="sr-only">Remove</span>
      </Button>
    </template>
  </div>
</template>
