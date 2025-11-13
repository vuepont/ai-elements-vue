<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tokens?: number
  costText?: string
}>()

const formattedTokens = computed(() => {
  return props.tokens === undefined
    ? '—'
    : new Intl.NumberFormat('en-US', {
        notation: 'compact',
      }).format(props.tokens)
})
</script>

<template>
  <span>
    {{ formattedTokens }}
    <span v-if="costText" class="ml-2 text-muted-foreground">
      • {{ costText }}
    </span>
  </span>
</template>
