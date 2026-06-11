'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

interface NavigationProps {
  items: NavItem[]
}

export function Navigation({ items }: NavigationProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (href: string) => {
    setOpenItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <div key={item.href}>
          {item.children ? (
            <>
              <button
                onClick={() => toggleItem(item.href)}
                className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                {item.title}
                <span className="ml-2">
                  {openItems.includes(item.href) ? '▼' : '▶'}
                </span>
              </button>
              {openItems.includes(item.href) && (
                <div className="ml-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}