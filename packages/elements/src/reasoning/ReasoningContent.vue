<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    content?: string
  }>(),
  {
    content: '',
  },
)
</script>

<template>
  <CollapsibleContent
    :class="
      cn(
        'mt-4 text-sm',
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-muted-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>
      <StreamMarkdown :content="props.content" />
    </slot>
  </CollapsibleContent>
</template>
