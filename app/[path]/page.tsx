import { notFound } from 'next/navigation'
import { getMDXContent, compileMDXContent, getAllContent } from '@/lib/mdx'

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
    title: item.frontMatter.title,
    description: item.frontMatter.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { path } = params
  const content = await getMDXContent(path, 'unknown')

  if (!content) {
    const allContent = await getAllContent()
    const found = allContent.find(c => c.slug === path)
    if (!found) notFound()
    const { content: compiled } = await compileMDXContent(found.rawContent)
    return (
      <article className="prose prose-lg max-w-none mx-auto px-4 py-8">
        <h1>{found.frontMatter.title}</h1>
        {found.frontMatter.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{found.frontMatter.description}</p>
        )}
        {compiled}
      </article>
    )
  }

  const { content: compiled } = await compileMDXContent(content.rawContent)

  return (
    <article className="prose prose-lg max-w-none mx-auto px-4 py-8">
      <h1>{content.frontMatter.title}</h1>
      {content.frontMatter.description && (
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{content.frontMatter.description}</p>
      )}
      {compiled}
    </article>
  )
}
