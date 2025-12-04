<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { reactiveOmit, useDebounceFn } from '@vueuse/core'
import { computed, onBeforeUnmount, provide, ref, watch } from 'vue'
import { CodeBlockKey } from './context'
import { highlightCode } from './utils'

const props = withDefaults(
  defineProps<{
    code: string
    language: BundledLanguage
    showLineNumbers?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    showLineNumbers: false,
  },
)

const delegatedProps = reactiveOmit(props, 'code', 'language', 'showLineNumbers', 'class')

const html = ref('')
const darkHtml = ref('')

provide(CodeBlockKey, {
  code: computed(() => props.code),
})

let requestId = 0
let isUnmounted = false

const updateHighlight = useDebounceFn(async (code: string, language: BundledLanguage, showLineNumbers: boolean) => {
  requestId += 1
  const currentId = requestId

  try {
    const [light, dark] = await highlightCode(code, language, showLineNumbers)

    if (currentId === requestId && !isUnmounted) {
      html.value = light
      darkHtml.value = dark
    }
  }
  catch (error) {
    console.error('[CodeBlock] highlight failed', error)
  }
}, 100)

watch(
  () => [props.code, props.language, props.showLineNumbers] as const,
  ([code, language, showLineNumbers]) => {
    updateHighlight(code, language, showLineNumbers)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  isUnmounted = true
})
</script>

<template>
  <div
    data-slot="code-block"
    v-bind="delegatedProps"
    :class="cn('group relative w-full overflow-hidden rounded-md border bg-background text-foreground', props.class)"
  >
    <div class="relative">
      <div
        class="overflow-hidden dark:hidden [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
        v-html="html"
      />
      <div
        class="hidden overflow-hidden dark:block [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
        v-html="darkHtml"
      />
      <div v-if="$slots.default" class="absolute top-2 right-2 flex items-center gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>
