import type { Registry, RegistryItem } from 'shadcn-vue/schema'
import type { ZodRawShape } from 'zod'
import { fromWebHandler } from 'h3'
import { createMcpHandler } from 'mcp-handler'
import { useStorage } from 'nitropack/runtime'
import { z } from 'zod'

const REGISTRY_STORAGE_BASE = 'assets:registry'
const REGISTRY_INDEX_FILE = 'index.json'

// Parameter Schemas
const componentParamsShape = {
  component: z.string().min(1, 'component is required'),
} satisfies ZodRawShape

const componentParamsSchema = z.object(componentParamsShape)

// Data Access Layer
function getRegistryStorage() {
  return useStorage(REGISTRY_STORAGE_BASE)
}

async function loadRegistryIndex(): Promise<Registry | null> {
  try {
    const storage = getRegistryStorage()
    return await storage.getItem(REGISTRY_INDEX_FILE) as Registry
  }
  catch (error) {
    console.error('Failed to read registry index', error)
    return null
  }
}

async function listComponentNames(): Promise<string[]> {
  const index = await loadRegistryIndex()
  if (!index?.items) {
    return []
  }

  return index.items
    .filter(item => item.type === 'registry:component')
    .map(item => item.name)
    .sort((a, b) => a.localeCompare(b))
}

async function loadRegistryItem(name: string): Promise<RegistryItem | null> {
  const storage = getRegistryStorage()
  // Normalize and sanitize input
  const normalized = name.replace(/\.json$/i, '')

  try {
    const componentJson = await storage.getItem(`components/${normalized}.json`) as RegistryItem
    if (componentJson) {
      return componentJson
    }
  }
  catch (error) {
    console.error(`Failed to read component ${normalized}.json`, error)
  }

  return null
}

// Tool Handlers
async function handleListComponents() {
  const componentNames = await listComponentNames()
  const body = componentNames.length
    ? JSON.stringify(componentNames, null, 2)
    : '[]'

  return {
    content: [{ type: 'text' as const, text: body }],
  }
}

async function handleGetComponent(args: Record<string, unknown>) {
  const parsedArgs = componentParamsSchema.safeParse(args)
  if (!parsedArgs.success) {
    return {
      content: [{ type: 'text' as const, text: `Invalid input: ${parsedArgs.error.message}` }],
      isError: true,
    }
  }

  const { component } = parsedArgs.data
  const registryItem = await loadRegistryItem(component)

  if (!registryItem) {
    return {
      content: [{ type: 'text' as const, text: `Component "${component}" not found.` }],
      isError: true,
    }
  }

  return {
    content: [{ type: 'text' as const, text: JSON.stringify(registryItem, null, 2) }],
  }
}

// Main Handler
const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_ai_elements_components',
      {
        title: 'List AI Elements components',
        description: 'Provides a list of all AI Elements components.',
      },
      handleListComponents,
    )

    server.registerTool(
      'get_ai_elements_component',
      {
        title: 'Get AI Elements component',
        description: 'Provides information about an AI Elements component.',
        inputSchema: componentParamsShape,
      },
      handleGetComponent,
    )
  },
)

export default fromWebHandler(handler)
