'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const chapters = [
  { id: 'ai-basics', title: 'AI基础', icon: '🤖' },
  { id: 'machine-learning', title: '机器学习', icon: '📊' },
  { id: 'deep-learning', title: '深度学习', icon: '🧠' },
  { id: 'nlp', title: '自然语言处理', icon: '💬' },
  { id: 'cv', title: '计算机视觉', icon: '👁️' },
  { id: 'practice', title: 'AI实践', icon: '🚀' },
]

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-heading-light dark:text-heading-dark font-serif">
                AI入门指南
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/${chapter.id}`}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-1">{chapter.icon}</span>
                  {chapter.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="切换深色模式"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="打开菜单"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-heading-light dark:text-heading-dark font-serif">
            目录
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="关闭菜单"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-1">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/${chapter.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="mr-2">{chapter.icon}</span>
              {chapter.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}