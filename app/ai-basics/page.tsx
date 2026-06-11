import Link from 'next/link'
import { getAllContent } from '@/lib/mdx'

export default async function AIBasicsPage() {
  const allContent = await getAllContent()
  const aiBasicsContent = allContent.filter(content => 
    content.slug.startsWith('ai-basics')
  )
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">AI基础</h1>
      <div className="space-y-4">
        {aiBasicsContent.map((content) => (
          <Link
            key={content.slug}
            href={`/${content.slug}`}
            className="block p-6 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold">{content.frontMatter.title}</h2>
            {content.frontMatter.description && (
              <p className="text-gray-600 mt-2">{content.frontMatter.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}