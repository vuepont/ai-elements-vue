import type { InjectionKey, Ref } from 'vue'
import type {
  AttachmentData,
  AttachmentMediaCategory,
  AttachmentVariant,
} from './types'
import { computed, inject } from 'vue'

export interface AttachmentsContextValue {
  variant: Ref<AttachmentVariant>
}

export const AttachmentsKey: InjectionKey<AttachmentsContextValue>
  = Symbol('Attachments')

export function useAttachmentsContext(): AttachmentsContextValue {
  const ctx = inject(AttachmentsKey)
  if (!ctx) {
    return {
      variant: computed(() => 'grid'),
    }
  }
  return ctx
}

export interface AttachmentContextValue {
  data: Ref<AttachmentData>
  mediaCategory: Ref<AttachmentMediaCategory>
  remove?: () => void
  variant: Ref<AttachmentVariant>
}

export const AttachmentKey: InjectionKey<AttachmentContextValue> = Symbol('Attachment')

export function useAttachmentContext(): AttachmentContextValue {
  const ctx = inject(AttachmentKey)
  if (!ctx) {
    throw new Error('Attachment components must be used within <Attachment>')
  }
  return ctx
}
