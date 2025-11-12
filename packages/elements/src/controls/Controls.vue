<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Controls as ControlsPrimitive } from '@vue-flow/controls'
import { reactiveOmit } from '@vueuse/core'
import '@vue-flow/controls/dist/style.css'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ControlsPrimitive
    data-slot="controls"
    v-bind="delegatedProps"
    :class="cn(
      'gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!',
      '[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!',
      props.class,
    )"
  />
</template>
