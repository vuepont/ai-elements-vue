<script setup lang="ts">
import type { ConnectionLineProps } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<ConnectionLineProps>()

const HALF = 0.5

const pathD = computed(() => {
  const { sourceX, sourceY, targetX, targetY } = props
  const controlX1 = sourceX + (targetX - sourceX) * HALF
  const controlX2 = sourceX + (targetX - sourceX) * HALF
  return `M${sourceX},${sourceY} C ${controlX1},${sourceY} ${controlX2},${targetY} ${targetX},${targetY}`
})
</script>

<template>
  <g>
    <path
      class="animated"
      fill="none"
      stroke="var(--color-ring)"
      :stroke-width="1"
      :d="pathD"
    />

    <circle
      :cx="targetX"
      :cy="targetY"
      fill="#fff"
      :r="3"
      stroke="var(--color-ring)"
      :stroke-width="1"
    />
  </g>
</template>
