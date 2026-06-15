import type { Metadata } from 'next'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TopNav } from '@/components/TopNav'
import { ProgressBar } from '@/components/ProgressBar'

export const metadata: Metadata = {
  title: 'AI入门指南 - 从零开始学习人工智能',
  description: '系统学习人工智能，从基础概念到前沿技术，让零基础也能理解AI的核心原理',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
        <ThemeProvider>
          <ProgressBar />
          <TopNav />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}