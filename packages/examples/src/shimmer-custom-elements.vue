<script setup lang="ts">
import { Shimmer } from '@repo/elements/shimmer'
</script>

<template>
  <div class="flex flex-col gap-6 p-8">
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        As paragraph (default)
      </p>
      <Shimmer as="p">
        This is rendered as a paragraph
      </Shimmer>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        As heading
      </p>
      <Shimmer as="h2" class="text-2xl font-bold">
        Large Heading with Shimmer
      </Shimmer>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        As span (inline)
      </p>
      <div>
        Processing your request
        <Shimmer as="span" class="inline">
          with AI magic
        </Shimmer>
        ...
      </div>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        As div with custom styling
      </p>
      <Shimmer as="div" class="text-lg font-semibold">
        Custom styled shimmer text
      </Shimmer>
    </div>
  </div>
</template>
