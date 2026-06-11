import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MDXContent {
  frontMatter: {
    title: string
    description?: string
  }
  content: string
  slug: string
}

export async function getMDXContent(slug: string, category: string): Promise<MDXContent | null> {
  const filePath = path.join(contentDirectory, category, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    frontMatter: { title: data.title || slug, description: data.description },
    content,
    slug,
  }
}

export async function getAllContent(): Promise<MDXContent[]> {
  const categories = ['ai-basics', 'machine-learning', 'deep-learning', 'nlp', 'cv', 'practice']
  const allContent: MDXContent[] = []
  
  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    
    if (!fs.existsSync(categoryPath)) {
      continue
    }
    
    const files = fs.readdirSync(categoryPath)
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '')
        const content = await getMDXContent(slug, category)
        
        if (content) {
          allContent.push(content)
        }
      }
    }
  }
  
  return allContent
}