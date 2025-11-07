---
title: Controls
description: A styled controls component for React Flow-based canvases with zoom and fit view functionality.
---

The `Controls` component provides interactive zoom and fit view controls for React Flow canvases. It includes a modern, themed design with backdrop blur and card styling.

::alert
  The Controls component is designed to be used with the [Canvas](/components/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- TODO: to implement installation block -->
<!-- <ElementsInstaller path="controls" /> -->

## Features

- Zoom in/out controls
- Fit view button to center and scale content
- Rounded pill design with backdrop blur
- Theme-aware card background
- Subtle drop shadow for depth
- Full TypeScript support
- Compatible with all React Flow control features

## Props

### `<Controls />`
:::field-group
  ::field{name="className" type="string"}
  Additional CSS classes to apply to the controls.
  ::

  ::field{name="...props" type="ComponentProps<typeof Controls>"}
  Any other props from @xyflow/react Controls component (showZoom, showFitView, showInteractive, position, etc.).
  ::
:::
