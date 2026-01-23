import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export type ChangeType = 'major' | 'minor' | 'patch' | 'added' | 'removed'

export interface PackageInfoContextValue {
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: ChangeType
}

export const PackageInfoKey: InjectionKey<PackageInfoContextValue> = Symbol('PackageInfo')

export function usePackageInfoContext(): PackageInfoContextValue {
  const context = inject(PackageInfoKey)

  if (!context) {
    throw new Error('PackageInfo components must be used within PackageInfo')
  }

  return context
}
