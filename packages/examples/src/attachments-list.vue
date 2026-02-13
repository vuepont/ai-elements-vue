<script setup lang="ts">
import type { AttachmentData } from '@repo/elements/attachments'
import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
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
    filename: 'quarterly-report-2024.pdf',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'video/mp4',
    filename: 'product-demo.mp4',
  },
  {
    id: nanoid(),
    type: 'source-document',
    sourceId: 'api-docs',
    title: 'API Documentation',
    mediaType: 'text/html',
    filename: 'api-reference',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'audio/mpeg',
    filename: 'meeting-recording.mp3',
  },
]

const attachments = ref<AttachmentData[]>(initialAttachments)

function handleRemove(id: string) {
  attachments.value = attachments.value.filter(a => a.id !== id)
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <Attachments class="w-full max-w-md" variant="list">
      <Attachment
        v-for="attachment in attachments"
        :key="attachment.id"
        :data="attachment"
        @remove="handleRemove(attachment.id)"
      >
        <AttachmentPreview />
        <AttachmentInfo show-media-type />
        <AttachmentRemove />
      </Attachment>
    </Attachments>
  </div>
</template>
