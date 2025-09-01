<script setup lang="ts">
import { SelectContent } from '@repo/shadcn-vue/components/ui/select'
import { useAttrs } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <SelectContent :class="props.class" v-bind="attrs" />
</template>
