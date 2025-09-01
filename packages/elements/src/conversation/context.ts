import type { InjectionKey, Ref } from 'vue'

export interface ConversationContextValue {
  isAtBottom: Ref<boolean>
  scrollToBottom: (behavior?: ScrollBehavior) => void
}

export const conversationContextKey: InjectionKey<ConversationContextValue>
  = Symbol('ConversationContext')
