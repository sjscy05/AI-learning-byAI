import Link from 'next/link'
import { CATEGORIES } from '@/lib/mdx'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">AI学习网站</h1>
        <p className="text-center text-xl text-gray-600 dark:text-gray-400 mb-12">
          系统学习人工智能，从基础到实践
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="block p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition-all dark:border-gray-700 dark:hover:border-blue-400"
            >
              <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
