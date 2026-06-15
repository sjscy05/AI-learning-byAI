'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Point {
  x: number
  y: number
  color: 'red' | 'blue'
}

export function ClassificationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [currentColor, setCurrentColor] = useState<'red' | 'blue'>('red')
  const [classificationLine, setClassificationLine] = useState<{ slope: number; intercept: number } | null>(null)

  const drawPoints = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i <= canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw classification line if available
    if (classificationLine) {
      ctx.strokeStyle = '#3b49df'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, classificationLine.intercept)
      ctx.lineTo(canvas.width, classificationLine.slope * canvas.width + classificationLine.intercept)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = point.color === 'red' ? '#ef4444' : '#3b82f6'
      ctx.fill()
      ctx.strokeStyle = point.color === 'red' ? '#dc2626' : '#2563eb'
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [points, classificationLine])

  useEffect(() => {
    drawPoints()
  }, [drawPoints])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPoints((prev) => [...prev, { x, y, color: currentColor }])
  }

  const calculateClassification = () => {
    if (points.length < 2) return

    const redPoints = points.filter((p) => p.color === 'red')
    const bluePoints = points.filter((p) => p.color === 'blue')

    if (redPoints.length === 0 || bluePoints.length === 0) return

    const redCenter = {
      x: redPoints.reduce((sum, p) => sum + p.x, 0) / redPoints.length,
      y: redPoints.reduce((sum, p) => sum + p.y, 0) / redPoints.length,
    }
    const blueCenter = {
      x: bluePoints.reduce((sum, p) => sum + p.x, 0) / bluePoints.length,
      y: bluePoints.reduce((sum, p) => sum + p.y, 0) / bluePoints.length,
    }

    const midX = (redCenter.x + blueCenter.x) / 2
    const midY = (redCenter.y + blueCenter.y) / 2

    const dx = blueCenter.x - redCenter.x
    const dy = blueCenter.y - redCenter.y

    if (Math.abs(dx) < 0.001) {
      setClassificationLine({ slope: 0, intercept: midY })
      return
    }

    const slope = -dx / dy
    const intercept = midY - slope * midX

    setClassificationLine({ slope, intercept })
  }

  const clearPoints = () => {
    setPoints([])
    setClassificationLine(null)
  }

  return (
    <div className="my-6">
      <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-card p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h4 className="font-semibold text-heading-light dark:text-heading-dark">
            🎯 分类演示：点击画布添加数据点
          </h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentColor('red')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentColor === 'red'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              🔴 红点
            </button>
            <button
              onClick={() => setCurrentColor('blue')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentColor === 'blue'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
              }`}
            >
              🔵 蓝点
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="demo-canvas w-full"
          onClick={handleCanvasClick}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={calculateClassification}
            disabled={points.length < 2}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            📈 计算分类边界
          </button>
          <button
            onClick={clearPoints}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            🗑️ 清空
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          已添加 {points.length} 个数据点（{points.filter((p) => p.color === 'red').length} 红，{points.filter((p) => p.color === 'blue').length} 蓝）
        </p>
      </div>
    </div>
  )
}