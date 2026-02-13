<script setup lang="ts">
import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from '@repo/elements/attachments'
import { usePromptInput } from '@repo/elements/prompt-input'

const { files, removeFile } = usePromptInput()
</script>

<template>
  <Attachments
    v-if="files.length > 0"
    variant="inline"
  >
    <Attachment
      v-for="attachment in files"
      :key="attachment.id"
      :data="attachment"
      @remove="removeFile(attachment.id)"
    >
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  </Attachments>
</template>
