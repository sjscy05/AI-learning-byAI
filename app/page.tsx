import Link from 'next/link'
import { CATEGORIES } from '@/lib/mdx'

const chapterIcons: Record<string, string> = {
  'ai-basics': '🤖',
  'machine-learning': '📊',
  'deep-learning': '🧠',
  'nlp': '💬',
  'cv': '👁️',
  'practice': '🚀',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-heading-light dark:text-heading-dark mb-6 font-serif">
            AI入门指南
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            从零开始，系统学习人工智能。用最简单的方式，理解最前沿的技术。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="chapter-card group"
              >
                <div className="text-4xl mb-4">
                  {chapterIcons[cat.slug] || '📚'}
                </div>
                <h2 className="text-xl font-semibold text-heading-light dark:text-heading-dark mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {cat.description}
                </p>
                <div className="mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  开始学习 →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card-light/50 dark:bg-card-dark/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-heading-light dark:text-heading-dark mb-8 font-serif">
            为什么选择这个指南？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-heading-light dark:text-heading-dark mb-2">
                零基础友好
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                用生活中的比喻解释复杂概念，无需数学背景
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="font-semibold text-heading-light dark:text-heading-dark mb-2">
                代码示例
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                每个概念都配有可运行的代码示例
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="font-semibold text-heading-light dark:text-heading-dark mb-2">
                交互演示
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                动手实验，直观理解算法原理
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}