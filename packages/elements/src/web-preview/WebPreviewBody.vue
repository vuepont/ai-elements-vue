<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useWebPreviewContext } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
  src?: string
  loading?: unknown
}>()

// const slots = useSlots()
const context = useWebPreviewContext()

const frameSrc = computed(() => (props.src ?? context.url.value) || undefined)
</script>

<template>
  <div class="flex-1">
    <iframe
      :class="cn('size-full', props.class)"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      :src="frameSrc"
      title="Preview"
      v-bind="$attrs"
    />
    <slot name="loading">
      <component :is="props.loading" v-if="props.loading" />
    </slot>
  </div>
</template>
