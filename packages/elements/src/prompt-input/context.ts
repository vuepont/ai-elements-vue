import type { AttachmentFile, PromptInputContext } from './types'
import { nanoid } from 'nanoid'
import { inject, onBeforeUnmount, provide, ref } from 'vue'
import { PROMPT_INPUT_KEY } from './types'

export function usePromptInputProvider(props: {
  initialInput?: string
  maxFiles?: number
  maxFileSize?: number
  accept?: string
  onSubmit?: (message: { text: string, files: any[] }) => void | Promise<void>
  onError?: (err: { code: string, message: string }) => void
}) {
  const textInput = ref(props.initialInput || '')
  const files = ref<AttachmentFile[]>([])
  const fileInputRef = ref<HTMLInputElement | null>(null)
  const isLoading = ref(false)

  // Cleanup object URLs to avoid memory leaks
  onBeforeUnmount(() => {
    files.value.forEach((f) => {
      if (f.url && f.url.startsWith('blob:')) {
        URL.revokeObjectURL(f.url)
      }
    })
  })

  const setTextInput = (val: string) => {
    textInput.value = val
  }

  const matchesAccept = (file: File) => {
    if (!props.accept || props.accept.trim() === '')
      return true
    if (props.accept.includes('image/*'))
      return file.type.startsWith('image/')
    // Add more mime-type checks here if necessary
    return true
  }

  const addFiles = (incoming: File[] | FileList) => {
    const fileList = Array.from(incoming)

    // Validate Accept
    const accepted = fileList.filter(matchesAccept)
    if (fileList.length && accepted.length === 0) {
      props.onError?.({ code: 'accept', message: 'No files match the accepted types.' })
      return
    }

    // Validate Size
    const withinSize = (f: File) => (props.maxFileSize ? f.size <= props.maxFileSize : true)
    const sized = accepted.filter(withinSize)
    if (accepted.length > 0 && sized.length === 0) {
      props.onError?.({ code: 'max_file_size', message: 'All files exceed the maximum size.' })
      return
    }

    // Validate Count
    const currentCount = files.value.length
    const capacity = props.maxFiles ? Math.max(0, props.maxFiles - currentCount) : undefined
    const capped = typeof capacity === 'number' ? sized.slice(0, capacity) : sized

    if (typeof capacity === 'number' && sized.length > capacity) {
      props.onError?.({ code: 'max_files', message: 'Too many files. Some were not added.' })
    }

    const newAttachments: AttachmentFile[] = capped.map(file => ({
      id: nanoid(),
      type: 'file',
      url: URL.createObjectURL(file),
      mediaType: file.type,
      filename: file.name,
      file,
    }))

    files.value = [...files.value, ...newAttachments]
  }

  const removeFile = (id: string) => {
    const file = files.value.find(f => f.id === id)
    if (file?.url && file.url.startsWith('blob:')) {
      URL.revokeObjectURL(file.url)
    }
    files.value = files.value.filter(f => f.id !== id)
  }

  const clearFiles = () => {
    files.value.forEach((f) => {
      if (f.url && f.url.startsWith('blob:')) {
        URL.revokeObjectURL(f.url)
      }
    })
    files.value = []
  }

  const clearInput = () => {
    textInput.value = ''
  }

  const openFileDialog = () => {
    fileInputRef.value?.click()
  }

  const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      })
    }
    catch {
      return null
    }
  }

  const submitForm = async () => {
    if (!props.onSubmit)
      return

    // Process files (convert blobs to base64 if needed for AI SDK)
    const processedFiles = await Promise.all(
      files.value.map(async (item) => {
        if (item.url && item.url.startsWith('blob:')) {
          const dataUrl = await convertBlobUrlToDataUrl(item.url)
          return { ...item, url: dataUrl ?? item.url }
        }
        return item
      }),
    )

    const message = {
      text: textInput.value,
      files: processedFiles,
    }

    try {
      isLoading.value = true
      const result = props.onSubmit(message)
      if (result instanceof Promise) {
        await result
      }
      clearInput()
      clearFiles()
    }
    catch (e) {
      if (props.onError) {
        const errorMessage = e instanceof Error
          ? e.message
          : String(e) || 'An unknown error occurred during submission.'
        props.onError({
          code: 'submit_error',
          message: errorMessage,
        })
      }
      console.error('Submission failed:', e)
    }
    finally {
      isLoading.value = false
    }
  }

  const context: PromptInputContext = {
    textInput,
    files,
    fileInputRef,
    isLoading,
    setTextInput,
    addFiles,
    removeFile,
    clearFiles,
    clearInput,
    openFileDialog,
    submitForm,
  }

  provide(PROMPT_INPUT_KEY, context)
  return context
}

export function usePromptInput() {
  const context = inject<PromptInputContext>(PROMPT_INPUT_KEY)
  if (!context) {
    throw new Error('usePromptInput must be used within a PromptInput component')
  }
  return context
}
