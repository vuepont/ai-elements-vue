<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ChevronRightIcon } from 'lucide-vue-next'
import { useMessageBranchContext } from './context'

const { goToNext, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Next branch"
    :disabled="totalBranches <= 1"
    size="icon-sm"
    type="button"
    variant="ghost"
    v-bind="$attrs"
    @click="goToNext"
  >
    <slot>
      <ChevronRightIcon :size="14" />
    </slot>
  </Button>
</template>
