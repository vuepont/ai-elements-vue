<script lang="ts" setup>
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/shadcn-vue/components/ui/resizable'

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
    <ClientOnly>
      <CodeGroup>
        <div
          :label="label || componentName"
          icon="lucide:laptop-minimal"
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel :default-size="100">
              <div class="h-[600px] overflow-auto">
                <ComponentViewer :component-name="componentName" />
              </div>
            </ResizablePanel>
            <ResizableHandle
              class="translate-x-px border-none [&>div]:shrink-0"
              with-handle
            />
            <ResizablePanel :default-size="0" />
          </ResizablePanelGroup>
        </div>

        <CodeViewerTab
          v-bind="$props"
          label="Code"
        />
      </CodeGroup>
    </ClientOnly>
  </div>
</template>
