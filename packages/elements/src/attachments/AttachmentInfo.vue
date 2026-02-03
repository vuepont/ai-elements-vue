<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useAttachmentContext } from './context'
import { getAttachmentLabel } from './utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  showMediaType?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  showMediaType: false,
})

const { data, variant } = useAttachmentContext()
const label = computed(() => getAttachmentLabel(data.value))
</script>

<template>
  <div
    v-if="variant !== 'grid'"
    :class="cn('min-w-0 flex-1', props.class)"
    v-bind="$attrs"
  >
    <span class="block truncate">{{ label }}</span>
    <span
      v-if="props.showMediaType && data.mediaType"
      class="block truncate text-muted-foreground text-xs"
    >
      {{ data.mediaType }}
    </span>
  </div>
</template>
