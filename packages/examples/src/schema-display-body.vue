<script setup lang="ts">
import { SchemaDisplay } from '@repo/elements/schema-display'
</script>

<template>
  <SchemaDisplay
    method="POST"
    path="/api/posts"
    :request-body="[
      { name: 'title', type: 'string', required: true },
      { name: 'content', type: 'string', required: true },
    ]"
    :response-body="[
      { name: 'id', type: 'string', required: true },
      { name: 'createdAt', type: 'string', required: true },
    ]"
  />
</template>
