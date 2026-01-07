const themeLink = document.getElementById('theme-css');
const themeTrigger = document.getElementById('theme-trigger');
const themeMenu = document.getElementById('theme-menu');
const themeItems = document.querySelectorAll('.theme-item');
const currentThemeDisplay = document.getElementById('current-theme-name');

let currentTheme = 'petal';

// 修改后的设置函数
function setTheme(themeName) {
  const write = document.getElementById('write');
  // 触发重新渲染动画
  if (write) {
    write.style.animation = 'none';
    void write.offsetWidth;
    write.style.animation = null;
  }

  // 根据主题名动态加载对应的 CSS 文件
  if (themeLink) {
    themeLink.setAttribute('href', `dist/bloom-${themeName}.css`);
  }

  // 更新界面文本与状态
  updateThemeUI(themeName);

  // 设置系统的 color-scheme
  const darkThemes = ['petal-dark',
    "mist-dark",
    "verdant-dark",
    "amber-dark",
    "spring-dark",
    "stone-dark",
    "ripple-dark",
    "ink-dark"
  ];
  document.documentElement.style.colorScheme = darkThemes.includes(themeName) ? 'dark' : 'light';

  currentTheme = themeName;
  updateDynamicFavicon();
}

/**
 * 根据当前主题动态生成并更新浏览器 Favicon
 */
