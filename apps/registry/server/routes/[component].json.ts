import { promises as fs } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'
import { eventHandler, getRequestURL } from 'h3'

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

function toTitle(slug: string) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

async function walkVueFiles(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await walkVueFiles(full)
      out.push(...nested)
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.vue')) {
      out.push(full)
    }
  }
  return out
}

function extractImports(code: string): string[] {
  const imports: string[] = []
  const matches = code.matchAll(/import[^\n]*from\s+['"]([^'"\n]+)['"]/g)
  for (const m of matches) {
    if (m[1])
      imports.push(m[1])
  }
  return imports
}

export default eventHandler(async (event) => {
  const url = getRequestURL(event)
  const registryUrl = url.origin

  const packageDir = join(process.cwd(), '..', '..', 'packages', 'elements')
  const srcDir = join(packageDir, 'src')
  const examplesDir = join(process.cwd(), '..', '..', 'packages', 'examples', 'src')

  // Read package.json for dependencies
  const packageJsonPath = join(packageDir, 'package.json')
  const packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8')
  const packageJson = JSON.parse(packageJsonRaw) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }

  const internalDependencies = Object.keys(packageJson.dependencies || {}).filter(
    dep => dep.startsWith('@repo') && dep !== '@repo/shadcn-vue',
  )

  const dependenciesSet = new Set(
    Object.keys(packageJson.dependencies || {}).filter(
      dep => !['vue', '@repo/shadcn-vue', ...internalDependencies].includes(dep),
    ),
  )

  const devDependenciesSet = new Set(
    Object.keys(packageJson.devDependencies || {}).filter(dep => !['typescript'].includes(dep)),
  )

  // Ensure commonly required dependencies
  dependenciesSet.add('ai')
  dependenciesSet.add('@ai-sdk/vue')
  dependenciesSet.add('zod')

  const allVueFiles = await walkVueFiles(srcDir)

  const files: RegistryFile[] = []

  for (const absPath of allVueFiles) {
    const content = await fs.readFile(absPath, 'utf-8')
    const parsedContent = content
      .replace(/@repo\/shadcn-vue\//g, '@/')
      .replace(/@repo\/elements\//g, '@/components/ai-elements/')

    const rel = relative(srcDir, absPath).split('\\').join('/')
    files.push({
      type: 'registry:component',
      path: `registry/default/ai-elements/${rel}`,
      content: parsedContent,
      target: `components/ai-elements/${rel}`,
    })
  }

  // Load example files (optional)
  let exampleFiles: RegistryFile[] = []
  try {
    const exampleEntries = await fs.readdir(examplesDir, { withFileTypes: true })
    const exampleVue = exampleEntries
      .filter(e => e.isFile() && e.name.endsWith('.vue'))
      .map(e => join(examplesDir, e.name))

    exampleFiles = await Promise.all(
      exampleVue.map(async (filePath) => {
        const content = await fs.readFile(filePath, 'utf-8')
        const parsedContent = content.replace(/@repo\/elements\//g, '@/components/ai-elements/')
        const name = filePath.split('/').pop() as string
        return {
          type: 'registry:block',
          path: `registry/default/examples/${name}`,
          content: parsedContent,
          target: `components/ai-elements/examples/${name}`,
        }
      }),
    )
  }
  catch {
    // examples are optional
  }

  files.push(...exampleFiles)

  // Collect component groups from directory names under src
  const groupToFiles = new Map<string, RegistryFile[]>()
  for (const f of files) {
    if (!f.path.startsWith('registry/default/ai-elements/'))
      continue
    const rel = f.path.replace('registry/default/ai-elements/', '')
    const group = rel.split('/')[0]
    if (!groupToFiles.has(group))
      groupToFiles.set(group, [])
    groupToFiles.get(group)!.push(f)
  }

  // Build items
  const componentItems: RegistryItemSchema[] = Array.from(groupToFiles.keys()).map(group => ({
    name: group,
    type: 'registry:component',
    title: toTitle(group),
    description: `AI-powered ${group.replace('-', ' ')} components.`,
    files: groupToFiles.get(group)!.map(f => ({ path: f.path, type: f.type, target: f.target })),
  }))

  const exampleItems: RegistryItemSchema[] = exampleFiles.map((ef) => {
    const name = (ef.path.split('/').pop() as string).replace('.vue', '')
    return {
      name: `example-${name}`,
      type: 'registry:block',
      title: `${toTitle(name)} Example`,
      description: `Example implementation of ${name.replace('-', ' ')}.`,
      files: [{ path: ef.path, type: ef.type, target: ef.target }],
    }
  })

  const items: RegistryItemSchema[] = [...componentItems, ...exampleItems]

  const response: RegistrySchema = {
    $schema: 'https://shadcn-vue.com/schema/registry.json',
    name: 'ai-elements-vue',
    homepage: new URL('/elements', registryUrl).toString() as unknown as string,
    items,
  }

  const componentParam = event.context.params?.component as string | undefined
  const fallbackFromPath = url.pathname.split('/').pop() || ''
  const component = componentParam ?? fallbackFromPath
  const parsedComponent = component.replace('.json', '')

  if (parsedComponent === 'all' || parsedComponent === 'registry') {
    return response
  }

  const item = response.items.find(i => i.name === parsedComponent)
  if (!item) {
    return { error: `Component "${parsedComponent}" not found.` }
  }

  // Resolve files with content for the selected item
  const selectedFiles: RegistryFile[] = []
  if (item.type === 'registry:component') {
    for (const f of item.files || []) {
      const file = files.find(x => x.path === f.path)
      if (file)
        selectedFiles.push(file)
    }
  }
  else if (item.type === 'registry:block' && parsedComponent.startsWith('example-')) {
    const name = `${parsedComponent.replace('example-', '')}.vue`
    const file = files.find(x => x.path === `registry/default/examples/${name}`)
    if (file)
      selectedFiles.push(file)
  }

  if (selectedFiles.length === 0) {
    return { error: `Files for "${parsedComponent}" not found.` }
  }

  // Analyze imports to compute dependencies
  const usedDependencies = new Set<string>()
  const usedDevDependencies = new Set<string>()
  const usedRegistryDependencies = new Set<string>()

  for (const f of selectedFiles) {
    const imports = extractImports(f.content)
    for (const moduleName of imports) {
      if (!moduleName)
        continue

      if (moduleName.startsWith('./')) {
        const relativePath = moduleName.split('/').pop()
        if (relativePath) {
          usedRegistryDependencies.add(new URL(`/${relativePath}.json`, registryUrl).toString())
        }
      }

      if (dependenciesSet.has(moduleName))
        usedDependencies.add(moduleName)
      if (devDependenciesSet.has(moduleName))
        usedDevDependencies.add(moduleName)

      if (moduleName.startsWith('@/components/ui/')) {
        const componentName = moduleName.split('/').pop()
        if (componentName)
          usedRegistryDependencies.add(componentName)
      }

      if (moduleName.startsWith('@/components/ai-elements/')) {
        const componentName = moduleName.split('/').pop()
        if (componentName) {
          usedRegistryDependencies.add(new URL(`/${componentName}.json`, registryUrl).toString())
        }
      }
    }
  }

  // Add internal dependencies as registry URLs
  for (const dep of internalDependencies) {
    const packageName = dep.replace('@repo/', '')
    usedRegistryDependencies.add(new URL(`/elements/${packageName}.json`, registryUrl).toString())
  }

  const itemResponse: ItemResponse = {
    $schema: 'https://shadcn-vue.com/schema/registry-item.json',
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: selectedFiles,
    dependencies: Array.from(usedDependencies),
    devDependencies: Array.from(usedDevDependencies),
    registryDependencies: Array.from(usedRegistryDependencies),
  }

  return itemResponse
})
