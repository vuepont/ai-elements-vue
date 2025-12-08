<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useSlots } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const slots = useSlots()
</script>

<template>
  <div
    v-if="slots.default"
    :class="cn('ml-auto flex w-fit flex-wrap items-start gap-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
