# Структура файлов

## HTML

Единственный `index.html` — без сборки разбивать на партиалы не стали. В `<head>` подключены 12 `<link>` из `css/`, в конце `<body>` — 3 `<script>` из `js/` в порядке: `footer-year.js`, `contact-form.js`, `card-hover.js`.

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
- `form.css` — форма, блок «Спасибо», плашка с email редакции

## JS — `js/`

Каждый файл обёрнут в IIFE и защищён от отсутствия нужных элементов на странице.

- `footer-year.js` — подставляет текущий год в `#year`
- `contact-form.js` — обработчик submit формы → скрывает форму, показывает блок «Спасибо»
- `card-hover.js` — обновляет CSS-переменные `--mx`/`--my` на `.card` по движению курсора (парная логика живёт в `cards.css` через `.card::after`)

## Прочее

- `.gitignore` — `.DS_Store`, `node_modules/`, логи, `.vscode/`, `.idea/`
