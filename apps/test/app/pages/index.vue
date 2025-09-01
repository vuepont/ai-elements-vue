<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@repo/shadcn-vue/components/ui/card'
import Conversation from '~/examples/conversation.vue'
import Message from '~/examples/message.vue'
import PromptInput from '~/examples/prompt-input.vue'
import Response from '~/examples/response.vue'

const components = [
  { name: 'Message', Component: Message },
  { name: 'PromptInput', Component: PromptInput },
  { name: 'Conversation', Component: Conversation },
  { name: 'Response', Component: Response },
]
</script>

<template>
  <div class="container mx-auto space-y-8 py-16">
    <Card v-for="item in components" :key="item.name">
      <CardHeader>
        <CardTitle class="text-lg">
          {{ item.name }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <component :is="item.Component" />
      </CardContent>
    </Card>
  </div>
</template>
