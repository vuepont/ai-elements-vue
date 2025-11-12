<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import hljs from 'highlight.js'
import { computed, onMounted, ref } from 'vue'
import { MagicString } from 'vue/compiler-sfc'
import '~/assets/css/code-theme.css'

interface Props {
  componentName?: string
  id?: string
  type?: string
  icon?: string
  class?: string
  extension?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:square-terminal',
  extension: 'vue',
})
const rawString = ref('')
const codeHtml = ref('')

// Create a map of all possible components using import.meta.glob
const rawComponents = import.meta.glob('../../../packages/examples/src/**/*.{vue,ts,js,d.ts}', {
  query: '?raw',
  import: 'default',
})

// helper to convert componentName to a filename in kebab-case
function toFileName(name?: string, ext?: string) {
  if (!name)
    throw new Error('componentName is required')

  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

  return `${kebab}.${ext || 'vue'}`
}

// Compute the component path based on props
const componentPath = computed(
  () => `../../../packages/examples/src/${toFileName(props.componentName, props.extension)}`,
)

// Load and process the component code on mount
onMounted(() => {
  loadAndProcessComponentCode()
})

// Function to load and process the component code
async function loadAndProcessComponentCode() {
  try {
    const componentCode = await fetchComponentCode()
    rawString.value = updateImportPaths(componentCode)
    codeHtml.value = hljs.highlightAuto(rawString.value, ['ts', 'html', 'css', 'js', 'd.ts']).value
  }
  catch (error: any) {
    throw new Error('Error loading component code:', error)
  }
}

// Fetch the raw code of the component dynamically
async function fetchComponentCode() {
  const path = componentPath.value
  const loadRawComponent = rawComponents[path]
  if (!loadRawComponent)
    throw new Error(`Component not found: ${path}`)

  const mod = await loadRawComponent()
  // Ensure 'mod' is string before calling trim, or handle if not string.
  if (typeof mod !== 'string') {
    throw new TypeError('Raw component code is not a string')
  }
  return mod.trim()
}

// Update import paths in the raw code using MagicString
function updateImportPaths(code: string) {
  const magicString = new MagicString(code)
  magicString.replaceAll('@repo/elements/', '@/components/ai-elements/')
  magicString.replaceAll('~/composables/', '@/composables/')
  return magicString.toString()
}
</script>

<template>
  <div
    :icon="icon"
    :class="cn('relative flex max-h-[32rem]', $props.class)"
    :code="rawString"
  >
    <CodeCopy
      class="absolute -top-12 right-0"
      :code="rawString"
    />
    <code class="min-w-full overflow-auto px-2 leading-4">
      <pre
        class="text-sm"
        v-html="codeHtml"
      />
    </code>
  </div>
</template>
