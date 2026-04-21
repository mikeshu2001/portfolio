const { test } = require('node:test');
const assert = require('node:assert/strict');
const { sanitize, formatEvent, createLogger } = require('../js/logger.js');

// ========== sanitize ==========

test('sanitize: PII-поля заменяются на [redacted]', () => {
  const input = {
    name: 'Иван',
    email: 'test@test.com',
    telegram: '@user',
    message: 'привет',
    safe: 'visible',
  };
  const result = sanitize(input);
  assert.equal(result.name, '[redacted]');
  assert.equal(result.email, '[redacted]');
  assert.equal(result.telegram, '[redacted]');
  assert.equal(result.message, '[redacted]');
  assert.equal(result.safe, 'visible');
});

test('sanitize: имена полей нечувствительны к регистру', () => {
  const result = sanitize({ Email: 'a@b.c', MESSAGE: 'hi', Telegram: '@u' });
  assert.equal(result.Email, '[redacted]');
  assert.equal(result.MESSAGE, '[redacted]');
  assert.equal(result.Telegram, '[redacted]');
});

test('sanitize: чистит PII во вложенных объектах', () => {
  const result = sanitize({ user: { email: 'a@b.c', id: 42 }, count: 5 });
  assert.equal(result.user.email, '[redacted]');
  assert.equal(result.user.id, 42);
  assert.equal(result.count, 5);
});

test('sanitize: не мутирует входной объект', () => {
  const input = { email: 'a@b.c', safe: 'value' };
  sanitize(input);
  assert.equal(input.email, 'a@b.c');
});

test('sanitize: не-объекты пропускает как есть', () => {
  assert.equal(sanitize(null), null);
  assert.equal(sanitize(undefined), undefined);
  assert.equal(sanitize('string'), 'string');
  assert.equal(sanitize(42), 42);
});

// ========== formatEvent ==========

test('formatEvent: возвращает структуру с time/level/event/data', () => {
  const event = formatEvent('info', 'test:event', { x: 1 });
  assert.equal(event.level, 'info');
  assert.equal(event.event, 'test:event');
  assert.deepEqual(event.data, { x: 1 });
  assert.match(event.time, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
});

test('formatEvent: санитизирует data', () => {
  const event = formatEvent('warn', 'user:login', { email: 'a@b.c' });
  assert.equal(event.data.email, '[redacted]');
});

test('formatEvent: data по умолчанию пустой объект', () => {
  const event = formatEvent('debug', 'test');
  assert.deepEqual(event.data, {});
});

// ========== createLogger ==========

test('createLogger: возвращает объект с debug/info/warn/error', () => {
  const logger = createLogger('debug', () => {});
  assert.equal(typeof logger.debug, 'function');
  assert.equal(typeof logger.info, 'function');
  assert.equal(typeof logger.warn, 'function');
  assert.equal(typeof logger.error, 'function');
});

test('createLogger: вызывает sink для каждого залогированного события', () => {
  const captured = [];
  const logger = createLogger('debug', (payload) => captured.push(payload));
  logger.info('test:a');
  logger.warn('test:b');
  assert.equal(captured.length, 2);
  assert.equal(captured[0].event, 'test:a');
  assert.equal(captured[0].level, 'info');
  assert.equal(captured[1].event, 'test:b');
  assert.equal(captured[1].level, 'warn');
});

test('createLogger: фильтрует события ниже minLevel', () => {
  const captured = [];
  const logger = createLogger('warn', (p) => captured.push(p));
  logger.debug('skip:1');
  logger.info('skip:2');
  logger.warn('keep:1');
  logger.error('keep:2');
  assert.equal(captured.length, 2);
  assert.equal(captured[0].event, 'keep:1');
  assert.equal(captured[1].event, 'keep:2');
});

test('createLogger: PII в data санитизируется перед sink', () => {
  const captured = [];
  const logger = createLogger('debug', (p) => captured.push(p));
  logger.info('form:submit', { email: 'a@b.c', durationMs: 100 });
  assert.equal(captured[0].data.email, '[redacted]');
  assert.equal(captured[0].data.durationMs, 100);
});
