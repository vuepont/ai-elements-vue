import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from '../src/web-preview'

describe('webPreview', () => {
  it('renders children', () => {
    const screen = render(<WebPreview>Content</WebPreview>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('uses default URL', () => {
    const screen = render(
      <WebPreview defaultUrl="https://example.com">
        <WebPreviewUrl />
      </WebPreview>,
    )
    const input = screen.getByTestId('web-preview-url-input')
    expect(input).toHaveValue('https://example.com')
  })

  it('calls onUrlChange', async () => {
    const onUrlChange = vi.fn()
    const user = userEvent.setup()

    const screen = render(
      <WebPreview onUrlChange={onUrlChange}>
        <WebPreviewUrl />
      </WebPreview>,
    )

    const input = screen.getByTestId('web-preview-url-input')
    await user.type(input, 'https://test.com{Enter}')

    expect(onUrlChange).toHaveBeenCalled()
  })

  it('throws error when component used outside provider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<WebPreviewUrl />)).toThrow(
      'WebPreview components must be used within WebPreview',
    )

    spy.mockRestore()
  })
})

describe('webPreviewNavigation', () => {
  it('renders navigation', () => {
    const screen = render(<WebPreviewNavigation>Nav content</WebPreviewNavigation>)
    expect(screen.getByText('Nav content')).toBeInTheDocument()
  })
})

describe('webPreviewNavigationButton', () => {
  it('renders button with tooltip', () => {
    const screen = render(
      <WebPreviewNavigationButton tooltip="Back">
        <span>←</span>
      </WebPreviewNavigationButton>,
    )
    expect(screen.getByText('←')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const screen = render(
      <WebPreviewNavigationButton disabled tooltip="Forward">
        →
      </WebPreviewNavigationButton>,
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('handles click', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    const screen = render(
      <WebPreviewNavigationButton onClick={onClick} tooltip="Refresh">
        ↻
      </WebPreviewNavigationButton>,
    )

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})

describe('webPreviewUrl', () => {
  it('renders URL input', () => {
    const screen = render(
      <WebPreview>
        <WebPreviewUrl />
      </WebPreview>,
    )
    expect(screen.getByTestId('web-preview-url-input')).toBeInTheDocument()
  })

  it('updates URL on Enter key', async () => {
    const user = userEvent.setup()

    const screen = render(
      <WebPreview>
        <WebPreviewUrl />
      </WebPreview>,
    )

    const input = screen.getByPlaceholder(
      'Enter URL...',
    ) as unknown as HTMLInputElement
    await user.type(input, 'https://example.com{Enter}')

    // Wait for the state to update
    await vi.waitFor(() => {
      expect(input).toHaveValue('https://example.com')
    })
  })
})

describe('webPreviewBody', () => {
  it('renders iframe', () => {
    const screen = render(
      <WebPreview>
        <WebPreviewBody src="https://example.com" />
      </WebPreview>,
    )
    const iframe = screen.getByTitle('Preview')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://example.com')
  })

  it('has sandbox attribute', () => {
    const screen = render(
      <WebPreview>
        <WebPreviewBody />
      </WebPreview>,
    )
    const iframe = screen.getByTitle('Preview')
    expect(iframe).toHaveAttribute('sandbox')
  })

  it('renders loading slot', () => {
    const screen = render(
      <WebPreview>
        <WebPreviewBody>
          {{
            loading: () => <div>Loading...</div>,
          }}
        </WebPreviewBody>
      </WebPreview>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})

describe('webPreviewConsole', () => {
  it('renders console', () => {
    const screen = render(
      <WebPreview>
        <WebPreviewConsole />
      </WebPreview>,
    )
    expect(
      screen.getByRole('button', { name: /console/i }),
    ).toBeInTheDocument()
  })

  it('displays no output message', async () => {
    const user = userEvent.setup()

    const screen = render(
      <WebPreview>
        <WebPreviewConsole />
      </WebPreview>,
    )

    await user.click(screen.getByRole('button', { name: /console/i }))
    expect(screen.getByText('No console output')).toBeVisible()
  })

  it('displays logs', async () => {
    const user = userEvent.setup()
    const logs = [
      { level: 'log' as const, message: 'Test log', timestamp: new Date() },
      {
        level: 'error' as const,
        message: 'Error message',
        timestamp: new Date(),
      },
    ]

    const screen = render(
      <WebPreview>
        <WebPreviewConsole logs={logs} />
      </WebPreview>,
    )

    await user.click(screen.getByRole('button', { name: /console/i }))

    expect(screen.getByText('Test log')).toBeVisible()
    expect(screen.getByText('Error message')).toBeVisible()
  })
})
