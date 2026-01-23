<script setup lang="ts">
import {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
} from '@repo/elements/file-tree'
</script>

<template>
  <FileTree>
    <FileTreeFolder name="src" path="src">
      <FileTreeFile name="index.ts" path="src/index.ts" />
    </FileTreeFolder>
    <FileTreeFile name="package.json" path="package.json" />
  </FileTree>
</template>
