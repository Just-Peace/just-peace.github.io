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

  // Theme toggle with Pallot storage & event
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    function getTheme() {
      return document.documentElement.dataset.theme || 'light';
    }

    function updateThemeBtnIcon() {
      const isDark = getTheme() === 'dark';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.innerHTML = isDark
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }

    updateThemeBtnIcon();

    themeBtn.addEventListener('click', () => {
      const current = getTheme();
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      try {
        const stored = JSON.parse(localStorage.getItem('pallot.ui.v1') || '{}');
        stored.theme = nextTheme;
        localStorage.setItem('pallot.ui.v1', JSON.stringify(stored));
      } catch (err) {
        // localStorage fallback
      }

      document.dispatchEvent(new CustomEvent('pallot:theme'));
      setTimeout(updateThemeBtnIcon, 50);
    });
  }
});
