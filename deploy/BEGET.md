# Размещение modultomsk.ru на VPS Beget

## 1. Сборка на компьютере

```bash
npm install
npm run build
```

Для **только статики** (без Node на фронте):

```bash
STATIC_EXPORT=1 npm run build
```

Файлы: `.next` + `next start` **или** папка `out/` при static export.

## 2. Node.js API (заявки с формы)

На VPS запустите API (PM2/systemd):

```bash
cd /path/to/modultomsk-site
npm install --omit=dev
API_PORT=3001 node server/index.js
```

В `.env` на фронте (или при сборке):

```
NEXT_PUBLIC_API_URL=https://modultomsk.ru
```

Nginx — прокси `/api/` на `http://127.0.0.1:3001`:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 3. Next.js на VPS

```bash
npm run build
npm run start:next   # порт 3000
```

Nginx:

```nginx
server {
    listen 80;
    server_name modultomsk.ru www.modultomsk.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

## 4. Static export (Apache)

```bash
STATIC_EXPORT=1 npm run build
```

Загрузите содержимое `out/` в `public_html`. API — отдельно (п. 2).  
Для SPA-маршрутов добавьте `.htaccess` с fallback на `index.html`.

## 5. SSL

Let's Encrypt для `modultomsk.ru` и `www` в панели Beget.

## 6. Обновление

```bash
git pull
npm install
npm run build
# перезапуск PM2 / next / API
```

Контакты — `lib/site.ts`.
