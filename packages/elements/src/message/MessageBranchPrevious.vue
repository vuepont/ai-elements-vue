<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ChevronLeftIcon } from 'lucide-vue-next'
import { useMessageBranchContext } from './context'

const { goToPrevious, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Previous branch"
    :disabled="totalBranches <= 1"
    size="icon-sm"
    type="button"
    variant="ghost"
    v-bind="$attrs"
    @click="goToPrevious"
  >
    <slot>
      <ChevronLeftIcon :size="14" />
    </slot>
  </Button>
</template>
