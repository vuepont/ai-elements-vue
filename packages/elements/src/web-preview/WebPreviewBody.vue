<script setup lang="ts">
import type { HTMLAttributes, VNodeChild } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'
import { useWebPreviewContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  src?: string
  loading?: VNodeChild
}

const props = defineProps<Props>()
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
    <slot name="loading">
      <component :is="props.loading" v-if="props.loading" />
    </slot>
  </div>
</template>
