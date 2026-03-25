// =============================================
// CONFIGURAÇÕES — atualize conforme necessário
// =============================================
const PHONE = '5583999999999'; // TODO: substituir pelo número real (sem espaços)
const NEXT_EVENT_DATE = new Date('2026-04-04T08:00:00'); // TODO: substituir para o próximo evento

// =============================================
// NAVBAR — sombra ao scrollar
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// =============================================
// CONTADOR REGRESSIVO
// =============================================
function updateCountdown() {
  const nextEventDate = NEXT_EVENT_DATE;
  const now = new Date();
  const diff = nextEventDate - now;

  if (diff <= 0) {
    document.querySelectorAll('.count-num').forEach(el => el.textContent = '00');
    const heroCount = document.getElementById('heroCountDays'); if(heroCount) heroCount.textContent = '0';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2,'0');
  const elDays = document.getElementById('days'); if(elDays) elDays.textContent = pad(days);
  const elHours = document.getElementById('hours'); if(elHours) elHours.textContent = pad(hours);
  const elMins = document.getElementById('minutes'); if(elMins) elMins.textContent = pad(minutes);
  const elSecs = document.getElementById('seconds'); if(elSecs) elSecs.textContent = pad(seconds);
  const heroCount = document.getElementById('heroCountDays'); if(heroCount) heroCount.textContent = days;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// =============================================
// INTERSECTION OBSERVER — animações de scroll
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =============================================
// SCROLL SUAVE para links âncora
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// =============================================
// HELPERS WHATSAPP — adiciona mensagem padrão nos links existentes
// =============================================
function openWhatsApp(message){
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank');
}

// intercepta cliques nos botões principais (caso use href com placeholder)
document.querySelectorAll('a[href*="wa.me/55[NÚMERO]"]').forEach(a=>{
  a.addEventListener('click', function(e){
    e.preventDefault();
    openWhatsApp('Olá! Quero me inscrever no próximo evento.');
  });
});

// Atualiza links flutuantes que contenham placeholder
const floater = document.querySelector('.whatsapp-float');
if(floater){
  floater.addEventListener('click', (e)=>{
    e.preventDefault();
    openWhatsApp('Olá! Quero me inscrever no próximo evento.');
  });
}

// Fim do script
