<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuContent } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenuContent
    align="start"
    :class="cn('w-[240px]', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuContent>
</template>
