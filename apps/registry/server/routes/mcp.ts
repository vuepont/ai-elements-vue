import type { Registry, RegistryItem } from 'shadcn-vue/schema'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { defineHandler } from 'nitro'
import { useStorage } from 'nitro/storage'
import { z } from 'zod'

const REGISTRY_STORAGE_BASE = 'assets:registry'

const REGISTRY_INDEX_FILE = 'registry.json'

const SERVER_INFO = {
  name: 'ai-elements-vue',
  version: '1.0.0',
}

const DOCS_REDIRECT = 'https://www.ai-elements-vue.com/overview/mcp-server'

const getComponentInputSchema = z.object({
  component: z
    .string()
    .min(1, 'component is required')
    .describe('Component name (e.g. "context")'),
})

type GetComponentInput = z.infer<typeof getComponentInputSchema>

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

async function handleGetComponent(component: string) {
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

function createMcpServer() {
  const server = new McpServer(SERVER_INFO)

  server.registerTool(
    'get_ai_elements_components',
    {
      title: 'List AI Elements components',
      description: 'Provides a list of all AI Elements components.',
    },
    async () => handleListComponents(),
  )

  server.registerTool(
    'get_ai_elements_component',
    {
      title: 'Get AI Elements component',
      description: 'Provides information about an AI Elements component.',
      inputSchema: getComponentInputSchema,
    },
    async ({ component }: GetComponentInput) => handleGetComponent(component),
  )

  return server
}

function closeMcpServer(server: McpServer, transport: WebStandardStreamableHTTPServerTransport) {
  server.close().catch(error => console.error('Failed to close MCP server', error))
  transport.close().catch(error => console.error('Failed to close MCP transport', error))
}

function withCleanup(response: Response, cleanup: () => void) {
  if (!response.body) {
    cleanup()
    return response
  }

  const reader = response.body.getReader()
  const body = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read()
      if (done) {
        cleanup()
        controller.close()
        return
      }

      controller.enqueue(value)
    },
    async cancel(reason) {
      cleanup()
      await reader.cancel(reason)
    },
  })

  return new Response(body, response)
}

export default defineHandler(async (event) => {
  if (event.req.method === 'GET' || event.req.method === 'HEAD') {
    const accept = event.req.headers.get('accept') ?? ''
    if (accept.includes('text/event-stream')) {
      return new Response(null, { status: 204 })
    }

    return Response.redirect(DOCS_REDIRECT, 302)
  }

  const server = createMcpServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  })

  let closed = false
  const cleanup = () => {
    if (closed) {
      return
    }
    closed = true
    closeMcpServer(server, transport)
  }

  event.req.signal.addEventListener('abort', cleanup, { once: true })

  try {
    await server.connect(transport)
    const response = await transport.handleRequest(event.req)
    return withCleanup(response, cleanup)
  }
  catch (error) {
    cleanup()
    throw error
  }
})
