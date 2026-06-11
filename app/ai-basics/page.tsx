import Link from 'next/link'
import { getContentByCategory } from '@/lib/mdx'

export default async function AIBasicsPage() {
  const items = await getContentByCategory('ai-basics')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI基础</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="block p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold">{item.frontMatter.title}</h2>
            {item.frontMatter.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">{item.frontMatter.description}</p>
            )}
          </Link>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500">暂无内容</p>
        )}
      </div>
    </div>
  )
}
