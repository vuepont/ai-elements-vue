<script setup lang="ts">
import { CodeBlock, CodeBlockCopyButton } from '@repo/elements/code-block'

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

function handleCopy() {
  // eslint-disable-next-line no-console
  console.log('Copied code to clipboard')
}

function handleError(error: Error) {
  console.error('Failed to copy code to clipboard', error)
}
</script>

<template>
  <CodeBlock :code="code" language="vue">
    <CodeBlockCopyButton
      @copy="handleCopy"
      @error="handleError"
    />
  </CodeBlock>
</template>
