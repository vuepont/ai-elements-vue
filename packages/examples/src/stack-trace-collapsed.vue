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

const errorString = `TypeError: Cannot read properties of undefined (reading 'map')
    at Proxy.setup (/app/src/components/UserList.vue:15:23)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:173:18)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7164:25)`
</script>

<template>
  <StackTrace :default-open="false" :trace="errorString">
    <StackTraceHeader>
      <StackTraceError>
        <StackTraceErrorType />
        <StackTraceErrorMessage />
      </StackTraceError>
      <StackTraceActions>
        <StackTraceCopyButton />
        <StackTraceExpandButton />
      </StackTraceActions>
    </StackTraceHeader>
    <StackTraceContent>
      <StackTraceFrames />
    </StackTraceContent>
  </StackTrace>
</template>
