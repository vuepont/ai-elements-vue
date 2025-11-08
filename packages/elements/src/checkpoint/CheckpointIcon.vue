<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Bookmark } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <slot>
    <Bookmark :class="cn('size-4 shrink-0', props.class)" v-bind="$attrs" />
  </slot>
</template>
