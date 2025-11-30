<script setup lang="ts">
import { usePromptInput } from '@repo/elements/prompt-input'
import { Button } from '@repo/shadcn-vue/components/ui/button'

const { setTextInput, clearInput, clearFiles } = usePromptInput()
</script>

<template>
  <header class="mt-8 flex items-center justify-between">
    <p class="text-sm">
      Header Controls via
      <code class="rounded-md bg-muted p-1 font-bold">
        PromptInputProvider
      </code>
    </p>

    <div class="flex items-center -space-x-px">
      <Button
        variant="outline"
        size="sm"
        class="rounded-r-none focus:z-10"
        @click="clearInput"
      >
        Clear input
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="rounded-none focus:z-10"
        @click="setTextInput('Inserted via PromptInputProvider')"
      >
        Set input
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="rounded-l-none focus:z-10"
        @click="clearFiles"
      >
        Clear attachments
      </Button>
    </div>
  </header>
</template>
