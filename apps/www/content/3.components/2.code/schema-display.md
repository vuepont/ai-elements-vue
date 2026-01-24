---
title: Schema Display
description: Display REST API endpoint documentation with parameters, request/response bodies.
icon: lucide:layout-template
---

The `SchemaDisplay` component visualizes REST API endpoints with HTTP methods, paths, parameters, and request/response schemas.

:::ComponentLoader{label="Preview" componentName="SchemaDisplay"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add schema-display
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/schema-display.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [SchemaDisplay.vue] height=500 collapse
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
  ```

  ```vue [SchemaDisplayHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      :class="cn('flex items-center gap-3 border-b px-4 py-3', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [SchemaDisplayMethod.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { HttpMethod } from './context'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useSchemaDisplayContext } from './context'

  type BadgeProps = InstanceType<typeof Badge>['$props']

  interface Props extends /* @vue-ignore */ BadgeProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { method } = useSchemaDisplayContext('SchemaDisplayMethod')

  const methodStyles: Record<HttpMethod, string> = {
    GET: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    PUT: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    PATCH:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  </script>

  <template>
    <Badge
      :class="cn('font-mono text-xs', methodStyles[method], props.class)"
      variant="secondary"
      v-bind="$attrs"
    >
      <slot>{{ method }}</slot>
    </Badge>
  </template>
  ```

  ```vue [SchemaDisplayPath.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'
  import { useSchemaDisplayContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { path } = useSchemaDisplayContext('SchemaDisplayPath')

  // Highlight path parameters
  const highlightedPath = computed(() => path.replace(
    /\{([^}]+)\}/g,
    '<span class="text-blue-600 dark:text-blue-400">{$1}</span>',
  ))
  </script>

  <template>
    <span
      :class="cn('font-mono text-sm', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="highlightedPath" />
      </slot>
    </span>
  </template>
  ```

  ```vue [SchemaDisplayDescription.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useSchemaDisplayContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { description } = useSchemaDisplayContext('SchemaDisplayDescription')
  </script>

  <template>
    <p
      :class="cn(
        'border-b px-4 py-3 text-muted-foreground text-sm',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot>{{ description }}</slot>
    </p>
  </template>
  ```

  ```vue [SchemaDisplayContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('divide-y', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [SchemaDisplayParameters.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronRightIcon } from 'lucide-vue-next'
  import { useSchemaDisplayContext } from './context'
  import SchemaDisplayParameter from './SchemaDisplayParameter.vue'

  type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { parameters } = useSchemaDisplayContext('SchemaDisplayParameters')
  </script>

  <template>
    <Collapsible :class="cn(props.class)" :default-open="true" v-bind="$attrs">
      <CollapsibleTrigger class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <span class="font-medium text-sm">Parameters</span>
        <Badge class="ml-auto text-xs" variant="secondary">
          {{ parameters?.length }}
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="divide-y border-t">
          <slot>
            <SchemaDisplayParameter
              v-for="param in parameters"
              :key="param.name"
              v-bind="param"
            />
          </slot>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </template>
  ```

  ```vue [SchemaDisplayParameter.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SchemaParameter } from './context'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes, SchemaParameter {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('px-4 py-3 pl-10', props.class)" v-bind="$attrs">
      <div class="flex items-center gap-2">
        <span class="font-mono text-sm">{{ name }}</span>
        <Badge class="text-xs" variant="outline">
          {{ type }}
        </Badge>
        <Badge v-if="location" class="text-xs" variant="secondary">
          {{ location }}
        </Badge>
        <Badge
          v-if="required"
          class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
          variant="secondary"
        >
          required
        </Badge>
      </div>
      <p v-if="description" class="mt-1 text-muted-foreground text-sm">
        {{ description }}
      </p>
    </div>
  </template>
  ```

  ```vue [SchemaDisplayRequest.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronRightIcon } from 'lucide-vue-next'
  import { useSchemaDisplayContext } from './context'
  import SchemaDisplayProperty from './SchemaDisplayProperty.vue'

  type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { requestBody } = useSchemaDisplayContext('SchemaDisplayRequest')
  </script>

  <template>
    <Collapsible :class="cn(props.class)" :default-open="true" v-bind="$attrs">
      <CollapsibleTrigger class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <span class="font-medium text-sm">Request Body</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="border-t">
          <slot>
            <SchemaDisplayProperty
              v-for="prop in requestBody"
              :key="prop.name"
              v-bind="prop"
              :depth="0"
            />
          </slot>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </template>
  ```

  ```vue [SchemaDisplayResponse.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronRightIcon } from 'lucide-vue-next'
  import { useSchemaDisplayContext } from './context'
  import SchemaDisplayProperty from './SchemaDisplayProperty.vue'

  type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { responseBody } = useSchemaDisplayContext('SchemaDisplayResponse')
  </script>

  <template>
    <Collapsible :class="cn(props.class)" :default-open="true" v-bind="$attrs">
      <CollapsibleTrigger class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <span class="font-medium text-sm">Response</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="border-t">
          <slot>
            <SchemaDisplayProperty
              v-for="prop in responseBody"
              :key="prop.name"
              v-bind="prop"
              :depth="0"
            />
          </slot>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </template>
  ```

  ```vue [SchemaDisplayBody.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('divide-y', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [SchemaDisplayProperty.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SchemaProperty } from './context'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronRightIcon } from 'lucide-vue-next'
  import { computed } from 'vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes, SchemaProperty {
    depth?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    depth: 0,
  })

  const hasChildren = computed(() => !!(props.properties || props.items))
  const paddingLeft = computed(() => 40 + props.depth * 16)
  </script>

  <template>
    <Collapsible v-if="hasChildren" :default-open="depth < 2">
      <CollapsibleTrigger
        :class="cn(
          'group flex w-full items-center gap-2 py-3 text-left transition-colors hover:bg-muted/50',
          props.class,
        )"
        :style="{ paddingLeft: `${paddingLeft}px` }"
      >
        <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <span class="font-mono text-sm">{{ name }}</span>
        <Badge class="text-xs" variant="outline">
          {{ type }}
        </Badge>
        <Badge
          v-if="required"
          class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
          variant="secondary"
        >
          required
        </Badge>
      </CollapsibleTrigger>
      <p
        v-if="description"
        class="pb-2 text-muted-foreground text-sm"
        :style="{ paddingLeft: `${paddingLeft + 24}px` }"
      >
        {{ description }}
      </p>
      <CollapsibleContent>
        <div class="divide-y border-t">
          <SchemaDisplayProperty
            v-for="prop in properties"
            :key="prop.name"
            v-bind="prop"
            :depth="depth + 1"
          />
          <SchemaDisplayProperty
            v-if="items"
            v-bind="items"
            :depth="depth + 1"
            :name="`${name}[]`"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>

    <div
      v-else
      :class="cn('py-3 pr-4', props.class)"
      :style="{ paddingLeft: `${paddingLeft}px` }"
      v-bind="$attrs"
    >
      <div class="flex items-center gap-2">
        <span class="size-4" /> <!-- Spacer for alignment -->
        <span class="font-mono text-sm">{{ name }}</span>
        <Badge class="text-xs" variant="outline">
          {{ type }}
        </Badge>
        <Badge
          v-if="required"
          class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
          variant="secondary"
        >
          required
        </Badge>
      </div>
      <p v-if="description" class="mt-1 pl-6 text-muted-foreground text-sm">
        {{ description }}
      </p>
    </div>
  </template>
  ```

  ```vue [SchemaDisplayExample.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <pre
      :class="cn(
        'mx-4 mb-4 overflow-auto rounded-md bg-muted p-4 font-mono text-sm',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </pre>
  </template>
  ```

  ```ts [context.ts] height=500 collapse
  import type { InjectionKey } from 'vue'
  import { inject } from 'vue'

  export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

  export interface SchemaParameter {
    name: string
    type: string
    required?: boolean
    description?: string
    location?: 'path' | 'query' | 'header'
  }

  export interface SchemaProperty {
    name: string
    type: string
    required?: boolean
    description?: string
    properties?: SchemaProperty[]
    items?: SchemaProperty
  }

  export interface SchemaDisplayContextValue {
    method: HttpMethod
    path: string
    description?: string
    parameters?: SchemaParameter[]
    requestBody?: SchemaProperty[]
    responseBody?: SchemaProperty[]
  }

  export const SchemaDisplayKey: InjectionKey<SchemaDisplayContextValue> = Symbol('SchemaDisplay')

  export function useSchemaDisplayContext(componentName: string): SchemaDisplayContextValue {
    const context = inject(SchemaDisplayKey)

    if (!context) {
      throw new Error(`${componentName} must be used within SchemaDisplay`)
    }

    return context
  }
  ```

  ```ts [index.ts]
  export { default as SchemaDisplay } from './SchemaDisplay.vue'
  export { default as SchemaDisplayBody } from './SchemaDisplayBody.vue'
  export { default as SchemaDisplayContent } from './SchemaDisplayContent.vue'
  export { default as SchemaDisplayDescription } from './SchemaDisplayDescription.vue'
  export { default as SchemaDisplayExample } from './SchemaDisplayExample.vue'
  export { default as SchemaDisplayHeader } from './SchemaDisplayHeader.vue'
  export { default as SchemaDisplayMethod } from './SchemaDisplayMethod.vue'
  export { default as SchemaDisplayParameter } from './SchemaDisplayParameter.vue'
  export { default as SchemaDisplayParameters } from './SchemaDisplayParameters.vue'
  export { default as SchemaDisplayPath } from './SchemaDisplayPath.vue'
  export { default as SchemaDisplayProperty } from './SchemaDisplayProperty.vue'
  export { default as SchemaDisplayRequest } from './SchemaDisplayRequest.vue'
  export { default as SchemaDisplayResponse } from './SchemaDisplayResponse.vue'
  ```

:::

## Features

- Color-coded HTTP methods
- Path parameter highlighting
- Collapsible parameters section
- Request/response body schemas
- Nested object property display
- Required field indicators

## Method Colors

| Method | Color |
|--------|-------|
| `GET` | Green |
| `POST` | Blue |
| `PUT` | Orange |
| `PATCH` | Yellow |
| `DELETE` | Red |

## Examples

### Basic Usage

:::ComponentLoader{label="Basic" componentName="SchemaDisplayBasic"}
:::

### With Parameters

:::ComponentLoader{label="Parameters" componentName="SchemaDisplayParams"}
:::

### With Request/Response Bodies

:::ComponentLoader{label="Body" componentName="SchemaDisplayBody"}
:::

### Nested Properties

:::ComponentLoader{label="Nested" componentName="SchemaDisplayNested"}
:::

## Props

### `<SchemaDisplay />`

:::field-group
  ::field{name="method" type='"GET" | "POST" | "PUT" | "PATCH" | "DELETE"'}
  HTTP method.
  ::
  ::field{name="path" type="string"}
  API endpoint path.
  ::
  ::field{name="description" type="string"}
  Endpoint description.
  ::
  ::field{name="parameters" type="SchemaParameter[]"}
  URL/query parameters.
  ::
  ::field{name="requestBody" type="SchemaProperty[]"}
  Request body properties.
  ::
  ::field{name="responseBody" type="SchemaProperty[]"}
  Response body properties.
  ::
:::

### `SchemaParameter`

```ts
interface SchemaParameter {
  name: string
  type: string
  required?: boolean
  description?: string
  location?: 'path' | 'query' | 'header'
}
```

### `SchemaProperty`

```ts
interface SchemaProperty {
  name: string
  type: string
  required?: boolean
  description?: string
  properties?: SchemaProperty[] // For objects
  items?: SchemaProperty // For arrays
}
```

### Subcomponents

- `SchemaDisplayHeader` - Header container
- `SchemaDisplayMethod` - Color-coded method badge
- `SchemaDisplayPath` - Path with highlighted parameters
- `SchemaDisplayDescription` - Description text
- `SchemaDisplayContent` - Content container
- `SchemaDisplayParameters` - Collapsible parameters section
- `SchemaDisplayParameter` - Individual parameter
- `SchemaDisplayRequest` - Collapsible request body
- `SchemaDisplayResponse` - Collapsible response body
- `SchemaDisplayProperty` - Schema property (recursive)
- `SchemaDisplayExample` - Code example block
