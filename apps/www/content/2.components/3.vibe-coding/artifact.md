---
title: Artifact
icon: lucide:file-code
description: A container component for displaying generated content like code, documents, or other outputs with built-in actions.
---

The `Artifact` component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.

<!-- <Preview path="artifact" /> -->

## Installation

<!-- <ElementsInstaller path="artifact" /> -->

## Features

- Structured container with header and content areas
- Built-in header with title and description support
- Flexible action buttons with tooltips
- Customizable styling for all subcomponents
- Support for close buttons and action groups
- Clean, modern design with border and shadow
- Responsive layout that adapts to content
- TypeScript support with proper type definitions
- Composable architecture for maximum flexibility

## Examples

### With Code Display

<!-- <Preview path="artifact" /> -->

## Props

### `<Artifact />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLDivElement>"}
  Any other props are spread to the underlying div element.
  ::
:::

### `<ArtifactHeader />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLDivElement>"}
  Any other props are spread to the underlying div element.
  ::
:::

### `<ArtifactTitle />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLParagraphElement>"}
  Any other props are spread to the underlying paragraph element.
  ::
:::

### `<ArtifactDescription />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLParagraphElement>"}
  Any other props are spread to the underlying paragraph element.
  ::
:::

### `<ArtifactActions />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLDivElement>"}
  Any other props are spread to the underlying div element.
  ::
:::

### `<ArtifactAction />`

:::field-group
  ::field{name="tooltip" type="string"}
  Tooltip text to display on hover.
  ::

  ::field{name="label" type="string"}
  Screen reader label for the action button.
  ::

  ::field{name="icon" type="LucideIcon"}
  Lucide icon component to display in the button.
  ::

  ::field{name="...props" type="React.ComponentProps<typeof Button>"}
  Any other props are spread to the underlying shadcn/ui Button component.
  ::
:::

### `<ArtifactClose />`

:::field-group
  ::field{name="...props" type="React.ComponentProps<typeof Button>"}
  Any other props are spread to the underlying shadcn/ui Button component.
  ::
:::

### `<ArtifactContent />`

:::field-group
  ::field{name="...props" type="React.HTMLAttributes<HTMLDivElement>"}
  Any other props are spread to the underlying div element.
  ::
:::

::code-snippet
---
file: ~/components/CodeViewerTab.vue
language: vue
---
::
