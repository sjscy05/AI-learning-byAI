import Link from 'next/link'
import { getContentByCategory } from '@/lib/mdx'
import { SidebarNav } from '@/components/SidebarNav'

export default async function AIBasicsPage() {
  const items = await getContentByCategory('ai-basics')

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:ml-60">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-heading-light dark:text-heading-dark font-serif">
            🤖 AI基础
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            人工智能的基本概念和发展历程
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="chapter-card group block"
            >
              <h2 className="text-xl font-semibold text-heading-light dark:text-heading-dark group-hover:text-primary transition-colors">
                {item.frontMatter.title}
              </h2>
              {item.frontMatter.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {item.frontMatter.description}
                </p>
              )}
              <div className="mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                阅读全文 →
              </div>
            </Link>
          ))}
          {items.length === 0 && (
            <div className="chapter-card text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400">
                内容正在编写中，敬请期待...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}