<script lang="ts" setup>
import { Loader } from '@repo/elements/loader'
</script>

<template>
  <div class="flex items-center gap-8 p-8">
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Small (16px)
      </p>
      <Loader :size="16" />
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Medium (24px)
      </p>
      <Loader :size="24" />
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Large (32px)
      </p>
      <Loader :size="32" />
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Extra Large (48px)
      </p>
      <Loader :size="48" />
    </div>
  </div>
</template>
