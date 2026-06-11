jest.mock('react-katex', () => ({
  InlineMath: ({ math }: { math: string }) => <span>{math}</span>,
  BlockMath: ({ math }: { math: string }) => <div>{math}</div>,
}))

jest.mock('recharts', () => ({
  LineChart: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: string }) => <pre>{children}</pre>,
}))

import { render } from '@testing-library/react'
import { Math } from '@/components/Math'
import { Chart } from '@/components/Chart'
import { CodeBlock } from '@/components/CodeBlock'
import { Navigation } from '@/components/Navigation'

describe('Math Component', () => {
  it('renders inline math', () => {
    const { container } = render(<Math>{'x^2'}</Math>)
    expect(container.textContent).toContain('x^2')
  })
  
  it('renders block math', () => {
    const { container } = render(<Math display>{'x^2'}</Math>)
    expect(container.textContent).toContain('x^2')
  })
})

describe('Chart Component', () => {
  it('renders chart with title', () => {
    const data = [
      { name: '1', value: 10 },
      { name: '2', value: 20 },
    ]
    
    const { container } = render(
      <Chart
        data={data}
        title="Test Chart"
        xAxisLabel="X"
        yAxisLabel="Y"
      />
    )
    
    expect(container.textContent).toContain('Test Chart')
  })
})

describe('CodeBlock Component', () => {
  it('renders code', () => {
    const { container } = render(
      <CodeBlock code="console.log('hello')" language="javascript" />
    )
    expect(container.textContent).toContain("console.log('hello')")
  })
})

describe('Navigation Component', () => {
  it('renders navigation items', () => {
    const items = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' },
    ]
    
    const { container } = render(<Navigation items={items} />)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('About')
  })
})