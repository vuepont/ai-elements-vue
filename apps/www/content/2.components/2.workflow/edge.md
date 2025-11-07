---
title: Edge
description: Customizable edge components for React Flow canvases with animated and temporary states.
---

The `Edge` component provides two pre-styled edge types for React Flow canvases: `Temporary` for dashed temporary connections and `Animated` for connections with animated indicators.

::alert
  The Edge component is designed to be used with the [Canvas](/components/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- <ElementsInstaller path="edge" /> -->

## Features

- Two distinct edge types: Temporary and Animated
- Temporary edges use dashed lines with ring color
- Animated edges include a moving circle indicator
- Automatic handle position calculation
- Smart offset calculation based on handle type and position
- Uses Bezier curves for smooth, natural-looking connections
- Fully compatible with React Flow's edge system
- Type-safe implementation with TypeScript

## Edge Types

### `Edge.Temporary`

A dashed edge style for temporary or preview connections. Uses a simple Bezier path with a dashed stroke pattern.

### `Edge.Animated`

A solid edge with an animated circle that moves along the path. The animation repeats indefinitely with a 2-second duration, providing visual feedback for active connections.

## Props

Both edge types accept standard React Flow `EdgeProps`:

:::field-group
  ::field{name="id" type="string"}
  Unique identifier for the edge.
  ::

  ::field{name="source" type="string"}
  ID of the source node.
  ::

  ::field{name="target" type="string"}
  ID of the target node.
  ::

  ::field{name="sourceX" type="number"}
  X coordinate of the source handle (Temporary only).
  ::

  ::field{name="sourceY" type="number"}
  Y coordinate of the source handle (Temporary only).
  ::

  ::field{name="targetX" type="number"}
  X coordinate of the target handle (Temporary only).
  ::

  ::field{name="targetY" type="number"}
  Y coordinate of the target handle (Temporary only).
  ::

  ::field{name="sourcePosition" type="Position"}
  Position of the source handle (Left, Right, Top, Bottom).
  ::

  ::field{name="targetPosition" type="Position"}
  Position of the target handle (Left, Right, Top, Bottom).
  ::

  ::field{name="markerEnd" type="string"}
  SVG marker ID for the edge end (Animated only).
  ::

  ::field{name="style" type="React.CSSProperties"}
  Custom styles for the edge (Animated only).
  ::
:::
