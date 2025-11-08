<script setup lang="ts">
import { computed } from 'vue'
import { formatCompactNumber } from './utils'

const props = defineProps<{
  tokens?: number
  costText?: string
}>()

const formattedTokens = computed(() =>
  props.tokens === undefined ? '—' : formatCompactNumber(props.tokens),
)
</script>

<template>
  <span>
    {{ formattedTokens }}
    <span v-if="props.costText" class="ml-2 text-muted-foreground">
      • {{ props.costText }}
    </span>
  </span>
</template>
