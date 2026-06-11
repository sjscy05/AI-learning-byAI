declare module 'react-katex' {
  import { ComponentType } from 'react'
  
  interface MathComponentProps {
    math: string
    display?: boolean
    renderError?: (error: any) => JSX.Element
  }
  
  export const InlineMath: ComponentType<MathComponentProps>
  export const BlockMath: ComponentType<MathComponentProps>
}