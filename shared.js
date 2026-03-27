function toggleMenu() {
  const btn = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}
function closeMenu() {
  document.querySelector('.hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function submitForm() {
  alert('Thank you! Our admissions team will contact you within 2 business days.');
  closeModal();
}
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.addEventListener('click', function(e) { if (e.target === this) closeModal(); });
});
