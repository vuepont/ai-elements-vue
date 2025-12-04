<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/shadcn-vue/components/ui/avatar'
import { computed, useAttrs } from 'vue'

interface Props {
  src: string
  name?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const attrs = useAttrs()

const fallbackText = computed(() => props.name?.slice(0, 2) ?? 'ME')
</script>

<template>
  <Avatar class="size-8 ring-1 ring-border" :class="[props.class]" v-bind="attrs">
    <AvatarImage alt="" class="mt-0 mb-0" :src="props.src" />
    <AvatarFallback>{{ fallbackText }}</AvatarFallback>
  </Avatar>
</template>
