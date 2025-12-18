<script setup lang="ts">
interface Props {
  componentName?: string
}

// Define props for the component
defineProps<Props>()
</script>

<template>
  <ClientOnly>
    <Suspense>
      <template #default>
        <component :is="componentName" class="docs-component-preview" />
      </template>
      <template #fallback>
        <div class="p-4" />
      </template>
    </Suspense>
  </ClientOnly>
</template>
