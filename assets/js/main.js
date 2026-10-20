/**
 * Just-Peace / Pallot Landing Page Script
 * Interoperable with Pallot's theme.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Toast helper
  const toast = document.getElementById('landing-toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  // Copy link
  const copyBtn = document.getElementById('copy-domain-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const url = 'https://pallot.just-peace.org';
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link copied: ' + url);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      } catch (e) {
        showToast('Address: ' + url);
      }
    });
  }

  // Contact link handler (matches Pallot: constructed on click to protect from scrapers)
  document.querySelectorAll('a[data-contact]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      location.href = ['mailto:', ['admin', 'just-peace.org'].join('@')].join('');
    });
  });

  // Version label matching Pallot: `v${VERSION}-g${COMMIT}`
  const VERSION = "1.0.0";
  let COMMIT = "6be65b7";

  function renderVersion(commitSha) {
    const shortSha = commitSha ? commitSha.slice(0, 7) : COMMIT;
    const label = shortSha ? `v${VERSION}-g${shortSha}` : `v${VERSION}`;
    document.querySelectorAll('[data-version]').forEach(el => {
      el.textContent = label;
      if (el.tagName === 'A') {
        el.href = `https://github.com/Just-Peace/just-peace.github.io/commit/${shortSha || ''}`;
        el.title = `Release ${label}`;
      }
    });
  }

  renderVersion(COMMIT);

  // Sync latest commit dynamically from GitHub
  fetch('https://api.github.com/repos/Just-Peace/just-peace.github.io/commits/develop', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (data && data.sha) {
        renderVersion(data.sha);
      }
    })
    .catch(() => {});

  // =========================================================================
  // Task 1: Headline Word Animation (cycles through words, settles on "yours!")
  // =========================================================================
  const animatedWordEl = document.getElementById('animated-word');
  if (animatedWordEl) {
    const words = [
      'power.',
      'responsibility.',
      'choice.',
      'private.',
      'rights.',
      'voice.',
      'future.',
      'yours!'
    ];
    let currentIndex = 0;

    function stepToWord(targetIndex) {
      animatedWordEl.classList.add('anim-out');

      setTimeout(() => {
        currentIndex = targetIndex;
        animatedWordEl.textContent = words[currentIndex];
        animatedWordEl.classList.remove('anim-out');
        animatedWordEl.classList.add('anim-in');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            animatedWordEl.classList.remove('anim-in');
          });
        });

        if (currentIndex === words.length - 1) {
          // Reached "yours!" — stay for 30 seconds, then loop back
          animatedWordEl.classList.add('settled');
          setTimeout(() => {
            animatedWordEl.classList.remove('settled');
            stepToWord(0);
          }, 30000);
        } else {
          // Slower swap between intermediate words (2.5 seconds)
          setTimeout(() => {
            stepToWord(currentIndex + 1);
          }, 2500);
        }
      }, 260);
    }

    // Begin cycle after initial 2.5s on the initial word "power."
    setTimeout(() => {
      stepToWord(1);
    }, 2500);
  }

  // =========================================================================
  // Theme Toggle: Light -> Dark -> System (with half sun/half moon icon)
  // =========================================================================
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Icons:
    // 1. Sun (Light)
    const iconSun = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;

    // 2. Moon (Dark)
    const iconMoon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    // 3. Half Sun / Half Moon (System auto)
    const iconSystem = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      </svg>
    `;

    function getPreference() {
      try {
        const stored = JSON.parse(localStorage.getItem('pallot.ui.v1')) ?? {};
        if (stored.theme === 'light') return 'light';
        if (stored.theme === 'dark') return 'dark';
        return 'system';
      } catch {
        return 'system';
      }
    }

    function updateButtonUI() {
      const pref = getPreference();
      if (pref === 'light') {
        themeBtn.innerHTML = iconSun;
        themeBtn.setAttribute('title', 'Theme: Light (click for dark)');
        themeBtn.setAttribute('aria-label', 'Theme: Light. Click for dark mode.');
      } else if (pref === 'dark') {
        themeBtn.innerHTML = iconMoon;
        themeBtn.setAttribute('title', 'Theme: Dark (click for system)');
        themeBtn.setAttribute('aria-label', 'Theme: Dark. Click for system theme.');
      } else {
        themeBtn.innerHTML = iconSystem;
        themeBtn.setAttribute('title', 'Theme: System (click for light)');
        themeBtn.setAttribute('aria-label', 'Theme: System. Click for light mode.');
      }
    }

    updateButtonUI();

    themeBtn.addEventListener('click', () => {
      const current = getPreference();
      let next;
      if (current === 'system') {
        next = 'light';
      } else if (current === 'light') {
        next = 'dark';
      } else {
        next = 'system';
      }

      try {
        const stored = JSON.parse(localStorage.getItem('pallot.ui.v1')) ?? {};
        stored.theme = next;
        localStorage.setItem('pallot.ui.v1', JSON.stringify(stored));
      } catch (err) {
        // Fallback
      }

      // Apply theme to document
      if (next === 'light' || next === 'dark') {
        document.documentElement.dataset.theme = next;
      } else {
        document.documentElement.dataset.theme = darkQuery.matches ? 'dark' : 'light';
      }

      // Notify any listeners
      document.dispatchEvent(new CustomEvent('pallot:theme'));
      updateButtonUI();
    });

    darkQuery.addEventListener('change', () => {
      if (getPreference() === 'system') {
        document.documentElement.dataset.theme = darkQuery.matches ? 'dark' : 'light';
        updateButtonUI();
      }
    });
  }
});
