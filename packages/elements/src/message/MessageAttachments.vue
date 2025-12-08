<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useSlots } from 'vue'

interface Props {
  wrapperClass?: HTMLAttributes['class']
}

const props = defineProps<Props>()

</script>

<template>
  <div
    v-if="$slots.default?.()"
    :class="
      cn(
        'ml-auto flex w-fit flex-wrap items-start gap-2',
        props.wrapperClass,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
