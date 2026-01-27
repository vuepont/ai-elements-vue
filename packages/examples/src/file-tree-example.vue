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
      <FileTreeFolder name="components" path="src/components">
        <FileTreeFile name="button.vue" path="src/components/button.vue" />
        <FileTreeFile name="input.vue" path="src/components/input.vue" />
        <FileTreeFile name="modal.vue" path="src/components/modal.vue" />
      </FileTreeFolder>
      <FileTreeFolder name="composables" path="src/composables">
        <FileTreeFile name="use-auth.ts" path="src/composables/use-auth.ts" />
        <FileTreeFile name="use-theme.ts" path="src/composables/use-theme.ts" />
      </FileTreeFolder>
      <FileTreeFolder name="lib" path="src/lib">
        <FileTreeFile name="utils.ts" path="src/lib/utils.ts" />
      </FileTreeFolder>
      <FileTreeFile name="app.vue" path="src/app.vue" />
      <FileTreeFile name="main.ts" path="src/main.ts" />
    </FileTreeFolder>
    <FileTreeFile name="package.json" path="package.json" />
    <FileTreeFile name="tsconfig.json" path="tsconfig.json" />
    <FileTreeFile name="README.md" path="README.md" />
  </FileTree>
</template>
