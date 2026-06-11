import type { Metadata } from 'next'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'AI学习网站',
  description: '一个全面学习人工智能的网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}