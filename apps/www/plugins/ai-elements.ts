import {
  Artifact,
  ChainOfThought,
  Checkpoint,
  CodeBlock,
  CodeBlockDark,
  Confirmation,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationRequest,
  Context,
  Conversation,
  Image,
  InlineCitation,
  Loader,
  LoaderCustomStyling,
  LoaderSizes,
  Message,
  ModelSelector,
  OpenInChat,
  Plan,
  PromptInput,
  Queue,
  QueueCustom,
  QueuePromptInput,
  Reasoning,
  Shimmer,
  ShimmerCustomElements,
  ShimmerDurations,
  Sources,
  SourcesCustomRendering,
  Suggestion,
  SuggestionAiInput,
  Task,
  Tool,
  ToolInputAvailable,
  ToolInputStreaming,
  ToolOutputAvailable,
  ToolOutputError,
  WebPreview,
  Workflow,
} from '@repo/examples'

import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentViewer from '@/components/ComponentViewer.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.component('ComponentLoader', ComponentLoader)
  vueApp.component('ComponentViewer', ComponentViewer)

  vueApp.component('Artifact', Artifact)
  vueApp.component('Message', Message)
  vueApp.component('PromptInput', PromptInput)
  vueApp.component('Conversation', Conversation)
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
  vueApp.component('Tool', Tool)
  vueApp.component('ToolInputStreaming', ToolInputStreaming)
  vueApp.component('ToolInputAvailable', ToolInputAvailable)
  vueApp.component('ToolOutputAvailable', ToolOutputAvailable)
  vueApp.component('ToolOutputError', ToolOutputError)
  vueApp.component('ModelSelector', ModelSelector)
  vueApp.component('Context', Context)
  vueApp.component('Confirmation', Confirmation)
  vueApp.component('ConfirmationAccepted', ConfirmationAccepted)
  vueApp.component('ConfirmationRejected', ConfirmationRejected)
  vueApp.component('ConfirmationRequest', ConfirmationRequest)
  vueApp.component('Reasoning', Reasoning)
  vueApp.component('WebPreview', WebPreview)
})
