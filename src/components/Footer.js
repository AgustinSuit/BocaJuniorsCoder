export function renderFooter() {
  const footerContainer = document.getElementById('site-footer-container');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-social">
          <h3>Síguenos en nuestras redes</h3>
          <ul>
            <li><a href="https://www.facebook.com/BocaJuniors" target="_blank" aria-label="Facebook"><i class="bi bi-facebook"></i></a></li>
            <li><a href="https://www.youtube.com/@bocajuniors" target="_blank" aria-label="YouTube"><i class="bi bi-youtube"></i></a></li>
            <li><a href="https://www.instagram.com/bocajrsoficial/" target="_blank" aria-label="Instagram"><i class="bi bi-instagram"></i></a></li>
            <li><a href="https://twitter.com/BocaJrsOficial" target="_blank" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a></li>
          </ul>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-copy">
          <p>&copy; ${new Date().getFullYear()} <span>Club Atlético Boca Juniors</span> - Proyecto Coderhouse por Agustín Bracamonte.</p>
          <p>La Mitad Más Uno | Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}
