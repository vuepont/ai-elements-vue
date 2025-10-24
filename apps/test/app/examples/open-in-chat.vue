<script setup lang="ts">
import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInScira,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from '@repo/elements/open-in-chat'
import { ref } from 'vue'

const sampleQuery = ref('How can I implement authentication in Nuxt.js?')
</script>

<template>
  <OpenIn :query="sampleQuery">
    <OpenInTrigger />
    <OpenInContent>
      <OpenInChatGPT />
      <OpenInClaude />
      <OpenInCursor />
      <OpenInT3 />
      <OpenInScira />
      <OpenInv0 />
    </OpenInContent>
  </OpenIn>
</template>
