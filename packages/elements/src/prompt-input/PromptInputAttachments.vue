<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { usePromptInput } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { files } = usePromptInput()
</script>

<template>
  <div
    v-if="files.length > 0"
    :class="cn('flex flex-wrap items-center gap-2 p-3 w-full', props.class)"
  >
    <template v-for="file in files" :key="file.id">
      <slot :file="file" />
    </template>
  </div>
</template>
