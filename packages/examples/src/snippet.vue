<script setup lang="ts">
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from '@repo/elements/snippet'
</script>

<template>
  <div class="flex size-full items-center justify-center p-4">
    <Snippet class="max-w-sm" code="npx ai-elements-vue add snippet">
      <SnippetAddon class="pl-1">
        <SnippetText>$</SnippetText>
      </SnippetAddon>
      <SnippetInput />
      <SnippetAddon align="inline-end" class="pr-2">
        <SnippetCopyButton />
      </SnippetAddon>
    </Snippet>
  </div>
</template>
