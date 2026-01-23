import type { InjectionKey, Ref } from 'vue'

export interface FileTreeContextValue {
  expandedPaths: Ref<Set<string>>
  togglePath: (path: string) => void
  selectedPath: Ref<string | undefined>
  onSelect: (path: string) => void
}

export const FileTreeKey: InjectionKey<FileTreeContextValue> = Symbol('FileTree')

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
