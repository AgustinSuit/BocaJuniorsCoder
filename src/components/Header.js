export function renderHeader(activePage = 'inicio') {
  const headerContainer = document.getElementById('site-header-container');
  if (!headerContainer) return;

  // Paths adjustment based on whether we are in root (index.html) or /pages/
  const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('/pages/');
  const basePath = isRoot ? '.' : '..';

  const navItems = [
    { id: 'inicio', label: 'Inicio', url: `${basePath}/index.html` },
    { id: 'plantel', label: 'Plantel', url: `${basePath}/pages/plantel.html` },
    { id: 'la-bombonera', label: 'La Bombonera', url: `${basePath}/pages/la-bombonera.html` },
    { id: 'historia', label: 'Historia del Club', url: `${basePath}/pages/historia-del-club.html` },
    { id: 'la-12', label: 'La 12', url: `${basePath}/pages/la-12.html` },
    { id: 'contacto', label: 'Contacto', url: `${basePath}/pages/contacto.html` }
  ];

  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <a href="${basePath}/index.html" class="brand-logo">
          <img src="${basePath}/img/Favicon.png" alt="Escudo Boca Juniors" class="shield-icon">
          <div class="brand-title">Boca <span>Juniors</span></div>
        </a>

        <button class="mobile-menu-btn" id="mobile-toggle" aria-label="Abrir menú">
          <i class="bi bi-list"></i>
        </button>

        <nav class="main-nav" id="main-nav">
          <ul>
            ${navItems.map(item => `
              <li>
                <a href="${item.url}" class="nav-link ${activePage === item.id ? 'active' : ''}">
                  ${item.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;

  // Initialize Mobile Menu Events
  const mobileBtn = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (mainNav.classList.contains('open')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-list';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!headerContainer.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      }
    });
  }
}
