<script setup lang="ts">
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
</script>

<template>
  <div class="space-y-2">
    <Message from="assistant">
      <MessageAvatar src="https://github.com/openai.png" name="AI" />
      <MessageContent>
        Hello! How can I help you today?
      </MessageContent>
    </Message>

    <Message from="user">
      <MessageAvatar src="https://github.com/haydenbleasel.png" name="Me" />
      <MessageContent>
        Show me a quick demo of the components.
      </MessageContent>
    </Message>
  </div>
</template>
