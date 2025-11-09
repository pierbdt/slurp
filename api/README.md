# Slurp API - Laravel Backend

Backend API for the Slurp mobile application built with Laravel 12 + Filament 4.

## Stack

- **Laravel 12** - Backend framework
- **Filament 4** - Admin panel
- **Laravel Sanctum** - API authentication
- **Supabase** - PostgreSQL database
- **Herd** - Local development server

## Setup Instructions

### 1. Configure Herd

Since this is a monorepo with the API in a subfolder, you need to tell Herd where the Laravel app is:

```bash
cd /Users/jimmy/Desktop/github/slurp
herd link slurp --path api/public
```

Or simply:
```bash
cd /Users/jimmy/Desktop/github/slurp/api
herd link slurp
```

This will make your API available at: `http://slurp.test`

### 2. Run Database Migrations

Make sure your Supabase project is active, then run:

```bash
php artisan migrate:fresh
```

This will create all necessary tables in your Supabase database.

### 3. Create Filament Admin User

```bash
php artisan make:filament-user
```

Follow the prompts to create your admin account.

### 4. Access the App

- **API Health Check:** http://slurp.test/api/health
- **Filament Admin:** http://slurp.test/admin

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check

### Protected Endpoints (require Sanctum token)
- `GET /api/user` - Get authenticated user

## Environment Variables

The following environment variables are configured in `/api/.env`:

```env
APP_NAME=Slurp
APP_URL=http://slurp.test

DB_CONNECTION=pgsql
DB_HOST=db.czxtkycbhbnowjrgepug.supabase.co
DB_PORT=5432
DB_DATABASE=postgres

SUPABASE_URL=https://czxtkycbhbnowjrgepug.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Deployment (Ploi)

### Ploi Configuration

1. **Repository:** Point to this repo
2. **Web Root:** Set to `/api/public` (not just `/api`)
3. **Environment:** Copy `.env` values to Ploi's environment settings
4. **Build Commands:**
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Production URL
After deployment, update your React Native `.env`:
```env
EXPO_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Development Workflow

1. Start Herd (should auto-start)
2. Make changes to Laravel code
3. Changes are instantly reflected (no build step needed)
4. Access Filament admin to manage data

## Troubleshooting

### Database Connection Error
- Verify Supabase project is not paused
- Check database credentials in `.env`
- Make sure your IP is allowed in Supabase settings

### Herd Not Working
- Run `herd restart`
- Check Herd menu bar app is running
- Verify the link with `herd links`

### CORS Issues from React Native
- CORS is configured in `bootstrap/app.php`
- Sanctum is set up for token-based auth
- No cookies needed for mobile apps
