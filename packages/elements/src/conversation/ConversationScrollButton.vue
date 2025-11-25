<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useStickToBottomContext } from 'vue-stick-to-bottom'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const { isAtBottom, scrollToBottom } = useStickToBottomContext()
const showScrollButton = computed(() => !isAtBottom.value)

function handleClick() {
  scrollToBottom()
}
</script>

<template>
  <Button
    v-if="showScrollButton"
    :class="cn('absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full', props.class)"
    size="icon"
    type="button"
    variant="outline"
    v-bind="$attrs"
    @click="handleClick"
  >
    <ArrowDownIcon class="size-4" />
  </Button>
</template>
