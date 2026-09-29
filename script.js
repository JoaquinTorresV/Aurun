// ===== LinkedAI Landing — form handling + Meta Pixel Lead event =====
(function () {
  const form = document.getElementById('strategyForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación básica de campos requeridos
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e05252';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    const data = Object.fromEntries(new FormData(form).entries());

    // ===== Evento de conversión Meta Pixel =====
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: 'Free Strategy Plan',
        content_category: 'B2B Lead',
      });
    }

    // TODO: enviar `data` a tu backend / CRM / webhook (n8n, email, etc.)
    // Ejemplo:
    // fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    console.log('Lead capturado:', data);

    // Feedback visual
    form.style.display = 'none';
    success.style.display = 'block';
  });
})();
