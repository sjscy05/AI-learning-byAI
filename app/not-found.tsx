import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h2>
      <h3 className="text-2xl font-bold mb-4">页面未找到</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        您访问的页面不存在
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}