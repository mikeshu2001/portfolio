# Git и GitHub

## Репозиторий

- URL: `git@github.com:mikeshu2001/portfolio.git`
- Ветка: `main` (отслеживает `origin/main`)
- Remote — SSH-формат, не HTTPS

## Авторизация

Настроена через SSH-ключ `~/.ssh/id_ed25519.pub` (добавлен на аккаунт `mikeshu2001` в браузере пользователем). `git push` работает без паролей и токенов.

- `gh` CLI не установлен
- Homebrew не установлен
- PAT-варианты и установку `gh` пользователю не предлагать — SSH уже работает

## Идентичность коммитов

- `user.name` / `user.email` заданы **локально** для этого репо: `Михаил Шумовский <neiro@unisender.com>`
- Глобальный `git config` не менялся

## Типичный цикл правок

    git add <файлы>
    git commit -m "Что поменял, одной строкой"
    git push
