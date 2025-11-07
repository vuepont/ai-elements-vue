---
title: Canvas
description: A React Flow-based canvas component for building interactive node-based interfaces.
---

The `Canvas` component provides a React Flow-based canvas for building interactive node-based interfaces. It comes pre-configured with sensible defaults for AI applications, including panning, zooming, and selection behaviors.

::alert
  The Canvas component is designed to be used with the [Node](/components/node) and [Edge](/components/edge) components. See the [Workflow](/examples/workflow) demo for a full example.
::

## Installation

<!-- <ElementsInstaller path="canvas" /> -->

## Features

- Pre-configured React Flow canvas with AI-optimized defaults
- Pan on scroll enabled for intuitive navigation
- Selection on drag for multi-node operations
- Customizable background color using CSS variables
- Delete key support (Backspace and Delete keys)
- Auto-fit view to show all nodes
- Disabled double-click zoom for better UX
- Disabled pan on drag to prevent accidental canvas movement
- Fully compatible with React Flow props and API

## Props

### `<Canvas />`
:::field-group
  ::field{name="children" type="ReactNode"}
  Child components like Background, Controls, or MiniMap.
  ::

  ::field{name="...props" type="ReactFlowProps"}
  Any other React Flow props like nodes, edges, nodeTypes, edgeTypes, onNodesChange, etc.
  ::
:::
