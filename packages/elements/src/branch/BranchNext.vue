<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronRightIcon } from 'lucide-vue-next'
import { computed, useAttrs } from 'vue'
import { useBranchContext } from './context'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()
const { goToNext, totalBranches } = useBranchContext()

const classes = computed(() => cn(
  'size-7 shrink-0 rounded-full text-muted-foreground transition-colors',
  'hover:bg-accent hover:text-foreground',
  'disabled:pointer-events-none disabled:opacity-50',
  props.class,
))
</script>

<template>
  <Button
    aria-label="Next branch"
    :class="classes"
    :disabled="totalBranches <= 1"
    size="icon"
    type="button"
    variant="ghost"
    v-bind="attrs"
    @click="goToNext"
  >
    <slot>
      <ChevronRightIcon :size="14" />
    </slot>
  </Button>
</template>
