<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useMessageBranch } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { currentBranch, totalBranches } = useMessageBranch()
</script>

<template>
  <ButtonGroupText
    :class="
      cn(
        'border-none bg-transparent text-muted-foreground shadow-none',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    {{ currentBranch + 1 }} of {{ totalBranches }}
  </ButtonGroupText>
</template>
