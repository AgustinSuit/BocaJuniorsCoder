import '../styles/main.scss';
import { renderHeader } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';
import { initPlantelPage } from './plantel.js';

document.addEventListener('DOMContentLoaded', () => {
  // Determine current active page
  const path = window.location.pathname;
  let activePage = 'inicio';

  if (path.includes('plantel')) activePage = 'plantel';
  else if (path.includes('la-bombonera')) activePage = 'la-bombonera';
  else if (path.includes('historia-del-club')) activePage = 'historia';
  else if (path.includes('la-12')) activePage = 'la-12';
  else if (path.includes('contacto')) activePage = 'contacto';

  // Render Layout Components
  renderHeader(activePage);
  renderFooter();

  // Initialize Page-Specific Logic
  if (activePage === 'plantel') {
    initPlantelPage();
  }

  // Initialize Animated Counters (for history page)
  initAnimatedCounters();

  // Initialize Contact Form Validation
  initContactForm();
});

/* Animated Counter Functionality */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* Contact Form Validation and Toast Feedback */
function initContactForm() {
  const form = document.getElementById('boca-contact-form');
  const toast = document.getElementById('toast-notification');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show Toast Notification
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    form.reset();
  });
}
