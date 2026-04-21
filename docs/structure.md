# Структура файлов

## HTML

Единственный `index.html` — без сборки разбивать на партиалы не стали. В `<head>` подключены 12 `<link>` из `css/`, в конце `<body>` — 6 `<script>` из `js/` в порядке: `logger.js`, `page-events.js`, `footer-year.js`, `validate-message.js`, `contact-form.js`, `card-hover.js`. Порядок важен: `logger.js` должен загрузиться первым (все остальные используют `window.logger`), `validate-message.js` — до `contact-form.js` (тот вызывает `validateMessage`).

## CSS — `css/`

Один файл = одна зона ответственности. Менять цвета/радиусы/размеры — только `tokens.css`.

- `tokens.css` — `:root` переменные (цвета, радиусы, тени, ширины контейнеров)
- `base.css` — reset, typography (h1–h3, p), `.container`, `.container-narrow`, стили inline-ссылок в тексте (`.tagline a`, `.timeline-content a`)
- `buttons.css` — `.btn` + варианты (`primary`, `ghost`, `wide`)
- `sections.css` — каркас `.section`, `.section-alt`, `.section-intro`, футер
- `hero.css` — шапка: фон с градиентами, сетка, `.eyebrow`, `.tagline`, `.hero-actions`
- `about.css` — двухколоночная сетка «Обо мне»
- `timeline.css` — таймлайн опыта (вертикальная линия, точки, шапки этапов)
- `topics.css` — блок «О чём пишу» (две карточки со списками)
- `cards.css` — карточки избранных материалов (`.projects-grid`, `.card`, hover-подсветка через `--mx`/`--my`, теги, `.works-footer`)
- `logos.css` — сетка логотипов площадок
- `channel.css` — Telegram-карточка
- `form.css` — форма, блок «Спасибо», плашка с email редакции, счётчик символов под textarea

## JS — `js/`

Большинство файлов обёрнуты в IIFE и защищены от отсутствия нужных элементов. Исключения — модули-утилиты (`validate-message.js`, `logger.js`): они экспортируются и в браузер (через `window.*`), и в Node (через `module.exports`, используется в тестах).

- `logger.js` — модуль логирования: `window.logger` с уровнями debug/info/warn/error + функция `createLogger`. Автоматически вырезает персональные данные (`name`, `email`, `telegram`, `message`) из логируемых объектов. См. [logging-spec.md](logging-spec.md).
- `page-events.js` — логирует `page:loaded` + глобальные обработчики `error` / `unhandledrejection` (чтобы ловить всё, что упало само).
- `footer-year.js` — подставляет текущий год в `#year`.
- `validate-message.js` — функция `validateMessage(text)` → `{ ok, error? }`, проверяет длину сообщения ≤ 1000 символов.
- `contact-form.js` — обработчик submit формы, fetch к Formspree, живой счётчик под textarea, блокировка кнопки при превышении длины, логирование жизненного цикла формы.
- `card-hover.js` — обновляет CSS-переменные `--mx`/`--my` на `.card` по движению курсора (парная логика живёт в `cards.css` через `.card::after`).

## Тесты — `tests/`

Встроенный в Node тест-раннер (`node --test`), без внешних зависимостей. Запуск: `npm test`.

- `validate-message.test.js` — 6 тестов на граничные случаи функции `validateMessage` (0, 999, 1000, 1001 символ, юникод)
- `logger.test.js` — 12 тестов на модуль `logger.js`: PII-санитизация (5), `formatEvent` (3), `createLogger` с уровнями и sink (4)

## Прочее

- `package.json` — только метаданные и скрипт `test`. Зависимостей нет.
- `.gitignore` — `.DS_Store`, `node_modules/`, логи, `.vscode/`, `.idea/`
