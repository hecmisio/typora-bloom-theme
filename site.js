    const themeLink = document.getElementById('theme-css');
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');
    const btnForest = document.getElementById('btn-forest');
    const btnSea = document.getElementById('btn-sea');

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
      
      // 更新按钮的按下状态
      updateButtonStates(themeName);
      
      // 设置系统的 color-scheme
      // 只有 light 是浅色，其他变体（dark, forest, sea）通常建议设为 dark 以适配系统 UI
      document.documentElement.style.colorScheme = (themeName === 'light') ? 'light' : 'dark';
    }

    // 抽离一个函数来统一管理所有按钮的 aria-pressed 状态
    function updateButtonStates(activeTheme) {
      const buttons = {
        'light': btnLight,
        'dark': btnDark,
        'forest': btnForest,
        'sea': btnSea
      };

      Object.keys(buttons).forEach(theme => {
        if (buttons[theme]) {
          buttons[theme].setAttribute('aria-pressed', String(theme === activeTheme));
        }
      });
    }

    updateButtonStates('light');

    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
    if (btnForest) btnForest.addEventListener('click', () => setTheme('forest'));
    if (btnSea) btnSea.addEventListener('click', () => setTheme('sea'));


    
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
