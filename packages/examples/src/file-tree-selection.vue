<script setup lang="ts">
import {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
} from '@repo/elements/file-tree'
import { ref } from 'vue'

const selectedPath = ref<string>()
</script>

<template>
  <FileTree
    :selected-path="selectedPath"
    @select="(path) => selectedPath = path"
  >
    <FileTreeFolder name="src" path="src">
      <FileTreeFile name="app.tsx" path="src/app.tsx" />
      <FileTreeFile name="index.ts" path="src/index.ts" />
    </FileTreeFolder>
    <FileTreeFile name="package.json" path="package.json" />
  </FileTree>
</template>