function updateDynamicFavicon() {
  const colorMap = {
    'petal': { accent: '#e8859b', bg: '#fdf9fa' },
    'petal-dark': { accent: '#ffaac8', bg: '#332c32' },
    'mist': { accent: '#92A8B3', bg: '#F2F4F5' },
    'mist-dark': { accent: '#9bb9d7', bg: '#333840' },
    'verdant': { accent: '#A0B0A7', bg: '#F2F5F3' },
    'verdant-dark': { accent: '#99b3a3', bg: '#202522' },
    'stone': { accent: '#B1A49E', bg: '#F5F3F1' },
    'stone-dark': { accent: '#dab39b', bg: '#33302e' },
    'ripple': { accent: '#5fa8b2', bg: '#fcfdfe' },
    'ripple-dark': { accent: '#9bd7da', bg: '#262d2e' },
    'ink': { accent: '#cc584d', bg: '#fbfbfb' },
    'ink-dark': { accent: '#e26b5f', bg: '#242424' },
    'amber': { accent: '#c3874b', bg: '#fbf8f6' },
    'amber-dark': { accent: '#ebaf78', bg: '#25201d' },
    'spring': { accent: '#A873C4', bg: '#fcf9fd' },
    'spring-dark': { accent: '#bfa9f5', bg: '#2e2a33' }
  };

  const colors = colorMap[currentTheme] || colorMap['petal'];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <defs>
        <linearGradient id="f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colors.accent}"/>
          <stop offset="1" stop-color="${colors.accent}"/>
        </linearGradient>
      </defs>
      <g transform="translate(10,10)">
        <g fill="url(#f)">
          <path d="M30 12c7 0 12 6 12 12 0 7-6 14-12 14S18 31 18 24c0-6 5-12 12-12Z"/>
          <path d="M16 28c6-4 14-3 18 2 5 6 2 16-6 20-8 4-17 1-20-7-2-6 2-12 8-15Z" opacity="0.92"/>
          <path d="M44 28c6 3 10 9 8 15-3 8-12 11-20 7-8-4-11-14-6-20 4-5 12-6 18-2Z" opacity="0.92"/>
        </g>
        <circle cx="30" cy="32" r="5" fill="${colors.bg}" opacity="0.92"/>
      </g>
    </svg>`.trim();

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  let link = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

// 统一管理主题 UI 状态
function updateThemeUI(activeTheme) {
  const themeLabels = {
    'petal': '🌸 花瓣 (Petal)',
    'petal-dark': '🔮 花瓣·暗夜',
    'mist': '☁️ 雾蓝 (Mist)',
    'mist-dark': '💠 雾蓝·暗夜',
    'verdant': '🍃 草木 (Verdant)',
    'verdant-dark': '🌲 草木·暗夜',
    'stone': '🧱 暖石 (Stone)',
    'stone-dark': '🪨 暖石·暗夜',
    'ripple': '🌊 涟漪 (Ripple)',
    'ripple-dark': '🌊 涟漪·暗夜',
    'ink': '🖋️ 水墨 (Ink)',
    'ink-dark': '🖋️ 水墨·暗夜',
    'amber': '💎 琥珀 (Amber)',
    'amber-dark': '🔥 琥珀·暗夜',
    'spring': '🌸 紫语 (Spring)',
    'spring-dark': '🔮 紫语·暗夜'
  };

  // 更新触发器文字
  if (currentThemeDisplay) {
    currentThemeDisplay.textContent = themeLabels[activeTheme] || activeTheme;
  }

  // 更新菜单项选中状态
  themeItems.forEach(item => {
    item.classList.toggle('active', item.dataset.theme === activeTheme);
  });
}

// 下拉菜单交互
if (themeTrigger && themeMenu) {
  themeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('show');
    themeTrigger.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    themeMenu.classList.remove('show');
    themeTrigger.classList.remove('active');
  });

  themeItems.forEach(item => {
    item.addEventListener('click', () => {
      const theme = item.dataset.theme;
      setTheme(theme);
    });
  });
}





// Button hover effects
const cards = document.querySelectorAll('.sidebar-card a');
cards.forEach(btn => {
  btn.onmouseenter = () => {
    btn.style.transform = 'translateY(-2px)';
    btn.style.boxShadow = '0 8px 20px var(--accent-2)';
  };
  btn.onmouseleave = () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = 'none';
  };
});



function getCodeLanguage(codeEl, preEl) {
  const preLang = preEl?.getAttribute('lang') || preEl?.getAttribute('data-lang');
  if (preLang) return preLang;

  const m = (codeEl.className || '').match(/language-([a-z0-9_-]+)/i);
  if (m && m[1]) return m[1];
  return '';
}

async function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    await navigator.clipboard.writeText(text);
    return;
  }

  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
}

function enhanceCodeBlocks() {
  const pres = document.querySelectorAll('#write pre');
  pres.forEach(pre => {
    if (pre.dataset.enhanced === 'true') return;
    const code = pre.querySelector('code');
    if (!code) return;

    const lang = getCodeLanguage(code, pre);
    pre.dataset.lang = lang;
    pre.classList.add('has-toolbar');

    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    const langEl = document.createElement('span');
    langEl.className = 'code-lang';
    langEl.textContent = lang ? lang.toUpperCase() : 'CODE';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.type = 'button';
    copyBtn.textContent = '复制';

    copyBtn.addEventListener('click', async () => {
      const raw = code.textContent || '';
      try {
        await copyText(raw);
        copyBtn.textContent = '已复制';
        copyBtn.dataset.state = 'copied';
        window.setTimeout(() => {
          copyBtn.textContent = '复制';
          delete copyBtn.dataset.state;
        }, 1400);
      } catch {
        copyBtn.textContent = '失败';
        window.setTimeout(() => {
          copyBtn.textContent = '复制';
        }, 1400);
      }
    });

    toolbar.appendChild(langEl);
    toolbar.appendChild(copyBtn);
    pre.insertBefore(toolbar, pre.firstChild);
    pre.dataset.enhanced = 'true';
  });
}

enhanceCodeBlocks();

// --- Advanced Interactions ---

// 1. Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

// 2. 3D Card Tilt Effect
const premiumCards = document.querySelectorAll('.premium-card');
premiumCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// 3. Magnetic Download Button
const magneticBtn = document.getElementById('btn-download');
if (magneticBtn) {
  document.addEventListener('mousemove', e => {
    const rect = magneticBtn.getBoundingClientRect();
    const mX = e.clientX;
    const mY = e.clientY;
    const bX = rect.left + rect.width / 2;
    const bY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(mX - bX, 2) + Math.pow(mY - bY, 2));

    if (dist < 100) {
      const x = (mX - bX) * 0.4;
      const y = (mY - bY) * 0.4;
      magneticBtn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      magneticBtn.style.boxShadow = `0 12px 30px var(--accent-2)`;
    } else {
      magneticBtn.style.transform = '';
      magneticBtn.style.boxShadow = '';
    }
  });
}

// 4. Parallax Hero Badge
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const badge = document.querySelector('.hero-badge');
    if (badge) {
      badge.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// --- Dynamic Markdown Loading ---

/**
 * Process GitHub Alerts syntax
 * Converts [!NOTE], [!TIP], etc. to blockquotes with data-type attributes
 */
function processGitHubAlerts(html) {
  return html.replace(
    /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/gi,
    (match, type) => {
      // Remove the [!TYPE] text from the content
      const processed = match.replace(/\[!.*?\]\s*/i, '');
      return `<blockquote data-type="alert-${type.toLowerCase()}">${processed.replace('<blockquote>', '')}`;
    }
  );
}

/**
 * Load and render Markdown from typora.md
 */
async function loadMarkdown() {
  const writeContainer = document.querySelector('#write');
  if (!writeContainer) return;

  try {
    // Load typora.md
    const response = await fetch('typora.md');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const markdown = await response.text();
    
    // Configure marked options
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false
      });
      
      // Render Markdown to HTML
      let html = marked.parse(markdown);
      
      // Process GitHub Alerts
      html = processGitHubAlerts(html);
      
      // Insert into DOM
      writeContainer.innerHTML = html;
      
      // Re-enhance code blocks after content loads
      enhanceCodeBlocks();
      
      console.log('✅ Markdown loaded successfully from typora.md');
    } else {
      throw new Error('marked.js library not loaded');
    }
  } catch (error) {
    console.error('❌ Failed to load Markdown:', error);
    writeContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 0; color: var(--text-semi);">
        <h3>加载失败</h3>
        <p>无法加载 typora.md 文件</p>
        <p style="font-size: 0.9em; opacity: 0.7;">${error.message}</p>
      </div>
    `;
  }
}

// Load Markdown when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadMarkdown);
} else {
  loadMarkdown();
}
