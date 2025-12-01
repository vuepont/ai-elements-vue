import type { NuxtApp } from 'nuxt/app'
import * as Components from '@repo/examples'
import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentViewer from '@/components/ComponentViewer.vue'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.component('ComponentLoader', ComponentLoader)
  vueApp.component('ComponentViewer', ComponentViewer)

  Object.entries(Components).forEach(([name, component]) => {
    vueApp.component(name, component)
  })
})
