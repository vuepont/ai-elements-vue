import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export type TestStatusType = 'passed' | 'failed' | 'skipped' | 'running'

export interface TestResultsSummaryData {
  passed: number
  failed: number
  skipped: number
  total: number
  duration?: number
}

export interface TestResultsContextType {
  summary?: TestResultsSummaryData
}

export interface TestSuiteContextType {
  name: string
  status: TestStatusType
}

export interface TestContextType {
  name: string
  status: TestStatusType
  duration?: number
}

export const TestResultsContextKey: InjectionKey<TestResultsContextType> = Symbol('TestResultsContext')

export const TestSuiteContextKey: InjectionKey<TestSuiteContextType> = Symbol('TestSuiteContext')

export const TestContextKey: InjectionKey<TestContextType> = Symbol('TestContext')

export function useTestResultsContext() {
  const context = inject(TestResultsContextKey)
  if (!context) {
    throw new Error('useTestResultsContext must be used within a <TestResults> component')
  }
  return context
}

export function useTestSuiteContext() {
  const context = inject(TestSuiteContextKey)
  if (!context) {
    throw new Error('useTestSuiteContext must be used within a <TestSuite> component')
  }
  return context
}

export function useTestContext() {
  const context = inject(TestContextKey)
  if (!context) {
    throw new Error('useTestContext must be used within a <Test> component')
  }
  return context
}
