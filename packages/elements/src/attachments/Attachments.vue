<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AttachmentVariant } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide } from 'vue'
import { AttachmentsKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  variant?: AttachmentVariant
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grid',
})

const variant = computed(() => props.variant)

provide(AttachmentsKey, { variant })
</script>

<template>
  <div
    :class="
      cn(
        'flex items-start',
        variant === 'list' ? 'flex-col gap-2' : 'flex-wrap gap-2',
        variant === 'grid' && 'ml-auto w-fit',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
