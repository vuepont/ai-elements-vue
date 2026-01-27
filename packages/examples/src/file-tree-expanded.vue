<script setup lang="ts">
import {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
} from '@repo/elements/file-tree'

const defaultExpanded = new Set(['src', 'src/components'])
</script>

<template>
  <FileTree :default-expanded="defaultExpanded">
    <FileTreeFolder name="src" path="src">
      <FileTreeFolder name="components" path="src/components">
        <FileTreeFile name="button.vue" path="src/components/button.vue" />
        <FileTreeFile name="input.vue" path="src/components/input.vue" />
      </FileTreeFolder>
      <FileTreeFile name="index.ts" path="src/index.ts" />
    </FileTreeFolder>
  </FileTree>
</template>
