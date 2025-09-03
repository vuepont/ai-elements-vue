<script setup lang="ts">
import { SelectItem } from '@repo/shadcn-vue/components/ui/select'
import { useAttrs } from 'vue'

interface Props {
  class?: string
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
