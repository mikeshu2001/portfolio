(() => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');
  const message = document.getElementById('message');
  const counter = document.getElementById('message-counter');
  const button = form?.querySelector('button[type="submit"]');
  if (!form || !success || !errorEl || !message || !counter || !button) return;

  const MAX = 1000;
  const DEFAULT_ERROR_HTML = errorEl.innerHTML;
  let submitting = false;

  function updateCounter() {
    const len = message.value.length;
    const overflow = len > MAX;
    counter.textContent = overflow
      ? `${len} / ${MAX} — слишком длинно`
      : `${len} / ${MAX}`;
    counter.classList.toggle('is-over', overflow);
    if (!submitting) button.disabled = overflow;
  }

  message.addEventListener('input', updateCounter);
  updateCounter();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lenCheck = validateMessage(message.value);
    if (!lenCheck.ok) {
      errorEl.textContent = lenCheck.error + '.';
      errorEl.hidden = false;
      return;
    }

    errorEl.innerHTML = DEFAULT_ERROR_HTML;
    errorEl.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitting = true;
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
      errorEl.innerHTML = DEFAULT_ERROR_HTML;
      errorEl.hidden = false;
      button.textContent = originalText;
      submitting = false;
      updateCounter();
    }
  });
})();
