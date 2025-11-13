<script lang="ts" setup>
interface Props {
  componentName?: string
  id?: string
  type?: string
  label?: string
  class?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'lucide:square-terminal',
})
</script>

<template>
  <div class="my-4 w-full space-y-8">
    <ClientOnly class="overflow-scroll">
      <CodeGroup>
        <div
          :label="label || componentName"
          icon="lucide:laptop-minimal"
        >
          <ComponentViewer :component-name="componentName" />
        </div>
        <CodeViewerTab
          v-bind="$props"
          label="Code"
        />
      </CodeGroup>
    </ClientOnly>
  </div>
</template>
