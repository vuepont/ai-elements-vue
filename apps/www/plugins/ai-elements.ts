import * as Components from '@repo/examples'
import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentViewer from '@/components/ComponentViewer.vue'
import ElementsDemo from '@/components/ElementsDemo.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.component('ComponentLoader', ComponentLoader)
  vueApp.component('ComponentViewer', ComponentViewer)
  vueApp.component('ElementsDemo', ElementsDemo)

  Object.entries(Components).forEach(([name, component]) => {
    vueApp.component(name, component)
  })
})
