import type { InjectionKey } from 'vue'

export type ChangeType = 'major' | 'minor' | 'patch' | 'added' | 'removed'

export interface PackageInfoContextValue {
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: ChangeType
}

export const PackageInfoKey: InjectionKey<PackageInfoContextValue> = Symbol('PackageInfo')
