'use client'

import { InlineMath, BlockMath } from 'react-katex'

interface MathProps {
  children: string
  display?: boolean
}

export function Math({ children, display = false }: MathProps) {
  if (display) {
    return <BlockMath math={children} />
  }
  return <InlineMath math={children} />
}