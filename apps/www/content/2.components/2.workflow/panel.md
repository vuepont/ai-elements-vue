---
title: Panel
description: A styled panel component for React Flow-based canvases to position custom UI elements.
---

The `Panel` component provides a positioned container for custom UI elements on React Flow canvases. It includes modern card styling with backdrop blur and flexible positioning options.

::alert
  The Panel component is designed to be used with the [Canvas](/components/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- TODO: to implement installation block -->
<!-- <ElementsInstaller path="panel" /> -->

## Features

- Flexible positioning (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
- Rounded pill design with backdrop blur
- Theme-aware card background
- Flexbox layout for easy content alignment
- Subtle drop shadow for depth
- Full TypeScript support
- Compatible with React Flow's panel system

## Props

### `<Panel />`

:::field-group
  ::field{name="position" type="'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'"}
  Position of the panel on the canvas.
  ::

  ::field{name="className" type="string"}
  Additional CSS classes to apply to the panel.
  ::

  ::field{name="...props" type="ComponentProps typeof Panel"}
  Any other props from @xyflow/react Panel component.
  ::
:::
