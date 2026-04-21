// Список полей, значения которых — персональные данные.
// Если такое поле попадает в data логируемого события, его значение
// заменяется на '[redacted]'. Имена сравниваются без учёта регистра.
const PII_KEYS = ['name', 'email', 'telegram', 'message'];

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function sanitize(data) {
  if (data === null || typeof data !== 'object') return data;
  const result = Array.isArray(data) ? [] : {};
  for (const [key, value] of Object.entries(data)) {
    if (PII_KEYS.includes(key.toLowerCase())) {
      result[key] = '[redacted]';
    } else if (value !== null && typeof value === 'object') {
      result[key] = sanitize(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function formatEvent(level, event, data) {
  return {
    time: new Date().toISOString(),
    level,
    event,
    data: sanitize(data ?? {}),
  };
}

function defaultSink(payload) {
  const { time, level, event, data } = payload;
  const method = level === 'error' ? console.error
    : level === 'warn' ? console.warn
    : console.log;
  const colors = {
    debug: 'color: #888',
    info: 'color: #0891b2',
    warn: 'color: #f59e0b; font-weight: bold',
    error: 'color: #ef4444; font-weight: bold',
  };
  method(
    `%c[${time}] ${level.toUpperCase().padEnd(5)}%c ${event}`,
    colors[level],
    'color: inherit',
    data,
  );
}

function createLogger(minLevel = 'debug', sink = defaultSink) {
  const threshold = LEVELS[minLevel] ?? 0;

  function log(level, event, data) {
    if (LEVELS[level] < threshold) return null;
    const payload = formatEvent(level, event, data);
    sink(payload);
    return payload;
  }

  return {
    debug: (event, data) => log('debug', event, data),
    info: (event, data) => log('info', event, data),
    warn: (event, data) => log('warn', event, data),
    error: (event, data) => log('error', event, data),
  };
}

// В браузере — готовый инстанс + фабрика для кастомных логгеров.
if (typeof window !== 'undefined') {
  window.createLogger = createLogger;
  window.logger = createLogger('debug');
}

// В Node — экспорт для тестов.
if (typeof module !== 'undefined') {
  module.exports = { sanitize, formatEvent, createLogger };
}
