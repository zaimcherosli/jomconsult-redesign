/**
 * JomConsult Official Theme Engine
 * Client has confirmed permanent official theme: White & Gold/Yellow ('light-gold').
 * Theme switcher preview widget has been permanently removed.
 */

export function applyTheme(themeId = 'light-gold', save = true) {
  const officialTheme = 'light-gold';
  document.documentElement.setAttribute('data-theme', officialTheme);
  if (document.body) {
    document.body.setAttribute('data-theme', officialTheme);
  }

  // Header & mobile menu use official dark text logo on light background
  const headerLogos = document.querySelectorAll('header img[src*="logo"], #mobile-menu img[src*="logo"]');
  headerLogos.forEach(img => {
    if (img.src.includes('logo-white.png')) {
      img.src = img.src.replace('logo-white.png', 'logo.png');
    }
  });

  // Footer ALWAYS stays white logo on dark footer
  const footerLogos = document.querySelectorAll('footer img[src*="logo"]');
  footerLogos.forEach(img => {
    if (img.src.includes('logo.png') && !img.src.includes('logo-white.png')) {
      img.src = img.src.replace('logo.png', 'logo-white.png');
    }
  });

  if (save) {
    try {
      localStorage.setItem('jomconsult_theme', officialTheme);
    } catch (e) {}
  }
}

function initTheme() {
  applyTheme('light-gold', true);

  // Remove any leftover widget elements if present
  const existingWidget = document.getElementById('jc-theme-switcher-widget');
  if (existingWidget) {
    existingWidget.remove();
  }
}

// Initialize as soon as DOM is interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
