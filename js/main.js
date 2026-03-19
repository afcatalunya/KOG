/* ============================================================
   KOG ARQUITECTURA · JavaScript principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Menú móvil --- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* --- Marcar nav activo --- */
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(link => {
    if (link.href === window.location.href ||
        (link.href !== window.location.origin + '/' &&
         window.location.pathname.startsWith(new URL(link.href).pathname))) {
      link.classList.add('active');
    }
  });

  /* --- FAQ acordeón --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* --- Formulario de contacto (Formsubmit.co AJAX) --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      const data = Object.fromEntries(new FormData(form));
      data._subject  = 'Nueva consulta desde KOG Arquitectura · ' + (data.servicio || data.superficie || '');
      data._captcha  = 'false';
      data._template = 'table';

      fetch('https://formsubmit.co/ajax/info@kog-arquitectura.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:32px 16px;">
            <div style="font-size:3rem;margin-bottom:16px;">✅</div>
            <h3 style="margin-bottom:10px;">¡Mensaje recibido!</h3>
            <p style="color:#6B6B6B;">Nos pondremos en contacto contigo en menos de 24 horas.</p>
          </div>`;
      })
      .catch(() => {
        btn.textContent = original;
        btn.disabled = false;
        alert('Ha habido un error al enviar. Por favor, llámanos al 639 081 416 o escríbenos por WhatsApp.');
      });
    });
  }

  /* --- Smooth reveal al hacer scroll --- */
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* --- Header: sombra al hacer scroll --- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.12)'
        : '0 2px 12px rgba(0,0,0,0.06)';
    }, { passive: true });
  }

});
