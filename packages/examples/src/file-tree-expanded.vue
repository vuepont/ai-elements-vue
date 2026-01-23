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
        <FileTreeFile name="button.tsx" path="src/components/button.tsx" />
        <FileTreeFile name="input.tsx" path="src/components/input.tsx" />
      </FileTreeFolder>
      <FileTreeFile name="index.ts" path="src/index.ts" />
    </FileTreeFolder>
  </FileTree>
</template>
