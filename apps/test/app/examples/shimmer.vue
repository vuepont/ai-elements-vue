<script setup lang="ts">
import { Shimmer } from '@repo/elements/shimmer'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-8">
    <Shimmer>This text has a shimmer effect</Shimmer>
    <Shimmer as="h1" class="font-bold text-4xl">
      Large Heading
    </Shimmer>
    <Shimmer :duration="3" :spread="3">
      Slower shimmer with wider spread
    </Shimmer>
  </div>
</template>
