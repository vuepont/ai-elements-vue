<script setup lang="ts">
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
} from '@repo/elements/snippet'
</script>

<template>
  <Snippet code="git clone https://github.com/user/repo">
    <SnippetInput />
    <SnippetAddon align="inline-end">
      <SnippetCopyButton />
    </SnippetAddon>
  </Snippet>
</template>
