import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface SchemaParameter {
  name: string
  type: string
  required?: boolean
  description?: string
  location?: 'path' | 'query' | 'header'
}

export interface SchemaProperty {
  name: string
  type: string
  required?: boolean
  description?: string
  properties?: SchemaProperty[]
  items?: SchemaProperty
}

export interface SchemaDisplayContextValue {
  method: HttpMethod
  path: string
  description?: string
  parameters?: SchemaParameter[]
  requestBody?: SchemaProperty[]
  responseBody?: SchemaProperty[]
}

export const SchemaDisplayKey: InjectionKey<SchemaDisplayContextValue> = Symbol('SchemaDisplay')

export function useSchemaDisplayContext(componentName: string): SchemaDisplayContextValue {
  const context = inject(SchemaDisplayKey)

  if (!context) {
    throw new Error(`${componentName} must be used within SchemaDisplay`)
  }

  return context
}
