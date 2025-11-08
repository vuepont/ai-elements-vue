<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AlertDescription } from '@repo/shadcn-vue/components/ui/alert'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <AlertDescription :class="cn('inline', props.class)" v-bind="$attrs">
    <slot />
  </AlertDescription>
</template>
