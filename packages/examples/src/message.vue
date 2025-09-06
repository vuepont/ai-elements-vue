<script setup lang="ts">
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
</script>

<template>
  <div class="space-y-2">
    <Message from="assistant">
      <MessageContent>
        Hello! How can I help you today?
      </MessageContent>
      <MessageAvatar src="https://github.com/openai.png" name="AI" />
    </Message>

    <Message from="user">
      <MessageContent>
        Show me a quick demo of the components.
      </MessageContent>
      <MessageAvatar src="https://github.com/haydenbleasel.png" name="Me" />
    </Message>
  </div>
</template>
