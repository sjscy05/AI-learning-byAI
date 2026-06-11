import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

function getContentPaths(dir: string, prefix: string = ''): string[] {
  const paths: string[] = []
  if (!fs.existsSync(dir)) return paths

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      paths.push(...getContentPaths(path.join(dir, entry.name), relativePath))
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      const slug = relativePath.replace(/\.(mdx|md)$/, '')
      paths.push(slug)
    }
  }
  return paths
}

export function generateStaticParams() {
  const paths = getContentPaths(contentDir)
  return paths.map((p) => ({ path: p.split('/') }))
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path: pathSegments } = await params
  const slug = pathSegments.join('/')
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const mdPath = path.join(contentDir, `${slug}.md`)

  if (!fs.existsSync(filePath) && !fs.existsSync(mdPath)) {
    notFound()
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <p>Content path: /{slug}</p>
    </main>
  )
}
