import type { ToolUIPart } from 'ai'

/**
 * Extended tool state type that includes approval-related states
 * beyond what the base AI SDK provides.
 *
 * This type is used across multiple components including:
 * - Tool components (ToolStatusBadge)
 * - Confirmation components
 */
export type ExtendedToolState
  = | ToolUIPart['state']
    | 'approval-requested'
    | 'approval-responded'
    | 'output-denied'
