<script setup lang="ts">
interface Props {
  from: 'user' | 'assistant'
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="group flex w-full items-end gap-2 py-4 [&>div]:max-w-full"
    :class="[
      props.from === 'user'
        ? 'is-user flex-row-reverse justify-end'
        : 'is-assistant justify-start',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>
