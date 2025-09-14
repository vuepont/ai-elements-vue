import { eventHandler, getRequestURL } from 'h3'
import { useStorage } from 'nitropack/runtime'

interface RegistryFile {
  type:
    | 'registry:lib'
    | 'registry:block'
    | 'registry:component'
    | 'registry:ui'
    | 'registry:hook'
    | 'registry:theme'
    | 'registry:page'
    | 'registry:file'
    | 'registry:style'
    | 'registry:item'
  path: string
  content: string
  target?: string
  [k: string]: unknown
}

interface RegistryItemSchema {
  name: string
  type:
    | 'registry:lib'
    | 'registry:block'
    | 'registry:component'
    | 'registry:ui'
    | 'registry:hook'
    | 'registry:theme'
    | 'registry:page'
    | 'registry:file'
    | 'registry:style'
    | 'registry:item'
  description?: string
  title?: string
  author?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files?: Array<Pick<RegistryFile, 'path' | 'type' | 'target'>>
  [k: string]: unknown
}

interface RegistrySchema {
  $schema: 'https://shadcn-vue.com/schema/registry.json'
  name: string
  homepage: string
  items: RegistryItemSchema[]
}

interface ItemResponse {
  $schema: 'https://shadcn-vue.com/schema/registry-item.json'
  name: string
  type: RegistryItemSchema['type']
  title?: string
  description?: string
  files: RegistryFile[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

// All data is served from Nitro Server Assets generated at build time.

function transformRegistryDependencies(item: ItemResponse, registryUrl: string): ItemResponse {
  if (item.registryDependencies && Array.isArray(item.registryDependencies)) {
    item.registryDependencies = item.registryDependencies.map((dep) => {
      // Handle different types of dependencies
      if (dep.startsWith('/')) {
        // Relative path to JSON endpoint (e.g., "/component.json")
        return new URL(dep, registryUrl).toString()
      }
      if (dep.includes('.json')) {
        // Already formatted JSON dependency
        return dep.startsWith('http') ? dep : new URL(`/${dep}`, registryUrl).toString()
      }
      if (dep.match(/^[a-z-]+$/)) {
        // Simple component name (shadcn-vue style)
        return dep
      }
      // Fallback: assume it's a relative path
      return new URL(`/${dep}.json`, registryUrl).toString()
    })
  }
  return item
}

export default eventHandler(async (event) => {
  const url = getRequestURL(event)
  const registryUrl = url.origin
  const storage = useStorage('assets:registry')

  const componentParam = event.context.params?.component as string | undefined
  const fallbackFromPath = url.pathname.split('/').pop() || ''
  const component = componentParam ?? fallbackFromPath
  const parsedComponent = component.replace('.json', '')

  if (parsedComponent === 'registry' || parsedComponent === 'all') {
    try {
      const index = await storage.getItem('index.json') as RegistrySchema | null
      if (index) {
        return index
      }
    }
    catch (error) {
      console.error('Failed to load registry/index.json:', error)
    }

    // Fallback: return a basic registry structure
    return {
      $schema: 'https://shadcn-vue.com/schema/registry.json',
      name: 'ai-elements-vue',
      homepage: 'https://ai-elements-vue.com',
      items: [],
    }
  }

  // Try to load component first
  try {
    const componentJson = await storage.getItem(`components/${parsedComponent}.json`) as ItemResponse | null
    if (componentJson) {
      return transformRegistryDependencies(componentJson, registryUrl)
    }
  }
  catch (error) {
    console.warn(`Failed to load components/${parsedComponent}.json:`, error)
  }

  // Try to load example
  try {
    // If the component name starts with "example-", remove the prefix to find the example file
    const exampleName = parsedComponent.startsWith('example-')
      ? parsedComponent.replace('example-', '')
      : parsedComponent
    const exampleJson = await storage.getItem(`examples/${exampleName}.json`) as ItemResponse | null
    if (exampleJson) {
      return transformRegistryDependencies(exampleJson, registryUrl)
    }
  }
  catch (error) {
    console.warn(`Failed to load examples/${parsedComponent}.json:`, error)
  }

  // Enhanced error message with suggestions
  console.error(`Component "${parsedComponent}" not found in registry`)
  return {
    error: `Component "${parsedComponent}" not found.`,
    suggestions: 'Available endpoints: /registry.json, /all.json, or individual component names',
  }
})
