import type { PromptInputMessage } from '../src/prompt-input'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInput,
} from '../src/prompt-input'

function renderPromptInput(options?: {
  onSubmit?: (message: PromptInputMessage) => void | Promise<void>
  submitDisabled?: boolean
}) {
  const onSubmit = options?.onSubmit ?? vi.fn()

  const screen = render(
    <PromptInput onSubmit={onSubmit}>
      <PromptInputBody>
        <PromptInputTextarea />
        {options?.submitDisabled
          ? <button disabled type="submit">Submit</button>
          : <PromptInputSubmit />}
      </PromptInputBody>
    </PromptInput>,
  )

  const textarea = document.querySelector('textarea')
  if (!(textarea instanceof HTMLTextAreaElement)) {
    throw new TypeError('PromptInput textarea was not rendered.')
  }

  return { onSubmit, screen, textarea }
}

describe('promptInput', () => {
  it('submits on Enter', async () => {
    const user = userEvent.setup()
    const { onSubmit, textarea } = renderPromptInput()

    await user.type(textarea, 'Test message')
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'Test message' }),
    )
  })

  it('does not submit on Shift+Enter', async () => {
    const user = userEvent.setup()
    const { onSubmit, textarea } = renderPromptInput()

    await user.type(textarea, 'Line 1')
    await user.keyboard('{Shift>}{Enter}{/Shift}')
    await user.type(textarea, 'Line 2')

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not submit on Enter during IME composition', () => {
    const { onSubmit, textarea } = renderPromptInput()

    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
    })

    Object.defineProperty(event, 'isComposing', {
      value: true,
      writable: false,
    })

    textarea.dispatchEvent(event)

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not submit when the submit button is disabled', async () => {
    const user = userEvent.setup()
    const { onSubmit, textarea } = renderPromptInput({ submitDisabled: true })

    await user.type(textarea, 'Should not submit')
    await user.keyboard('{Enter}')

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('preserves new input typed while an async submit is pending', async () => {
    const user = userEvent.setup()
    let resolveSubmit: (() => void) | undefined

    const onSubmit = vi.fn(() => new Promise<void>((resolve) => {
      resolveSubmit = resolve
    }))

    const { textarea } = renderPromptInput({ onSubmit })

    await user.type(textarea, 'First message')
    await user.keyboard('{Enter}')

    expect(textarea).toHaveValue('')

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    await user.type(textarea, 'Second message')
    expect(textarea).toHaveValue('Second message')

    resolveSubmit?.()

    await vi.waitFor(() => {
      expect(textarea).toHaveValue('Second message')
    })
  })

  it('clears submitted attachments after a successful async submit', async () => {
    const user = userEvent.setup()
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const onSubmit = vi.fn(() => Promise.resolve())

    const AttachmentConsumer = () => {
      const { addFiles, files } = usePromptInput()

      return (
        <>
          <button data-testid="add-file" type="button" onClick={() => addFiles([file])}>
            Add File
          </button>
          <div data-testid="file-count">{files.value.length}</div>
          <div>{files.value.map(currentFile => currentFile.filename).join(', ')}</div>
        </>
      )
    }

    const view = render(
      <PromptInput onSubmit={onSubmit}>
        <PromptInputBody>
          <AttachmentConsumer />
          <PromptInputTextarea />
          <PromptInputSubmit />
        </PromptInputBody>
      </PromptInput>,
    )
    const textarea = document.querySelector('textarea')
    if (!(textarea instanceof HTMLTextAreaElement)) {
      throw new TypeError('PromptInput textarea was not rendered.')
    }

    await user.click(view.getByTestId('add-file'))
    expect(view.getByTestId('file-count')).toHaveTextContent('1')
    expect(view.getByText('test.txt')).toBeInTheDocument()

    await user.type(textarea, 'Test message')
    await user.keyboard('{Enter}')

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    await vi.waitFor(() => {
      expect(view.getByTestId('file-count')).toHaveTextContent('0')
    })
  })

  it('accepts multiple trimmed accept patterns', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const imageFile = new File(['image'], 'test.png', { type: 'image/png' })
    const pdfFile = new File(['pdf'], 'test.pdf', { type: 'application/pdf' })

    const AttachmentConsumer = () => {
      const { addFiles, files } = usePromptInput()

      return (
        <>
          <button data-testid="add-image" type="button" onClick={() => addFiles([imageFile])}>
            Add Image
          </button>
          <button data-testid="add-pdf" type="button" onClick={() => addFiles([pdfFile])}>
            Add PDF
          </button>
          <div data-testid="file-count">{files.value.length}</div>
        </>
      )
    }

    const view = render(
      <PromptInput accept="  image/*  ,  application/pdf  " onSubmit={onSubmit}>
        <PromptInputBody>
          <AttachmentConsumer />
          <PromptInputTextarea />
        </PromptInputBody>
      </PromptInput>,
    )

    await user.click(view.getByTestId('add-image'))
    expect(view.getByTestId('file-count')).toHaveTextContent('1')

    await user.click(view.getByTestId('add-pdf'))
    expect(view.getByTestId('file-count')).toHaveTextContent('2')
  })
})
