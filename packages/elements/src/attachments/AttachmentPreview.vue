<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { AttachmentMediaCategory } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  Music2Icon,
  PaperclipIcon,
  VideoIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useAttachmentContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  fallbackIcon?: VNode
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { data, mediaCategory, variant } = useAttachmentContext()

const isGrid = computed(() => variant.value === 'grid')
const iconSize = computed(() => (variant.value === 'inline' ? 'size-3' : 'size-4'))
const fileUrl = computed(() => (data.value.type === 'file' ? data.value.url : undefined))
const showImage = computed(
  () => mediaCategory.value === 'image' && data.value.type === 'file' && !!fileUrl.value,
)
const showVideo = computed(
  () => mediaCategory.value === 'video' && data.value.type === 'file' && !!fileUrl.value,
)

const iconMap: Record<AttachmentMediaCategory, typeof ImageIcon> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: Music2Icon,
  source: GlobeIcon,
  document: FileTextIcon,
  unknown: PaperclipIcon,
}

const iconComponent = computed(() => iconMap[mediaCategory.value])
const imageAlt = computed(() =>
  (data.value.type === 'file' ? data.value.filename : undefined) || 'Image',
)
</script>

<template>
  <div
    :class="
      cn(
        'flex shrink-0 items-center justify-center overflow-hidden',
        variant === 'grid' && 'size-full bg-muted',
        variant === 'inline' && 'size-5 rounded bg-background',
        variant === 'list' && 'size-12 rounded bg-muted',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <img
      v-if="showImage"
      :alt="imageAlt"
      :class="isGrid ? 'size-full object-cover' : 'size-full rounded object-cover'"
      :height="isGrid ? 96 : 20"
      :src="fileUrl"
      :width="isGrid ? 96 : 20"
    >
    <video
      v-else-if="showVideo"
      class="size-full object-cover"
      muted
      :src="fileUrl"
    />
    <component :is="props.fallbackIcon" v-else-if="props.fallbackIcon" />
    <component
      :is="iconComponent"
      v-else
      :class="cn(iconSize, 'text-muted-foreground')"
    />
  </div>
</template>
