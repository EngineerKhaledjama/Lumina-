/* ═══════════════════════════════════════
   LUMINA ACADEMY — Shared JavaScript
   ═══════════════════════════════════════ */

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    }, 60);
  });
}

// ── Progress Bar ──
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = ((window.scrollY / max) * 100) + '%';
  });
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Mobile Nav ──
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('hamburger');
  if (!nav || !btn) return;
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('hamburger');
  if (!nav || !btn) return;
  nav.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Active nav link ──
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();
