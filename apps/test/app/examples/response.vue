<script setup lang="ts">
import { Response } from '@repo/elements/response'
</script>

<template>
  <Response>
    <div class="prose dark:prose-invert">
      <h3>Response Container</h3>
      <p>
        This area renders content from the assistant, with consistent spacing and
        styles. You can place markdown-rendered content, lists, images, etc.
      </p>
      <ul>
        <li>Automatic top/bottom margin trimming</li>
        <li>Works with any content</li>
      </ul>
    </div>
  </Response>
</template>
