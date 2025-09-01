<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { LucideChevronDown } from 'lucide-vue-next'
import { inject, ref } from 'vue'
import { conversationContextKey } from './context'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const ctx = inject(conversationContextKey)

const isAtBottom = ctx?.isAtBottom ?? ref(true)

function handleClick() {
  ctx?.scrollToBottom('smooth')
}
</script>

<template>
  <Button
    v-if="!isAtBottom"
    class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full" :class="[
      props.class,
    ]"
    size="icon"
    type="button"
    variant="outline"
    @click="handleClick"
  >
    <LucideChevronDown class="size-4" />
  </Button>
</template>
