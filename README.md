# Проект SCP Site

## Требования
- Node.js (версия 18+)
- Docker и Docker Compose

## Локальный запуск проекта

### 1. Настройка базы данных
База данных работает на PostgreSQL внутри Docker Compose.
В корневой папке выполните команду:
```bash
cd db
docker-compose up -d
```
Это запустит PostgreSQL на порту `5431`. 

### 2. Запуск Backend-сервера (NestJS)
Бэкенд написан на NestJS с использованием Prisma ORM.

1. Перейдите в папку `backend`.
2. Скопируйте файл с примером переменных окружения:
   ```bash
   cp .env.example .env
   ```
   *(Значение `DATABASE_URL` уже настроено для работы с локальной базой данных в Docker)*
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Обновите базу данных (создайте нужные таблицы):
   ```bash
   npx prisma db push
   # или npx prisma migrate dev (если настроены миграции)
   ```
5. Запустите бэкенд в режиме разработки:
   ```bash
   npm run start:dev
   ```
API будет доступно по адресу `http://localhost:3001` (или на другом порту, указанном в NestJS).

### 3. Запуск Frontend-приложения (Next.js)
Фронтенд работает на Next.js (App Router).

1. В корневой папке проекта установите зависимости:
   ```bash
   npm install
   ```
2. Запустите сервер разработки Next.js:
   ```bash
   npm run dev
   ```
Фронтенд будет доступен по адресу `http://localhost:3000`.

## Обзор архитектуры
- **Frontend**: Next.js (React)
- **Backend**: NestJS
- **База данных**: PostgreSQL (в Docker)
- **ORM**: Prisma (запускается из папки `backend`)
