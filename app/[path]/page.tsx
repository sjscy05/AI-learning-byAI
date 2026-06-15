import { notFound } from 'next/navigation'
import { getMDXContent, compileMDXContent, getAllContent } from '@/lib/mdx'
import { SidebarNav } from '@/components/SidebarNav'
import Link from 'next/link'

interface PageProps {
  params: { path: string }
}

export async function generateStaticParams() {
  const allContent = await getAllContent()
  return allContent.map((content) => ({
    path: content.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { path } = params
  const allContent = await getAllContent()
  const item = allContent.find(c => c.slug === path)
  if (!item) return {}
  return {
    title: `${item.frontMatter.title} - AI入门指南`,
    description: item.frontMatter.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { path } = params
  const content = await getMDXContent(path, 'unknown')

  if (!content) {
    const allContent = await getAllContent()
    const found = allContent.find(c => c.slug === path)
    if (found) {
      const { content: compiled } = await compileMDXContent(found.rawContent)
      return (
        <div className="flex">
          <SidebarNav />
          <div className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:ml-60">
            <Link href="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">
              ← 返回首页
            </Link>
            <article className="chapter-card">
              <h1 className="text-3xl font-bold text-heading-light dark:text-heading-dark font-serif mb-4">
                {found.frontMatter.title}
              </h1>
              {found.frontMatter.description && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  {found.frontMatter.description}
                </p>
              )}
              <div className="prose-content">
                {compiled}
              </div>
            </article>
          </div>
        </div>
      )
    }
    notFound()
  }

  const { content: compiled } = await compileMDXContent(content.rawContent)

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:ml-60">
        <Link href="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">
          ← 返回首页
        </Link>
        <article className="chapter-card">
          <h1 className="text-3xl font-bold text-heading-light dark:text-heading-dark font-serif mb-4">
            {content.frontMatter.title}
          </h1>
          {content.frontMatter.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              {content.frontMatter.description}
            </p>
          )}
          <div className="prose-content">
            {compiled}
          </div>
        </article>
      </div>
    </div>
  )
}