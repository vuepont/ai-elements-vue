import type { FileUIPart, SourceDocumentUIPart } from 'ai'

export type AttachmentData
  = | (FileUIPart & { id: string })
    | (SourceDocumentUIPart & { id: string })

export type AttachmentMediaCategory
  = | 'image'
    | 'video'
    | 'audio'
    | 'document'
    | 'source'
    | 'unknown'

export type AttachmentVariant = 'grid' | 'inline' | 'list'
