function validateMessage(text) {
  if (text.length > 1000) {
    return {
      ok: false,
      error: 'Сообщение слишком длинное, максимум 1000 символов',
    };
  }
  return { ok: true };
}

if (typeof module !== 'undefined') {
  module.exports = { validateMessage };
}
