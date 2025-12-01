<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectItem } from '@repo/shadcn-vue/components/ui/select'
import { useAttrs } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  value: string | number
}

const props = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <SelectItem :class="props.class" :value="props.value" v-bind="attrs">
    <slot />
  </SelectItem>
</template>
