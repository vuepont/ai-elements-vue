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
    at Proxy.setup (/app/src/App.vue:42:5)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:173:18)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7164:25)
    at setupComponent (node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7118:36)`
</script>

<template>
  <StackTrace :default-open="true" :trace="errorString">
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
      <StackTraceFrames :show-internal-frames="false" />
    </StackTraceContent>
  </StackTrace>
</template>
