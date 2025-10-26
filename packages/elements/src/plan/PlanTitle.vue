<script setup lang="ts">
import { CardTitle } from '@repo/shadcn-vue/components/ui/card'
import { Shimmer } from '../shimmer'
import { usePlan } from './context'

const { isStreaming } = usePlan()
</script>

<template>
  <CardTitle data-slot="plan-title" v-bind="$attrs">
    <Shimmer v-if="isStreaming">
      <slot />
    </Shimmer>
    <slot v-else />
  </CardTitle>
</template>
