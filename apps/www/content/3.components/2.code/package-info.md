---
title: Package Info
description: Display dependency information and version changes.
icon: lucide:package
---

The `PackageInfo` component displays package dependency information including version changes and change type badges.

:::ComponentLoader{label="Preview" componentName="PackageInfo"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add package-info
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/package-info.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [PackageInfo.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ChangeType } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { provide } from 'vue'
  import { PackageInfoKey } from './context'
  import PackageInfoChangeType from './PackageInfoChangeType.vue'
  import PackageInfoHeader from './PackageInfoHeader.vue'
  import PackageInfoName from './PackageInfoName.vue'
  import PackageInfoVersion from './PackageInfoVersion.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    name: string
    currentVersion?: string
    newVersion?: string
    changeType?: ChangeType
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  provide(PackageInfoKey, {
    name: props.name,
    currentVersion: props.currentVersion,
    newVersion: props.newVersion,
    changeType: props.changeType,
  })
  </script>

  <template>
    <div
      :class="cn('rounded-lg border bg-background p-4', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <PackageInfoHeader>
          <PackageInfoName />
          <PackageInfoChangeType v-if="changeType" />
        </PackageInfoHeader>
        <PackageInfoVersion v-if="currentVersion || newVersion" />
      </slot>
    </div>
  </template>
  ```

  ```vue [PackageInfoHeader.vue] height=500 collapse
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
      :class="cn('flex items-center justify-between gap-2', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [PackageInfoName.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { PackageIcon } from 'lucide-vue-next'
  import { usePackageInfoContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { name } = usePackageInfoContext()
  </script>

  <template>
    <div :class="cn('flex items-center gap-2', props.class)" v-bind="$attrs">
      <PackageIcon class="size-4 text-muted-foreground" />
      <span class="font-medium font-mono text-sm">
        <slot>{{ name }}</slot>
      </span>
    </div>
  </template>
  ```

  ```vue [PackageInfoChangeType.vue] height=500 collapse
  <script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import type { ChangeType } from './context'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ArrowRightIcon, MinusIcon, PlusIcon } from 'lucide-vue-next'
  import { usePackageInfoContext } from './context'

  type BadgeProps = InstanceType<typeof Badge>['$props']

  interface Props extends /* @vue-ignore */ BadgeProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { changeType } = usePackageInfoContext()

  const changeTypeStyles: Record<ChangeType, string> = {
    major: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    minor:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    patch: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    added: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    removed: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  }

  const changeTypeIcons: Record<ChangeType, Component> = {
    major: ArrowRightIcon,
    minor: ArrowRightIcon,
    patch: ArrowRightIcon,
    added: PlusIcon,
    removed: MinusIcon,
  }
  </script>

  <template>
    <Badge
      v-if="changeType"
      :class="cn(
        'gap-1 text-xs capitalize',
        changeTypeStyles[changeType],
        props.class,
      )"
      variant="secondary"
      v-bind="$attrs"
    >
      <component :is="changeTypeIcons[changeType]" class="size-3" />
      <slot>{{ changeType }}</slot>
    </Badge>
  </template>
  ```

  ```vue [PackageInfoVersion.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ArrowRightIcon } from 'lucide-vue-next'
  import { usePackageInfoContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { currentVersion, newVersion } = usePackageInfoContext()
  </script>

  <template>
    <div
      v-if="currentVersion || newVersion"
      :class="
        cn(
          'mt-2 flex items-center gap-2 font-mono text-muted-foreground text-sm',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot>
        <span v-if="currentVersion">{{ currentVersion }}</span>
        <ArrowRightIcon v-if="currentVersion && newVersion" class="size-3" />
        <span v-if="newVersion" class="font-medium text-foreground">{{ newVersion }}</span>
      </slot>
    </div>
  </template>
  ```

  ```vue [PackageInfoDescription.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <p :class="cn('mt-2 text-muted-foreground text-sm', props.class)" v-bind="$attrs">
      <slot />
    </p>
  </template>
  ```

  ```vue [PackageInfoContent.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('mt-3 border-t pt-3', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [PackageInfoDependencies.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('space-y-2', props.class)" v-bind="$attrs">
      <span class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Dependencies
      </span>
      <div class="space-y-1">
        <slot />
      </div>
    </div>
  </template>
  ```

  ```vue [PackageInfoDependency.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    name: string
    version?: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      :class="cn('flex items-center justify-between text-sm', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <span class="font-mono text-muted-foreground">{{ name }}</span>
        <span v-if="version" class="font-mono text-xs">{{ version }}</span>
      </slot>
    </div>
  </template>
  ```

  ```ts [context.ts] height=500 collapse
  import type { InjectionKey } from 'vue'
  import { inject } from 'vue'

  export type ChangeType = 'major' | 'minor' | 'patch' | 'added' | 'removed'

  export interface PackageInfoContextValue {
    name: string
    currentVersion?: string
    newVersion?: string
    changeType?: ChangeType
  }

  export const PackageInfoKey: InjectionKey<PackageInfoContextValue> = Symbol('PackageInfo')

  export function usePackageInfoContext(): PackageInfoContextValue {
    const context = inject(PackageInfoKey)

    if (!context) {
      throw new Error('PackageInfo components must be used within PackageInfo')
    }

    return context
  }
  ```

  ```ts [index.ts]
  export { default as PackageInfo } from './PackageInfo.vue'
  export { default as PackageInfoChangeType } from './PackageInfoChangeType.vue'
  export { default as PackageInfoContent } from './PackageInfoContent.vue'
  export { default as PackageInfoDependencies } from './PackageInfoDependencies.vue'
  export { default as PackageInfoDependency } from './PackageInfoDependency.vue'
  export { default as PackageInfoDescription } from './PackageInfoDescription.vue'
  export { default as PackageInfoHeader } from './PackageInfoHeader.vue'
  export { default as PackageInfoName } from './PackageInfoName.vue'
  export { default as PackageInfoVersion } from './PackageInfoVersion.vue'
  ```

:::

## Features

- Version change display (current → new)
- Color-coded change type badges
- Dependencies list
- Description support

## Change Types

| Type | Color | Use Case |
|------|-------|----------|
| `major` | Red | Breaking changes |
| `minor` | Yellow | New features |
| `patch` | Green | Bug fixes |
| `added` | Blue | New dependency |
| `removed` | Gray | Removed dependency |

## Props

### `<PackageInfo />`

:::field-group
  ::field{name="name" type="string" required}
  Package name.
  ::
  ::field{name="currentVersion" type="string"}
  Current installed version.
  ::
  ::field{name="newVersion" type="string"}
  New version being installed.
  ::
  ::field{name="changeType" type='"major" | "minor" | "patch" | "added" | "removed"'}
  Type of version change.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<PackageInfoHeader />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the header div.
  ::
:::

### `<PackageInfoName />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom name content. Defaults to the name from context.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<PackageInfoChangeType />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom change type label. Defaults to the changeType from context.
  ::
  ::field{name="...props" type="BadgeProps"}
  Spread to the Badge component.
  ::
:::

### `<PackageInfoVersion />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom version content. Defaults to version transition display.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<PackageInfoDescription />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the p element.
  ::
:::

### `<PackageInfoContent />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<PackageInfoDependencies />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<PackageInfoDependency />`

:::field-group
  ::field{name="name" type="string" required}
  Dependency name.
  ::
  ::field{name="version" type="string"}
  Dependency version.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the row div.
  ::
:::
