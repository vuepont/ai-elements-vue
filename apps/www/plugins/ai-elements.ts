import {
  Actions,
  ActionsHover,
  Branch,
  Conversation,
  Image,
  Loader,
  LoaderCustomStyling,
  LoaderSizes,
  Message,
  MessageMarkdown,
  PromptInput,
  Response,
  Shimmer,
  ShimmerCustomElements,
  ShimmerDurations,
} from '@repo/examples'

import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentViewer from '@/components/ComponentViewer.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.component('ComponentLoader', ComponentLoader)
  vueApp.component('ComponentViewer', ComponentViewer)

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
  vueApp.component('Loader', Loader)
  vueApp.component('LoaderCustomStyling', LoaderCustomStyling)
  vueApp.component('LoaderSizes', LoaderSizes)
})
