<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@repo/elements/code-block'
import { FileIcon } from 'lucide-vue-next'

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
  console.log('Copied code to clipboard')
}

function handleError(error: Error) {
  console.error('Failed to copy code to clipboard', error)
}
</script>

<template>
  <div class="dark">
    <CodeBlock :code="code" language="vue">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileIcon :size="14" />
          <CodeBlockFilename>MyComponent.vue</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton
            @copy="handleCopy"
            @error="handleError"
          />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  </div>
</template>
