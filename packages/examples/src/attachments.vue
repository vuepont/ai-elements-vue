<script setup lang="ts">
import type { AttachmentData } from '@repo/elements/attachments'
import {
  Attachment,
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
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop',
    mediaType: 'image/jpeg',
    filename: 'ocean-sunset.jpg',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'application/pdf',
    filename: 'document.pdf',
  },
  {
    id: nanoid(),
    type: 'file',
    url: '',
    mediaType: 'video/mp4',
    filename: 'video.mp4',
  },
]

const attachments = ref<AttachmentData[]>(initialAttachments)

function handleRemove(id: string) {
  attachments.value = attachments.value.filter(a => a.id !== id)
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <Attachments variant="grid">
      <Attachment
        v-for="attachment in attachments"
        :key="attachment.id"
        :data="attachment"
        @remove="handleRemove(attachment.id)"
      >
        <AttachmentPreview />
        <AttachmentRemove />
      </Attachment>
    </Attachments>
  </div>
</template>
