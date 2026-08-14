const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

const spotlight = document.getElementById('spotlight');
if (!reducedMotion && spotlight) {
  window.addEventListener('pointermove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  }, { passive: true });
}

document.querySelectorAll('.magnetic').forEach((el) => {
  if (reducedMotion) return;
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.08;
    const y = (e.clientY - r.top - r.height / 2) * 0.08;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = 'translate(0,0)');
});

const profileModule = document.querySelector('[data-profile-module]');
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
  profilePhoto.addEventListener('error', () => {
    profilePhoto.parentElement?.classList.add('image-unavailable');
    profilePhoto.remove();
  });
}

if (!reducedMotion && profileModule && window.matchMedia('(pointer: fine)').matches) {
  profileModule.addEventListener('pointermove', (event) => {
    const bounds = profileModule.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    profileModule.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  profileModule.addEventListener('pointerleave', () => {
    profileModule.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
