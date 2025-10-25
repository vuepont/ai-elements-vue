<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BookIcon } from 'lucide-vue-next'

const props = defineProps<{
  href: string
  title: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <a
    :class="cn('flex items-center gap-2', props.class)"
    :href="props.href"
    rel="noreferrer"
    target="_blank"
  >
    <!-- Default slot content -->
    <slot>
      <BookIcon class="h-4 w-4" />
      <span class="block font-medium">{{ props.title }}</span>
    </slot>
  </a>
</template>
