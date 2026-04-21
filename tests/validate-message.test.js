const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateMessage } = require('../js/validate-message.js');

test('пустая строка — валидна', () => {
  assert.deepEqual(validateMessage(''), { ok: true });
});

test('короткое сообщение — валидно', () => {
  assert.deepEqual(validateMessage('Привет!'), { ok: true });
});

test('ровно 999 символов — валидно', () => {
  assert.deepEqual(validateMessage('a'.repeat(999)), { ok: true });
});

test('ровно 1000 символов — валидно (граница включительно)', () => {
  assert.deepEqual(validateMessage('a'.repeat(1000)), { ok: true });
});

test('1001 символ — ошибка с правильным текстом', () => {
  const result = validateMessage('a'.repeat(1001));
  assert.equal(result.ok, false);
  assert.equal(
    result.error,
    'Сообщение слишком длинное, максимум 1000 символов',
  );
});

test('длинный русский текст — ошибка', () => {
  const result = validateMessage('ы'.repeat(1500));
  assert.equal(result.ok, false);
});
