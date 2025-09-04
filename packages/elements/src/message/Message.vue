<script setup lang="ts">
interface Props {
  from: 'user' | 'assistant'
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="group flex w-full items-end justify-end gap-2 py-4 [&>div]:max-w-[80%]"
    :class="[
      props.from === 'user'
        ? 'is-user'
        : 'is-assistant flex-row-reverse justify-end',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>
