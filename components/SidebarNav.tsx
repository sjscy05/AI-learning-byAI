'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Section {
  id: string
  title: string
  icon: string
}

const sections: Section[] = [
  { id: 'ai-basics', title: 'AI基础', icon: '🤖' },
  { id: 'machine-learning', title: '机器学习', icon: '📊' },
  { id: 'deep-learning', title: '深度学习', icon: '🧠' },
  { id: 'nlp', title: '自然语言处理', icon: '💬' },
  { id: 'cv', title: '计算机视觉', icon: '👁️' },
  { id: 'practice', title: 'AI实践', icon: '🚀' },
]

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="sidebar-nav hidden lg:block">
      <div className="mb-4 px-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          章节导航
        </h3>
      </div>
      <nav className="space-y-0.5">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`sidebar-nav-item ${activeSection === section.id ? 'active' : ''}`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.title}
          </a>
        ))}
      </nav>
      <div className="mt-8 px-3">
        <Link
          href="/"
          className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </aside>
  )
}