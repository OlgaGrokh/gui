# Caldera Guidelines — сайт гайдлайнов

Живая страница (приватный Artifact): https://claude.ai/artifact/6eSXKdPNEnUYobovTMrV5D

## Как добавить гайд
1. Добавить запись в `guides.json`: `id` (латиница), `title.ru` / `title.en`, пути к `.md` файлам RU и EN относительно этой папки.
   Пример для фильтров: `"../Caldera-filters-guidelines.md"` и `"../Caldera-filters-guidelines-en.md"`.
2. `npm install` (один раз), затем `npm run build` → пересоберётся `index.html`.
3. Опубликовать `index.html` в тот же Artifact (из другой сессии — передать URL выше как `url`, иначе создастся новая страница).

Шаблон страницы — `template.html`, сборка — `build.mjs`. Markdown режется на разделы по `## `; у каждого раздела своя кнопка копирования.
Ссылки на конкретный гайд: `#<id>-ru` / `#<id>-en`.
