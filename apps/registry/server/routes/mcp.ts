import type { Registry, RegistryItem } from 'shadcn-vue/schema'
import type { ZodRawShape } from 'zod'
import { fromWebHandler } from 'h3'
import { createMcpHandler } from 'mcp-handler'
import { useStorage } from 'nitropack/runtime'
import { z } from 'zod'

function getRegistryStorage() {
  return useStorage('assets:registry')
}

async function loadRegistryIndex(): Promise<Registry | null> {
  try {
    const storage = getRegistryStorage()
    return await storage.getItem('index.json') as Registry
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

const componentParamsShape = {
  component: z.string().min(1, 'component is required'),
} satisfies ZodRawShape
const componentParamsSchema = z.object(componentParamsShape)

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_ai_elements_components',
      {
        title: 'List AI Elements components',
        description: 'Provides a list of all AI Elements components.',
      },
      async () => {
        const componentNames = await listComponentNames()
        const body = componentNames.length
          ? JSON.stringify(componentNames, null, 2)
          : '[]'

        return {
          content: [{ type: 'text' as const, text: body }],
        }
      },
    )

    server.registerTool(
      'get_ai_elements_component',
      {
        title: 'Get AI Elements component',
        description: 'Provides information about an AI Elements component.',
        inputSchema: componentParamsShape,
      },
      async (args: Record<string, unknown>) => {
        const parsedArgs = componentParamsSchema.safeParse(args)
        if (!parsedArgs.success) {
          return {
            content: [{ type: 'text' as const, text: `Invalid input: ${parsedArgs.error.message}` }],
          }
        }

        const { component } = parsedArgs.data
        const registryItem = await loadRegistryItem(component)

        if (!registryItem) {
          return {
            content: [{ type: 'text' as const, text: `Component "${component}" not found.` }],
          }
        }

        return {
          content: [{ type: 'text' as const, text: JSON.stringify(registryItem, null, 2) }],
        }
      },
    )
  },
)

export default fromWebHandler(handler)
