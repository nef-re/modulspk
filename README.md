# modulspk.ru

Сайт ООО «Модуль» — **Next.js 15** (SSG), **Tailwind CSS 4**, **Node.js (Express)** API для заявок.

## Стек

| Слой | Технология |
|------|------------|
| Фронтенд | Next.js 15, React 19, App Router |
| Стили | Tailwind CSS 4 |
| Бэкенд | Node.js + Express (`server/`) |
| Сборка | `next build` (статические страницы, `force-static`) |

## Разработка

**Запускайте команды из корня проекта** `modulspk-site`, не из папки `dist/`.

```bash
cd modulspk-site
npm install
# при белой странице или ошибках 500:
Remove-Item -Recurse -Force .next   # PowerShell
npm run dev
```

- Сайт: http://localhost:3000  
- API (опционально): `npm run dev:server` → http://localhost:3001

## Сборка

```bash
npm run build
npm start
```

Статический экспорт (только HTML, API отдельно на VPS):

```bash
STATIC_EXPORT=1 npm run build
# файлы в out/
```

На production укажите `NEXT_PUBLIC_API_URL=https://api.modulspk.ru` (или проксируйте `/api` через Nginx).

## Заявки

POST `/api/contact` — тело JSON: `name`, `phone`, `email?`, `service?`, `message?`.  
Сохранение в `server/data/leads.jsonl`.

## Контакты на сайте

Редактируйте `lib/site.ts` перед сборкой.

## Деплой

См. [deploy/BEGET.md](deploy/BEGET.md).
