import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

import { Chart } from '@/components/Chart'
import { CodeBlock } from '@/components/CodeBlock'

const contentDirectory = path.join(process.cwd(), 'content')

export const CATEGORIES = [
  { slug: 'ai-basics', title: 'AI基础', description: '人工智能的基本概念和发展历程' },
  { slug: 'machine-learning', title: '机器学习', description: '监督学习、无监督学习和强化学习' },
  { slug: 'deep-learning', title: '深度学习', description: '神经网络、CNN、RNN等深度学习模型' },
  { slug: 'nlp', title: '自然语言处理', description: '文本处理、词嵌入、语言模型' },
  { slug: 'cv', title: '计算机视觉', description: '图像处理、目标检测、图像分割' },
  { slug: 'practice', title: 'AI实践', description: '数据预处理、模型训练、部署实践' },
] as const

const mdxComponents = { Chart, CodeBlock }

export interface MDXContent {
  frontMatter: {
    title: string
    description?: string
  }
  rawContent: string
  slug: string
  category: string
}

function sanitizePath(slug: string, category: string): string | null {
  const filePath = path.join(contentDirectory, category, `${slug}.mdx`)
  const resolved = path.resolve(filePath)
  const baseDir = path.resolve(contentDirectory)
  if (!resolved.startsWith(baseDir)) return null
  return resolved
}

export async function getMDXContent(slug: string, category: string): Promise<MDXContent | null> {
  const filePath = sanitizePath(slug, category)
  if (!filePath || !fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    frontMatter: { title: data.title || slug, description: data.description },
    rawContent: content,
    slug,
    category,
  }
}

export async function compileMDXContent(rawContent: string) {
  return compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight],
      },
    },
  })
}

export async function getAllContent(): Promise<MDXContent[]> {
  const allContent: MDXContent[] = []
  for (const cat of CATEGORIES) {
    const categoryPath = path.join(contentDirectory, cat.slug)
    if (!fs.existsSync(categoryPath)) continue
    const files = fs.readdirSync(categoryPath)
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '')
        const content = await getMDXContent(slug, cat.slug)
        if (content) allContent.push(content)
      }
    }
  }
  return allContent
}

export async function getContentByCategory(categorySlug: string): Promise<MDXContent[]> {
  const allContent = await getAllContent()
  return allContent.filter(item => item.category === categorySlug)
}
