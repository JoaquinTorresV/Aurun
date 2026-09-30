// ===== Aurun Landing — envío de leads + Meta Pixel =====

// Endpoint del bot (Maya) que recibe el lead, lo guarda en Postgres y dispara la plantilla.
const WEBHOOK_URL = "https://whatsapp.jqsystem.es/register";

(function () {
  const form = document.getElementById('strategyForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  // Lee una cookie (para adjuntar _fbp y mejorar el match del pixel más adelante)
  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : '';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validación de campos requeridos
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

    // Metadata útil para el CRM / atribución
    const payload = {
      ...data,
      source: window.location.href,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      timestamp: new Date().toISOString(),
    };

    // Evento de conversión Meta Pixel
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: 'Diagnóstico gratis Aurun',
        content_category: data.rubro || 'B2B Lead',
      });
    }

    // Envío al webhook de n8n (no bloqueamos la UX del usuario)
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('No se pudo enviar el lead al webhook:', err);
      }
    } else {
      console.log('Lead capturado (falta WEBHOOK_URL):', payload);
    }

    // Feedback visual
    form.style.display = 'none';
    success.style.display = 'block';
  });
})();
