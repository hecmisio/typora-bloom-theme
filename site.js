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
