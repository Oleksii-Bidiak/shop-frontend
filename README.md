# Accessory Shop Frontend

Комерційний Next.js клієнт для магазину аксесуарів (чохли, навушники, захисне скло тощо) із окремими частинами для публічного сайту та адмінки. Архітектура організована у стилі FSD, що дозволяє безболісно масштабувати нові фічі та команди.

## Стек
- **Next.js 14 (App Router)**
- **TypeScript**, **ESLint**
- **TanStack Query** для роботи з даними
- **Redux Toolkit** для сесій користувача
- **Axios** з JWT-інтерцепторами

## Запуск
```bash
npm install
npm run dev
```

## Git flow
- **Гілки**: `main` = продакшн, `develop` = стагінг.
- **Розробка**: кожна фіча/фікс = окремий feature-бренч від `develop`. Після ревʼю робимо PR у `develop`.
- **Стагінг**: злиття в `develop` автоматично деплоїться на staging-середовище.
- **Продакшн**: після тестів на staging робимо PR з `develop` у `main`. Мердж у `main` автоматично деплоїть у production.
- **Хотфікси**: критичні виправлення відгалужуємо від `main`, після релізу мерджимо у `main`, а потім робимо back-merge у `develop`.

## CI/CD
- **PR-перевірки**: GitHub Actions запускає `lint`, `typecheck`, `build` для PR у `develop` та `main`. Використовує npm-cache та кеш для `.next/cache`.
- **Auto-deploy**:
  - push у `develop` → staging-розгортання (через секрет `STAGING_DEPLOY_WEBHOOK_URL` та staging-env-параметри).
  - push у `main` → production-розгортання (секрет `PRODUCTION_DEPLOY_WEBHOOK_URL`).
- Перелік секретів, які очікують воркфлоу: `STAGING_DEPLOY_WEBHOOK_URL`, `PRODUCTION_DEPLOY_WEBHOOK_URL`, `STAGING_API_URL`, `PRODUCTION_API_URL`, `STAGING_ANALYTICS_WRITE_KEY`, `PRODUCTION_ANALYTICS_WRITE_KEY`, `STAGING_PAYMENTS_PUBLIC_KEY`, `PRODUCTION_PAYMENTS_PUBLIC_KEY`.

## Середовища та конфіг
Рантайм-конфіг централізований у `src/shared/config/runtime.ts` та експортується як `appConfig`.

### Основні змінні
- `NEXT_PUBLIC_APP_ENV` — `development` | `staging` | `production` (використовується для вибору оточення).
- `NEXT_PUBLIC_API_URL` — базовий URL API (без трейлінгу `/`).
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` та `NEXT_PUBLIC_ANALYTICS_WRITE_KEY` — налаштування аналітики (наприклад, Plausible/Segment/Posthog).
- `NEXT_PUBLIC_PAYMENTS_PROVIDER` та `NEXT_PUBLIC_PAYMENTS_PUBLIC_KEY` — інтеграція з платіжним провайдером (наприклад, Stripe).

### Env-файли
- Локально: скопіюйте `.env.example` у `.env.local` або `.env.development`.
- Стагінг/прод: використовуйте `.env.staging.example` та `.env.production.example` як шаблони для секретів у GitHub Actions (`env`/`secrets`).
- Значення з `.env.*` автоматично підтягуються Next.js під час `next build`/`next start`.

## Архітектурні ноти
- `src/app/(public)` — основний сайт, промо та каталог.
- `src/app/(admin)/admin` — адмінка з окремим layout та сторінками.
- `src/shared/api/axios-instance.ts` — axios з JWT-інтерцепторами та автоматичним рефрешем (бере URL з рантайм-конфігу).
- `src/shared/store` + `features/auth` — зберігання сесії та токенів.
- `entities/product` + `features/product-list` — FSD-шари для каталогу.
- `app/api/*` — мокові ендпоїнти для швидкого локального деву (продукти, auth/login, auth/refresh).

## Подальше розширення
- Під’єднати реальний бекенд у `NEXT_PUBLIC_API_URL`.
- Додати сторінки кошика/оплати, фільтри каталогу, форму створення товарів в адмінці.
- Підв’язати CI/CD для автоматичного деплою гілок `develop` та `main` у відповідні середовища.
