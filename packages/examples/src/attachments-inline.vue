<script setup lang="ts">
import type { AttachmentData } from '@repo/elements/attachments'
import {
  Attachment,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  getAttachmentLabel,
  getMediaCategory,
} from '@repo/elements/attachments'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const initialAttachments: AttachmentData[] = [
  {
    id: nanoid(),
    type: 'file',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    mediaType: 'image/jpeg',
    filename: 'mountain-landscape.jpg',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'application/pdf',
    filename: 'quarterly-report.pdf',
  },
  {
    id: nanoid(),
    type: 'source-document',
    sourceId: 'react-docs',
    title: 'React Documentation',
    mediaType: 'text/html',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'audio/mp3',
    filename: 'podcast-episode.mp3',
  },
]

const attachments = ref<AttachmentData[]>(initialAttachments)

function handleRemove(id: string) {
  attachments.value = attachments.value.filter(a => a.id !== id)
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <Attachments variant="inline">
      <AttachmentHoverCard
        v-for="attachment in attachments"
        :key="attachment.id"
      >
        <AttachmentHoverCardTrigger as-child>
          <Attachment
            :data="attachment"
            @remove="handleRemove(attachment.id)"
          >
            <div class="relative size-5 shrink-0">
              <div class="absolute inset-0 transition-opacity group-hover:opacity-0">
                <AttachmentPreview />
              </div>
              <AttachmentRemove class="absolute inset-0" />
            </div>
            <AttachmentInfo />
          </Attachment>
        </AttachmentHoverCardTrigger>
        <AttachmentHoverCardContent>
          <div class="space-y-3">
            <div
              v-if="getMediaCategory(attachment) === 'image' && attachment.type === 'file' && attachment.url"
              class="flex max-h-96 w-80 items-center justify-center overflow-hidden rounded-md border"
            >
              <img
                :alt="getAttachmentLabel(attachment)"
                class="max-h-full max-w-full object-contain"
                height="384"
                :src="attachment.url"
                width="320"
              >
            </div>
            <div class="space-y-1 px-0.5">
              <h4 class="font-semibold text-sm leading-none">
                {{ getAttachmentLabel(attachment) }}
              </h4>
              <p v-if="attachment.mediaType" class="font-mono text-muted-foreground text-xs">
                {{ attachment.mediaType }}
              </p>
            </div>
          </div>
        </AttachmentHoverCardContent>
      </AttachmentHoverCard>
    </Attachments>
  </div>
</template>
