<script setup lang="ts">
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from '@repo/elements/web-preview'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  Maximize2Icon,
  MousePointerClickIcon,
  RefreshCcwIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'

const exampleLogs = [
  {
    level: 'log' as const,
    message: 'Page loaded successfully',
    timestamp: new Date(Date.now() - 10_000),
  },
  {
    level: 'warn' as const,
    message: 'Deprecated API usage detected',
    timestamp: new Date(Date.now() - 5000),
  },
  {
    level: 'error' as const,
    message: 'Failed to load resource',
    timestamp: new Date(),
  },
]

const fullscreen = ref(false)
</script>

<template>
  <WebPreview
    default-url="/"
    :style="{ height: fullscreen ? '100%' : '400px' }"
    @url-change="(url) => console.log('URL changed to:', url)"
  >
    <WebPreviewNavigation>
      <WebPreviewNavigationButton
        tooltip="Go back"
        @click="() => console.log('Go back')"
      >
        <ArrowLeftIcon class="size-4" />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton
        tooltip="Go forward"
        @click="() => console.log('Go forward')"
      >
        <ArrowRightIcon class="size-4" />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton
        tooltip="Reload"
        @click="() => console.log('Reload')"
      >
        <RefreshCcwIcon class="size-4" />
      </WebPreviewNavigationButton>
      <WebPreviewUrl />
      <WebPreviewNavigationButton
        tooltip="Select"
        @click="() => console.log('Select')"
      >
        <MousePointerClickIcon class="size-4" />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton
        tooltip="Open in new tab"
        @click="() => console.log('Open in new tab')"
      >
        <ExternalLinkIcon class="size-4" />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton
        tooltip="Maximize"
        @click="() => (fullscreen = !fullscreen)"
      >
        <Maximize2Icon class="size-4" />
      </WebPreviewNavigationButton>
    </WebPreviewNavigation>

    <WebPreviewBody src="https://preview-v0me-kzml7zc6fkcvbyhzrf47.vusercontent.net/" />

    <WebPreviewConsole :logs="exampleLogs" />
  </WebPreview>
</template>
