import { playersData } from '../data/playersData.js';

export function initPlantelPage() {
  const container = document.getElementById('players-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('player-search');
  const modalBackdrop = document.getElementById('player-modal');
  const modalCloseBtn = document.getElementById('modal-close');

  if (!container) return;

  let currentCategory = 'todos';
  let searchQuery = '';

  const imgPath = '/img';

  function renderPlayers() {
    const filtered = playersData.filter(player => {
      const matchesCat = currentCategory === 'todos' || player.position === currentCategory;
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            player.number.toString().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #A0B0C0;">
          <i class="bi bi-search" style="font-size: 2.5rem; color: #FFC700; display: block; margin-bottom: 1rem;"></i>
          <h3>No se encontraron jugadores</h3>
          <p>Intenta con otra búsqueda o selecciona otra categoría.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(player => `
      <article class="player-card" data-id="${player.id}">
        <span class="badge-position">${player.positionLabel}</span>
        <span class="badge-number">${player.number}</span>
        <div class="card-img-wrapper">
          <img src="${imgPath}/${player.image}" alt="${player.name}" loading="lazy">
          <div class="card-overlay-gradient"></div>
        </div>
        <div class="card-content">
          <h3>${player.name}</h3>
          <p class="player-subtitle">${player.nationality}</p>
        </div>
      </article>
    `).join('');

    // Attach click listener for modal
    container.querySelectorAll('.player-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'), 10);
        openPlayerModal(id);
      });
    });
  }

  function openPlayerModal(id) {
    const player = playersData.find(p => p.id === id);
    if (!player || !modalBackdrop) return;

    document.getElementById('modal-name').textContent = player.name;
    document.getElementById('modal-position').textContent = `${player.positionLabel} | N° ${player.number}`;
    document.getElementById('modal-matches').textContent = player.matches;
    document.getElementById('modal-goals').textContent = player.goals;
    document.getElementById('modal-nationality').textContent = player.nationality;
    document.getElementById('modal-bio').textContent = player.bio;
    document.getElementById('modal-img').src = `${imgPath}/${player.image}`;
    document.getElementById('modal-img').alt = player.name;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Filter Buttons event
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderPlayers();
    });
  });

  // Search Input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPlayers();
    });
  }

  // Modal Close event
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Initial render
  renderPlayers();
}
