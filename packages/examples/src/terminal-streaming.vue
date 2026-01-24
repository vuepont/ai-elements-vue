<script setup lang="ts">
import { Terminal } from '@repo/elements/terminal'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const lines = [
  '\x1B[36m$\x1B[0m npm install',
  'Installing dependencies...',
  '\x1B[32m✓\x1B[0m react@19.0.0',
  '\x1B[32m✓\x1B[0m typescript@5.0.0',
  '\x1B[32m✓\x1B[0m vite@5.0.0',
  '',
  '\x1B[32mDone!\x1B[0m Installed 3 packages in 1.2s',
]

const output = ref('')
const isStreaming = ref(true)
let interval: number | undefined

onMounted(() => {
  let lineIndex = 0
  interval = window.setInterval(() => {
    if (lineIndex < lines.length) {
      output.value += (output.value ? '\n' : '') + lines[lineIndex]
      lineIndex++
    }
    else {
      isStreaming.value = false
      if (interval)
        clearInterval(interval)
    }
  }, 500)
})

onBeforeUnmount(() => {
  if (interval)
    clearInterval(interval)
})
</script>

<template>
  <Terminal auto-scroll :is-streaming="isStreaming" :output="output" />
</template>
