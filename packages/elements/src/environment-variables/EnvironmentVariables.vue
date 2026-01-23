<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, ref, watch } from 'vue'
import { EnvironmentVariablesKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  showValues?: boolean
  defaultShowValues?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  showValues: undefined,
  defaultShowValues: false,
})

const emit = defineEmits<{
  (e: 'update:showValues', value: boolean): void
}>()

const internalShowValues = ref(props.defaultShowValues)

// Use controlled prop if present, otherwise use internal state
const showValues = ref(props.showValues !== undefined ? props.showValues : internalShowValues.value)

watch(
  () => props.showValues,
  (newVal) => {
    if (newVal !== undefined) {
      showValues.value = newVal
    }
  },
)

function setShowValues(show: boolean) {
  if (props.showValues === undefined) {
    internalShowValues.value = show
    showValues.value = show
  }
  emit('update:showValues', show)
}

provide(EnvironmentVariablesKey, {
  showValues,
  setShowValues,
})
</script>

<template>
  <div
    :class="cn('rounded-lg border bg-background', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
