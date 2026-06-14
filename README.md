# AI入门指南

一本面向零基础读者的系统性AI入门教程，从"什么是AI"到"大模型与未来"，涵盖12个章节，包含数学公式推导、可运行代码示例、交互式演示。

## 在线访问

**GitHub Pages：** https://sjscy05.github.io/AI-learning-byAI/ai-tutorial.html

## 章节内容

| 章节 | 主题 | 核心内容 |
|------|------|----------|
| 第1章 | 什么是AI | AI定义、三次浪潮历史、机器学习三大范式、分类交互Demo |
| 第2章 | 数据与特征 | 数据类型、特征工程完整流程、编码方法、西瓜特征表格 |
| 第3章 | 监督学习 | 线性回归推导、正则化、SVM、决策树、模型评估指标 |
| 第4章 | 神经网络 | 神经元数学模型、5种激活函数、反向传播推导、优化器对比 |
| 第5章 | CNN | 卷积数学原理、经典架构演进(LeNet→ResNet)、迁移学习 |
| 第6章 | Transformer | 注意力机制推导、多头注意力、位置编码、BERT/GPT对比 |
| 第7章 | 无监督学习 | K-Means、DBSCAN、PCA特征值分解、聚类评估 |
| 第8章 | 强化学习 | MDP定义、贝尔曼方程、DQN、策略梯度 |
| 第9章 | NLP进阶 | Word2Vec、BERT预训练、GPT生成原理 |
| 第10章 | CV进阶 | GAN损失函数、YOLO目标检测、ViT |
| 第11章 | AI伦理 | 公平性定义、差分隐私、联邦学习、可解释AI |
| 第12章 | AI未来 | Scaling Law、涌现能力、多模态融合、AI Agent |

## 技术特性

- **单文件部署**：一个HTML文件，内嵌CSS和JS，无需构建
- **数学公式**：KaTeX渲染，包含50+个数学公式
- **代码高亮**：highlight.js，所有代码块可复制
- **交互演示**：
  - 第1章：红蓝点分类Canvas Demo
  - 第7章：K-Means聚类可视化Demo
- **深色模式**：一键切换，CSS变量实现
- **响应式设计**：移动端汉堡菜单 + 侧边栏抽屉
- **阅读进度**：顶部进度条 + 侧边栏高亮当前章节
- **位置记忆**：localStorage保存滚动位置

## 本地运行

```bash
# 方法1：Python HTTP服务器
python -m http.server 8080
# 访问 http://localhost:8080/ai-tutorial.html

# 方法2：Node.js
npx serve .
# 访问 http://localhost:3000/ai-tutorial.html
```

## 设计规范

- 背景色：`#fdfbf7`（暖白）
- 主题色：`#3b49df`（克莱因蓝）
- 字体：Georgia（标题）+ Inter（正文）+ JetBrains Mono（代码）
- 正文：18px，行高1.7
- 章节卡片：白色背景 + 轻阴影 + 左边框装饰线

## License

MIT
