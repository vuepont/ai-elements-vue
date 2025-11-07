---
title: Connection
description: A custom connection line component for React Flow-based canvases with animated bezier curve styling.
---

The `Connection` component provides a styled connection line for React Flow canvases. It renders an animated bezier curve with a circle indicator at the target end, using consistent theming through CSS variables.

::alert
  The Connection component is designed to be used with the [Canvas](/components/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- <ElementsInstaller path="connection" /> -->

## Features

- Smooth bezier curve animation for connection lines
- Visual indicator circle at the target position
- Theme-aware styling using CSS variables
- Cubic bezier curve calculation for natural flow
- Lightweight implementation with minimal props
- Full TypeScript support with React Flow types
- Compatible with React Flow's connection system

## Props

### `<Connection />`
:::field-group
  ::field{name="fromX" type="number"}
  The x-coordinate of the connection start point.
  ::

  ::field{name="fromY" type="number"}
  The y-coordinate of the connection start point.
  ::

  ::field{name="toX" type="number"}
  The x-coordinate of the connection end point.
  ::

  ::field{name="toY" type="number"}
  The y-coordinate of the connection end point.
  ::
:::
