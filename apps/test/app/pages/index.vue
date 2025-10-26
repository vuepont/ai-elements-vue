<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@repo/shadcn-vue/components/ui/card'
import ActionsHover from '~/examples/actions-hover.vue'
import Actions from '~/examples/actions.vue'
import Branch from '~/examples/branch.vue'
import CodeBlock from '~/examples/code-block.vue'
import Conversation from '~/examples/conversation.vue'
import Image from '~/examples/image.vue'
import Loader from '~/examples/loader.vue'
import MessageMarkdown from '~/examples/message-markdown.vue'
import Message from '~/examples/message.vue'
import OpenInChat from '~/examples/open-in-chat.vue'
import Plan from '~/examples/plan.vue'
import PromptInput from '~/examples/prompt-input.vue'
import Queue from '~/examples/queue.vue'
import Response from '~/examples/response.vue'
import Shimmer from '~/examples/shimmer.vue'
import Sources from '~/examples/sources.vue'
import Suggestion from '~/examples/suggestion.vue'
import Task from '~/examples/task.vue'

const components = [
  { name: 'Message', Component: Message },
  { name: 'Actions', Component: Actions },
  { name: 'Branch', Component: Branch },
  { name: 'ActionsHover', Component: ActionsHover },
  { name: 'PromptInput', Component: PromptInput },
  { name: 'Conversation', Component: Conversation },
  { name: 'Response', Component: Response },
  { name: 'MessageMarkdown', Component: MessageMarkdown },
  { name: 'CodeBlock', Component: CodeBlock },
  { name: 'Image', Component: Image },
  { name: 'Shimmer', Component: Shimmer },
  { name: 'Task', Component: Task },
  { name: 'Suggestion', Component: Suggestion },
  { name: 'OpenInChat', Component: OpenInChat },
  { name: 'Loader', Component: Loader },
  { name: 'Sources', Component: Sources },
  { name: 'Queue', Component: Queue },
  { name: 'Plan', Component: Plan },
]
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-16">
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
