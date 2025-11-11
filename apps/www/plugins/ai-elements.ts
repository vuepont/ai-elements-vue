import {
  Actions,
  ActionsHover,
  Artifact,
  Branch,
  ChainOfThought,
  Checkpoint,
  CodeBlock,
  CodeBlockDark,
  Conversation,
  Image,
  InlineCitation,
  Loader,
  LoaderCustomStyling,
  LoaderSizes,
  Message,
  MessageMarkdown,
  OpenInChat,
  Plan,
  PromptInput,
  Queue,
  QueueCustom,
  QueuePromptInput,
  Response,
  Shimmer,
  ShimmerCustomElements,
  ShimmerDurations,
  Sources,
  SourcesCustomRendering,
  Suggestion,
  SuggestionAiInput,
  Task,
  Workflow,
} from '@repo/examples'

import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentViewer from '@/components/ComponentViewer.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.component('ComponentLoader', ComponentLoader)
  vueApp.component('ComponentViewer', ComponentViewer)

  vueApp.component('Artifact', Artifact)
  vueApp.component('Actions', Actions)
  vueApp.component('ActionsHover', ActionsHover)
  vueApp.component('Branch', Branch)
  vueApp.component('Message', Message)
  vueApp.component('MessageMarkdown', MessageMarkdown)
  vueApp.component('PromptInput', PromptInput)
  vueApp.component('Conversation', Conversation)
  vueApp.component('Response', Response)
  vueApp.component('Image', Image)
  vueApp.component('Shimmer', Shimmer)
  vueApp.component('ShimmerCustomElements', ShimmerCustomElements)
  vueApp.component('ShimmerDurations', ShimmerDurations)
  vueApp.component('Sources', Sources)
  vueApp.component('SourcesCustomRendering', SourcesCustomRendering)
  vueApp.component('Task', Task)
  vueApp.component('Suggestion', Suggestion)
  vueApp.component('SuggestionAiInput', SuggestionAiInput)
  vueApp.component('OpenInChat', OpenInChat)
  vueApp.component('Loader', Loader)
  vueApp.component('LoaderCustomStyling', LoaderCustomStyling)
  vueApp.component('LoaderSizes', LoaderSizes)
  vueApp.component('ChainOfThought', ChainOfThought)
  vueApp.component('QueueCustom', QueueCustom)
  vueApp.component('Queue', Queue)
  vueApp.component('QueuePromptInput', QueuePromptInput)
  vueApp.component('Plan', Plan)
  vueApp.component('InlineCitation', InlineCitation)
  vueApp.component('CodeBlock', CodeBlock)
  vueApp.component('CodeBlockDark', CodeBlockDark)
  vueApp.component('Checkpoint', Checkpoint)
  vueApp.component('Workflow', Workflow)
})
