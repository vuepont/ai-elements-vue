<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import LoaderIcon from './LoaderIcon.vue'

interface Props {
  size?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
})
</script>

<template>
  <div
    :class="cn('inline-flex animate-spin items-center justify-center', props.class)"
    v-bind="$attrs"
  >
    <LoaderIcon :size="props.size" />
  </div>
</template>
