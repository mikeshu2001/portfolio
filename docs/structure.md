# Структура файлов

## HTML

Единственный `index.html` — без сборки разбивать на партиалы не стали. В `<head>` подключены 12 `<link>` из `css/`, в конце `<body>` — 4 `<script>` из `js/` в порядке: `footer-year.js`, `validate-message.js`, `contact-form.js`, `card-hover.js`. Порядок важен: `validate-message.js` должен быть загружен до `contact-form.js`, т. к. последний вызывает функцию из первого.

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

Каждый файл обёрнут в IIFE и защищён от отсутствия нужных элементов на странице. Исключение — `validate-message.js`: это чистая функция-утилита, объявлена без IIFE, чтобы быть доступной и в браузере (как глобальная `validateMessage`), и в Node (через `module.exports`, используется в тестах).

- `footer-year.js` — подставляет текущий год в `#year`
- `validate-message.js` — функция `validateMessage(text)` → `{ ok, error? }`, проверяет длину сообщения ≤ 1000 символов
- `contact-form.js` — обработчик submit формы, fetch к Formspree, живой счётчик под textarea, блокировка кнопки при превышении длины
- `card-hover.js` — обновляет CSS-переменные `--mx`/`--my` на `.card` по движению курсора (парная логика живёт в `cards.css` через `.card::after`)

## Тесты — `tests/`

Встроенный в Node тест-раннер (`node --test`), без внешних зависимостей. Запуск: `npm test`.

- `validate-message.test.js` — 6 тестов на граничные случаи функции `validateMessage` (0, 999, 1000, 1001 символ, юникод)

## Прочее

- `package.json` — только метаданные и скрипт `test`. Зависимостей нет.
- `.gitignore` — `.DS_Store`, `node_modules/`, логи, `.vscode/`, `.idea/`
