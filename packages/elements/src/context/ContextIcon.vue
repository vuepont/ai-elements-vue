<script setup lang="ts">
import { computed } from 'vue'
import { useContextSchema } from './context'

const ICON_RADIUS = 10
const ICON_VIEWBOX = 24
const ICON_CENTER = 12
const ICON_STROKE_WIDTH = 2

const context = useContextSchema()

const circumference = 2 * Math.PI * ICON_RADIUS

const usedPercent = computed(() => {
  const { usedTokens, maxTokens } = context.value
  if (!maxTokens) {
    return 0
  }
  return usedTokens / maxTokens
})

const dashOffset = computed(() => circumference * (1 - usedPercent.value))
</script>

<template>
  <svg
    aria-label="Model context usage"
    height="20"
    role="img"
    style="color: currentcolor"
    :viewBox="`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`"
    width="20"
  >
    <circle
      :cx="ICON_CENTER"
      :cy="ICON_CENTER"
      fill="none"
      opacity="0.25"
      :r="ICON_RADIUS"
      stroke="currentColor"
      :stroke-width="ICON_STROKE_WIDTH"
    />
    <circle
      :cx="ICON_CENTER"
      :cy="ICON_CENTER"
      fill="none"
      opacity="0.7"
      :r="ICON_RADIUS"
      stroke="currentColor"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
      :stroke-width="ICON_STROKE_WIDTH"
      style="transform-origin: center; transform: rotate(-90deg);"
    />
  </svg>
</template>
