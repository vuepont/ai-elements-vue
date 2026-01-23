import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface FileTreeContextValue {
  expandedPaths: Ref<Set<string>>
  togglePath: (path: string) => void
  selectedPath: Ref<string | undefined>
  onSelect: (path: string) => void
}

export const FileTreeKey: InjectionKey<FileTreeContextValue> = Symbol('FileTree')

export function useFileTreeContext(): FileTreeContextValue {
  const context = inject(FileTreeKey)
  if (!context) {
    throw new Error('useFileTreeContext must be used within FileTree')
  }
  return context
}

export interface FileTreeFolderContextValue {
  path: string
  name: string
  isExpanded: boolean
}

export const FileTreeFolderKey: InjectionKey<FileTreeFolderContextValue> = Symbol('FileTreeFolder')

export interface FileTreeFileContextValue {
  path: string
  name: string
}

export const FileTreeFileKey: InjectionKey<FileTreeFileContextValue> = Symbol('FileTreeFile')
