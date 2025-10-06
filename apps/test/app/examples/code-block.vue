<script setup lang="ts">
import { CodeBlock } from '@repo/elements/code-block'

const code = `<template>
  <div>
    <h1>Hello, {{ name }}!</h1>
    <p>This is an example Vue component.</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
<\/script>`
</script>

<template>
  <CodeBlock :code="code" lang="vue" />
</template>
