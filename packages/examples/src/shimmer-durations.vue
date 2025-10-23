<script setup lang="ts">
import { Shimmer } from '@repo/elements/shimmer'
</script>

<template>
  <div class="flex flex-col gap-6 p-8">
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        Fast (1 second)
      </p>
      <Shimmer :duration="1">
        Loading quickly...
      </Shimmer>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        Default (2 seconds)
      </p>
      <Shimmer :duration="2">
        Loading at normal speed...
      </Shimmer>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        Slow (4 seconds)
      </p>
      <Shimmer :duration="4">
        Loading slowly...
      </Shimmer>
    </div>
    <div class="text-center">
      <p class="text-sm text-muted-foreground mb-3">
        Very Slow (6 seconds)
      </p>
      <Shimmer :duration="6">
        Loading very slowly...
      </Shimmer>
    </div>
  </div>
</template>
