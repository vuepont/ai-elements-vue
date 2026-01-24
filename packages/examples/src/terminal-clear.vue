<script setup lang="ts">
import { Terminal } from '@repo/elements/terminal'
import { ref } from 'vue'

const initialOutput = `\x1B[36m$\x1B[0m npm run build
Building project...
\x1B[32m✓\x1B[0m Compiled successfully
\x1B[32m✓\x1B[0m Bundle size: 124kb`

const output = ref(initialOutput)

function handleClear() {
  output.value = ''
}
</script>

<template>
  <Terminal :output="output" @clear="handleClear" />
</template>
