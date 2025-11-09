# React Native + Laravel Monorepo Setup Guide

Quick reference for setting up a monorepo with React Native (Expo) + Laravel API + Filament admin.

## Stack

- **Frontend:** React Native (Expo Router) + NativeWind (Tailwind)
- **Backend:** Laravel 12 + Filament 4 + Sanctum
- **Database:** Supabase (PostgreSQL)
- **Local Dev:** Herd (macOS)
- **State:** Zustand

---

## Prerequisites

- Node.js 18+
- PHP 8.2+ & Composer
- Herd (or Valet/Sail)
- Supabase account

---

## Project Structure

```
project/
├── api/              # Laravel backend
├── app/              # React Native screens (Expo Router)
├── components/       # Reusable components
├── lib/              # Utilities
├── store/            # State management
├── .env              # React Native env
└── docs/             # This guide
```

---

## Setup Steps

### 1. Create React Native App

```bash
npx create-expo-app your-app-name
cd your-app-name

# Install dependencies
npm install expo-router nativewind zustand
npm install --save-dev tailwindcss
```

### 2. Install Laravel in /api Folder

```bash
composer create-project laravel/laravel api
cd api

# Install packages
composer require filament/filament:"^4.0"
composer require laravel/sanctum

# Install Filament panel
php artisan filament:install --panels

# Publish Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 3. Configure Supabase Database

**Get Supabase Credentials:**
- Go to Supabase project → Settings → Database
- Copy **Connection Pooler** details (for local dev)
- Copy **Direct Connection** details (for production)

**Update `/api/.env`:**
```env
DB_CONNECTION=pgsql

# LOCAL (use pooler)
DB_HOST=aws-0-us-west-2.pooler.supabase.com
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres.YOUR_PROJECT_ID
DB_PASSWORD=your_password

# Add Supabase config
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important:** Use **pooler** for local, **direct connection** for production (Ploi).

### 4. Configure Laravel for API

**Update `/api/bootstrap/app.php`:**
```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',  // Add this
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Add Sanctum middleware
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Disable CSRF for API routes
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
    })
    // ... rest of config
```

**Add Supabase to `/api/config/services.php`:**
```php
'supabase' => [
    'url' => env('SUPABASE_URL'),
    'anon_key' => env('SUPABASE_ANON_KEY'),
    'service_role_key' => env('SUPABASE_SERVICE_ROLE_KEY'),
],
```

**Create `/api/routes/api.php`:**
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
```

### 5. Configure Herd

```bash
cd api
herd link your-app-name
```

Your API is now at: `http://your-app-name.test`

### 6. Run Migrations

```bash
php artisan config:clear
php artisan migrate:fresh
```

### 7. Create Admin User

**Option A - Interactive:**
```bash
php artisan make:filament-user
```

**Option B - Via Tinker:**
```bash
php artisan tinker --execute="
App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@test.com',
    'password' => bcrypt('password'),
]);
"
```

### 8. Configure React Native Environment

**Create `/.env`:**
```env
EXPO_PUBLIC_API_URL=http://your-app-name.test/api
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 9. Update .gitignore

Add Laravel files to root `.gitignore`:
```
# Laravel
/api/vendor/
/api/node_modules/
/api/.env
/api/storage/*.key
/api/storage/app/*
!/api/storage/app/.gitignore
/api/storage/framework/cache/*
!/api/storage/framework/cache/.gitignore
/api/storage/framework/sessions/*
!/api/storage/framework/sessions/.gitignore
/api/storage/framework/testing/*
!/api/storage/framework/testing/.gitignore
/api/storage/framework/views/*
!/api/storage/framework/views/.gitignore
/api/storage/logs/*
!/api/storage/logs/.gitignore
/api/bootstrap/cache/*
!/api/bootstrap/cache/.gitignore
/api/.phpunit.result.cache
/api/auth.json
```

---

## Testing

### Test API
```bash
curl http://your-app-name.test/api/health
```

### Test Filament
Open: `http://your-app-name.test/admin`

### Test React Native
```bash
npm start
```

---

## Common Issues

### Database Connection Error
**Problem:** `could not translate host name`

**Solution:** Use Supabase **connection pooler** for local development:
- Host: `aws-0-us-west-2.pooler.supabase.com`
- Username: `postgres.YOUR_PROJECT_ID`

### Filament Panel Not Found
**Problem:** `No default Filament panel is set`

**Solution:**
```bash
php artisan filament:install --panels
php artisan config:clear
```

### Config Not Updating
**Problem:** Changes to `.env` not reflecting

**Solution:**
```bash
php artisan config:clear
php artisan cache:clear
```

---

## Production Deployment

### Laravel (Ploi)
1. Set web root to `/api/public`
2. Use **direct Supabase connection** (not pooler):
   - Host: `db.your-project.supabase.co`
   - Username: `postgres`
3. Add build commands:
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### React Native (Expo EAS)
1. Update `EXPO_PUBLIC_API_URL` to production URL
2. Build:
   ```bash
   eas build --platform all
   ```

---

## Key Differences from Laravel/Supabase Defaults

1. **Database Connection:**
   - Local: Use pooler (`aws-0-us-west-2.pooler.supabase.com`)
   - Production: Use direct connection (`db.xxx.supabase.co`)

2. **Authentication:**
   - Laravel Sanctum for API tokens (not Supabase Auth SDK in Laravel)
   - React Native can use Supabase Auth directly

3. **CORS:**
   - Already configured in `bootstrap/app.php`
   - No cookies needed for mobile apps

---

## Quick Reference

| Service | Local URL | Production |
|---------|-----------|------------|
| API | `http://your-app.test/api` | `https://api.yourdomain.com` |
| Admin | `http://your-app.test/admin` | `https://api.yourdomain.com/admin` |
| React Native | Expo Dev Server | App Stores |

---

## Next Steps

1. Create Filament resources: `php artisan make:filament-resource ModelName`
2. Add API endpoints in `/api/routes/api.php`
3. Connect React Native to API endpoints
4. Set up authentication flow

---

**Last Updated:** Nov 2025
