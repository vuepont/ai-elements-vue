<script setup lang="ts">
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from '@repo/elements/stack-trace'

const sampleStackTrace = `TypeError: Cannot read properties of undefined (reading 'map')
    at Proxy.setup (/app/src/components/UserList.vue:15:23)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:173:18)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7164:25)
    at setupComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7118:36)
    at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5525:7)
    at processComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5500:9)
    at patch (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5084:11)
    at mountChildren (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5280:7)
    at mountElement (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5189:7)
    at processElement (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5154:7)`

function handleFilePathClick(path: string, line?: number, col?: number) {
  console.log(`Open file: ${path}:${line}:${col}`)
}

function handleCopy() {
  console.log('Stack trace copied')
}
</script>

<template>
  <StackTrace
    :default-open="true"
    :trace="sampleStackTrace"
    @file-path-click="handleFilePathClick"
  >
    <StackTraceHeader>
      <StackTraceError>
        <StackTraceErrorType />
        <StackTraceErrorMessage />
      </StackTraceError>
      <StackTraceActions>
        <StackTraceCopyButton
          @copy="handleCopy"
        />
        <StackTraceExpandButton />
      </StackTraceActions>
    </StackTraceHeader>
    <StackTraceContent>
      <StackTraceFrames />
    </StackTraceContent>
  </StackTrace>
</template>
