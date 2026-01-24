<script setup lang="ts">
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from '@repo/elements/terminal'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const ansiOutput = `\x1B[32m✓\x1B[0m Compiled successfully in 1.2s

\x1B[1m\x1B[34minfo\x1B[0m  - Collecting page data...
\x1B[1m\x1B[34minfo\x1B[0m  - Generating static pages (0/3)
\x1B[32m✓\x1B[0m Generated static pages (3/3)

\x1B[1m\x1B[33mwarn\x1B[0m  - Using \x1B[1mexperimental\x1B[0m server actions

\x1B[36mRoute (app)\x1B[0m                              \x1B[36mSize\x1B[0m     \x1B[36mFirst Load JS\x1B[0m
\x1B[37m┌ ○ /\x1B[0m                                    \x1B[32m5.2 kB\x1B[0m   \x1B[32m87.3 kB\x1B[0m
\x1B[37m├ ○ /about\x1B[0m                               \x1B[32m2.1 kB\x1B[0m   \x1B[32m84.2 kB\x1B[0m
\x1B[37m└ ○ /contact\x1B[0m                             \x1B[32m3.8 kB\x1B[0m   \x1B[32m85.9 kB\x1B[0m

\x1B[32m✓\x1B[0m Build completed successfully!
\x1B[90mTotal time: 3.45s\x1B[0m
`

const output = ref('')
const isStreaming = ref(true)
let interval: number | undefined

onMounted(() => {
  let index = 0
  interval = window.setInterval(() => {
    if (index < ansiOutput.length) {
      output.value = ansiOutput.slice(0, index + 10)
      index += 10
    }
    else {
      isStreaming.value = false
      if (interval)
        clearInterval(interval)
    }
  }, 20)
})

onBeforeUnmount(() => {
  if (interval)
    clearInterval(interval)
})

function handleClear() {
  output.value = ''
  isStreaming.value = false
}

function handleCopy() {
  // eslint-disable-next-line no-console
  console.log('Copied!')
}
</script>

<template>
  <Terminal
    :auto-scroll="true"
    :is-streaming="isStreaming"
    :output="output"
    @clear="handleClear"
  >
    <TerminalHeader>
      <TerminalTitle>Build Output</TerminalTitle>
      <div class="flex items-center gap-1">
        <TerminalStatus />
        <TerminalActions>
          <TerminalCopyButton @copy="handleCopy" />
          <TerminalClearButton />
        </TerminalActions>
      </div>
    </TerminalHeader>
    <TerminalContent />
  </Terminal>
</template>
