<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span :class="props.class" v-bind="$attrs">
    <slot>•</slot>
  </span>
</template>
