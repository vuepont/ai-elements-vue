<script setup lang="ts">
import type { IframeHTMLAttributes, VNodeChild } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'
import { useWebPreviewContext } from './context'

interface Props extends /* @vue-ignore */ IframeHTMLAttributes {
  class?: IframeHTMLAttributes['class']
  src?: string
}

const props = defineProps<Props>()

defineSlots<{
  loading: () => VNodeChild
}>()

const attrs = useAttrs()
const { url } = useWebPreviewContext()

const frameSrc = computed(() => (props.src ?? url.value) || undefined)
</script>

<template>
  <div class="flex-1">
    <iframe
      :class="cn('size-full', props.class)"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      :src="frameSrc"
      title="Preview"
      v-bind="attrs"
    />
    <slot name="loading" />
  </div>
</template>
