<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectValue } from '@repo/shadcn-vue/components/ui/select'
import { useAttrs } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const attrs = useAttrs()
</script>

<template>
  <SelectValue :class="props.class" v-bind="attrs" />
</template>
