---
title: Node
description: A composable node component for React Flow-based canvases with Card-based styling.
---

The `Node` component provides a composable, Card-based node for React Flow canvases. It includes support for connection handles, structured layouts, and consistent styling using shadcn/ui components.

::alert
  The Node component is designed to be used with the [Canvas](/components/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- <ElementsInstaller path="node" /> -->

## Features

- Built on shadcn/ui Card components for consistent styling
- Automatic handle placement (left for target, right for source)
- Composable sub-components (Header, Title, Description, Action, Content, Footer)
- Semantic structure for organizing node information
- Pre-styled sections with borders and backgrounds
- Responsive sizing with fixed small width
- Full TypeScript support with proper type definitions
- Compatible with React Flow's node system

## Props

### `<Node />`

:::field-group
  ::field{name="handles" type="{ target: boolean; source: boolean; }"}
  Configuration for connection handles. Target renders on the left, source on the right.
  ::

  ::field{name="className" type="string"}
  Additional CSS classes to apply to the node.
  ::

  ::field{name="...props" type="ComponentProps<typeof Card>"}
  Any other props are spread to the underlying Card component.
  ::
:::

### `<NodeHeader />`

:::field-group
  ::field{name="className" type="string"}
  Additional CSS classes to apply to the header.
  ::

  ::field{name="...props" type="ComponentProps<typeof CardHeader>"}
  Any other props are spread to the underlying CardHeader component.
  ::
:::

### `<NodeTitle />`

:::field-group
  ::field{name="...props" type="ComponentProps<typeof CardTitle>"}
  Any other props are spread to the underlying CardTitle component.
  ::
:::

### `<NodeDescription />`

:::field-group
  ::field{name="...props" type="ComponentProps<typeof CardDescription>"}
  Any other props are spread to the underlying CardDescription component.
  ::
:::

### `<NodeAction />`

:::field-group
  ::field{name="...props" type="ComponentProps<typeof CardAction>"}
  Any other props are spread to the underlying CardAction component.
  ::
:::

### `<NodeContent />`

:::field-group
  ::field{name="className" type="string"}
  Additional CSS classes to apply to the content.
  ::

  ::field{name="...props" type="ComponentProps<typeof CardContent>"}
  Any other props are spread to the underlying CardContent component.
  ::
:::

### `<NodeFooter />`

:::field-group
  ::field{name="className" type="string"}
  Additional CSS classes to apply to the footer.
  ::

  ::field{name="...props" type="ComponentProps<typeof CardFooter>"}
  Any other props are spread to the underlying CardFooter component.
  ::
:::
