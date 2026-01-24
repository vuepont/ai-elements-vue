<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { HttpMethod, SchemaParameter, SchemaProperty } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide } from 'vue'
import { SchemaDisplayKey } from './context'
import SchemaDisplayContent from './SchemaDisplayContent.vue'
import SchemaDisplayDescription from './SchemaDisplayDescription.vue'
import SchemaDisplayHeader from './SchemaDisplayHeader.vue'
import SchemaDisplayMethod from './SchemaDisplayMethod.vue'
import SchemaDisplayParameters from './SchemaDisplayParameters.vue'
import SchemaDisplayPath from './SchemaDisplayPath.vue'
import SchemaDisplayRequest from './SchemaDisplayRequest.vue'
import SchemaDisplayResponse from './SchemaDisplayResponse.vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  method: HttpMethod
  path: string
  description?: string
  parameters?: SchemaParameter[]
  requestBody?: SchemaProperty[]
  responseBody?: SchemaProperty[]
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

provide(SchemaDisplayKey, {
  method: props.method,
  path: props.path,
  description: props.description,
  parameters: props.parameters,
  requestBody: props.requestBody,
  responseBody: props.responseBody,
})
</script>

<template>
  <div
    :class="cn(
      'overflow-hidden rounded-lg border bg-background',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>
      <SchemaDisplayHeader>
        <div class="flex items-center gap-3">
          <SchemaDisplayMethod />
          <SchemaDisplayPath />
        </div>
      </SchemaDisplayHeader>
      <SchemaDisplayDescription v-if="description" />
      <SchemaDisplayContent>
        <SchemaDisplayParameters v-if="parameters && parameters.length > 0" />
        <SchemaDisplayRequest v-if="requestBody && requestBody.length > 0" />
        <SchemaDisplayResponse v-if="responseBody && responseBody.length > 0" />
      </SchemaDisplayContent>
    </slot>
  </div>
</template>
