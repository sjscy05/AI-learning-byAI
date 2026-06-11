import { notFound } from 'next/navigation'
import { getMDXContent, getAllContent } from '@/lib/mdx'
import { Math } from '@/components/Math'
import { Chart } from '@/components/Chart'
import { CodeBlock } from '@/components/CodeBlock'

interface PageProps {
  params: {
    path: string
  }
}

export async function generateStaticParams() {
  const allContent = await getAllContent()
  
  return allContent.map((content) => ({
    path: content.slug,
  }))
}

export default async function Page({ params }: PageProps) {
  const { path } = params
  
  // 尝试从不同类别中查找内容
  const categories = ['ai-basics', 'machine-learning', 'deep-learning', 'nlp', 'cv', 'practice']
  
  for (const category of categories) {
    const content = await getMDXContent(path, category)
    
    if (content) {
      return (
        <article className="prose prose-lg max-w-none">
          <h1>{content.frontMatter.title}</h1>
          {content.frontMatter.description && (
            <p className="text-xl text-gray-600">{content.frontMatter.description}</p>
          )}
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </article>
      )
    }
  }
  
  notFound()
}