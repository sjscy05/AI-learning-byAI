import Link from 'next/link'

export default function Home() {
  const learningPaths = [
    { title: 'AI基础', href: '/ai-basics', description: '人工智能的基本概念和发展历程' },
    { title: '机器学习', href: '/machine-learning', description: '监督学习、无监督学习和强化学习' },
    { title: '深度学习', href: '/deep-learning', description: '神经网络、CNN、RNN等深度学习模型' },
    { title: '自然语言处理', href: '/nlp', description: '文本处理、词嵌入、语言模型' },
    { title: '计算机视觉', href: '/cv', description: '图像处理、目标检测、图像分割' },
    { title: 'AI实践', href: '/practice', description: '数据预处理、模型训练、部署实践' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12">AI学习网站</h1>
        <p className="text-center text-xl text-gray-600 mb-12">
          系统学习人工智能，从基础到实践
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="block p-6 border rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold mb-2">{path.title}</h2>
              <p className="text-gray-600">{path.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}