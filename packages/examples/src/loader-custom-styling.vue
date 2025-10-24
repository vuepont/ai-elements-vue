<script lang="ts" setup>
import { Loader } from '@repo/elements/loader'
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
    <!-- Blue -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Blue
      </p>
      <Loader class="text-blue-500" :size="24" />
    </div>

    <!-- Green -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Green
      </p>
      <Loader class="text-green-500" :size="24" />
    </div>

    <!-- Purple -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Purple
      </p>
      <Loader class="text-purple-500" :size="24" />
    </div>

    <!-- Orange -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Orange
      </p>
      <Loader class="text-orange-500" :size="24" />
    </div>

    <!-- Slow Animation -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Slow Animation
      </p>
      <Loader
        class="text-blue-500 animate-spin"
        :style="{ animationDuration: '3s' }"
        :size="24"
      />
    </div>

    <!-- Fast Animation -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Fast Animation
      </p>
      <Loader
        class="text-red-500 animate-spin"
        :style="{ animationDuration: '0.5s' }"
        :size="24"
      />
    </div>

    <!-- With Background -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        With Background
      </p>
      <div class="bg-gray-100 flex items-center justify-center p-3 rounded-lg">
        <Loader class="text-gray-700" :size="24" />
      </div>
    </div>

    <!-- Dark Background -->
    <div class="text-center">
      <p class="text-sm text-gray-600 mb-2">
        Dark Background
      </p>
      <div class="bg-gray-800 flex items-center justify-center p-3 rounded-lg">
        <Loader class="text-white" :size="24" />
      </div>
    </div>
  </div>
</template>
