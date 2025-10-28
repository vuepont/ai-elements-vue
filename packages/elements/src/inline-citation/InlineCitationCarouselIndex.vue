<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { carouselApi } = useCarousel()
const current = ref(0)
const count = ref(0)

const displayText = computed(() => `${current.value}/${count.value}`)

function updateState() {
  if (!carouselApi.value)
    return

  count.value = carouselApi.value.scrollSnapList().length
  current.value = carouselApi.value.selectedScrollSnap() + 1
}

const stop = watch(carouselApi, (api) => {
  if (!api)
    return

  // Watch only once
  nextTick(() => stop())

  updateState()

  api.on('select', () => {
    updateState()
  })
})
</script>

<template>
  <div
    :class="cn('flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs', props.class)"
  >
    <slot>{{ displayText }}</slot>
  </div>
</template>
