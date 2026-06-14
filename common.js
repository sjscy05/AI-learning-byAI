// ========== Theme Toggle ==========
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setTheme(dark) {
  if (dark) {
    html.classList.add('dark');
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
    const lightLink = document.querySelector('link[href*="github.min.css"]');
    if (lightLink) {
      lightLink.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    }
  } else {
    html.classList.remove('dark');
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
    const darkLink = document.querySelector('link[href*="github"]');
    if (darkLink) {
      darkLink.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(!html.classList.contains('dark'));
  });
}

// Restore theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
}

// ========== Progress Bar ==========
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ========== Sidebar Active State ==========
const sections = document.querySelectorAll('section[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');

if (sections.length && sidebarLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

// ========== Mobile Menu ==========
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileDrawer = document.getElementById('mobile-drawer');
const closeDrawer = document.getElementById('close-drawer');

function openMobileMenu() {
  if (mobileOverlay) mobileOverlay.classList.add('open');
  if (mobileDrawer) mobileDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  if (mobileOverlay) mobileOverlay.classList.remove('open');
  if (mobileDrawer) mobileDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
if (closeDrawer) closeDrawer.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ========== Copy Code ==========
function copyCode(btn) {
  const code = btn.parentElement.querySelector('code');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    btn.textContent = '已复制 ✓';
    setTimeout(() => { btn.textContent = '复制'; }, 2000);
  });
}

// ========== Scroll Position ==========
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPos', window.scrollY);
});
const savedPos = localStorage.getItem('scrollPos');
if (savedPos && !document.querySelector('.knowledge-graph')) {
  setTimeout(() => window.scrollTo(0, parseInt(savedPos)), 100);
}

// ========== KaTeX Rendering ==========
document.addEventListener('DOMContentLoaded', () => {
  if (typeof katex !== 'undefined' && typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ]
    });
  }

  // Highlight code
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }
});

// ========== Quote Box ==========
const quotes = [
  "学习AI最好的时间是十年前，其次是现在。",
  "每一个专家都曾是初学者。",
  "不要害怕犯错，每一次错误都是学习的机会。",
  "坚持学习，你已经超越了90%的人。",
  "代码写得越多，你离AI大牛就越近。",
  "今天学的一个概念，可能改变你明天的思维方式。",
  "AI不是魔法，而是数学+数据+工程的结晶。",
  "保持好奇心，这是学习AI最重要的品质。",
  "每一个复杂的模型，都是由简单的组件构成的。",
  "种一棵树最好的时间是十年前，其次是现在。",
];

function showRandomQuote() {
  const el = document.getElementById('quote-text');
  if (!el) return;
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    el.style.opacity = 1;
  }, 200);
}

// ========== Pyodide Integration ==========
let pyodideInstance = null;
let pyodideLoading = false;

async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) {
    await new Promise(r => { const check = () => { if (pyodideInstance) r(); else setTimeout(check, 200); }; check(); });
    return pyodideInstance;
  }
  pyodideLoading = true;
  try {
    if (typeof loadPyodide === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.4/full/pyodide.js';
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () => reject(new Error('无法加载Pyodide运行时，请检查网络连接'));
      });
    }
    pyodideInstance = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.4/full/' });
    return pyodideInstance;
  } catch (err) {
    pyodideLoading = false;
    throw err;
  }
}

async function runCode(btn) {
  const codeBlock = btn.closest('.code-block') || btn.parentElement.previousElementSibling;
  if (!codeBlock) return;

  const codeEl = codeBlock.querySelector('code') || codeBlock.querySelector('pre');
  if (!codeEl) return;

  let pythonCode = codeEl.textContent;

  // Remove trailing comments that are just expected output
  pythonCode = pythonCode.replace(/\n# 输出:.*$/m, '');

  let outputDiv = btn.parentElement.nextElementSibling;
  if (!outputDiv || !outputDiv.classList.contains('pyodide-output')) {
    outputDiv = document.createElement('div');
    outputDiv.className = 'pyodide-output';
    btn.parentElement.after(outputDiv);
  }

  btn.disabled = true;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<svg viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> 加载运行环境...';
  outputDiv.textContent = '';
  outputDiv.style.display = 'block';

  try {
    const pyodide = await initPyodide();
    btn.innerHTML = '<svg viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> 运行中...';

    let stdout = '';
    let stderr = '';
    pyodide.setStdout({ batched: (text) => { stdout += text; } });
    pyodide.setStderr({ batched: (text) => { stderr += text; } });

    await pyodide.runPythonAsync(pythonCode);

    let output = '';
    if (stdout) output += stdout;
    if (stderr) output += (output ? '\n' : '') + stderr;
    outputDiv.textContent = output || '(无输出)';
    outputDiv.style.color = '';
  } catch (err) {
    let msg = err.message || String(err);
    // Clean up Pyodide error messages
    msg = msg.replace(/File "<exec>",/g, '第');
    msg = msg.replace(/Traceback \(most recent call last\):\n\s*File "<exec>", line \d+, in <module>\n/g, '');
    outputDiv.textContent = '❌ 运行错误: ' + msg;
    outputDiv.style.color = '#ef4444';
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
  }
}
