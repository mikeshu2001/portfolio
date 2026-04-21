(() => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');
  const button = form?.querySelector('button[type="submit"]');
  if (!form || !success || !errorEl || !button) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Отправка…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      errorEl.hidden = false;
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();
