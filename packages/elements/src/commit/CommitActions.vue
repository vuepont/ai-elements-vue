<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-1', props.class)"
    role="group"
    v-bind="$attrs"
    @click.stop
    @keydown.enter.stop
    @keydown.space.stop
  >
    <slot />
  </div>
</template>
