# Slurp - Dating App

A modern Tinder-style dating app with React Native mobile app + Laravel API backend.

## Tech Stack

### Mobile App
- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based routing with native navigation
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - Lightweight state management
- **TypeScript** - Type-safe JavaScript
- **Lucide React Native** - Beautiful icon library

### Backend API
- **Laravel 12** - API backend framework
- **Filament 4** - Admin dashboard
- **Laravel Sanctum** - API authentication
- **Supabase** - PostgreSQL database
- **Herd** - Local development server

**📖 New to this stack?** See [docs/monorepo-setup-guide.md](docs/monorepo-setup-guide.md) for step-by-step setup instructions.

## Features

### Current
- Splash screen with app branding
- Authentication flow (login/signup screens)
- Bottom tab navigation
- Four main screens:
  - Discover (swipe interface)
  - Matches
  - Messages
  - Profile

### Coming Soon
- User authentication with Supabase
- Profile creation and editing
- Card swipe functionality
- Real-time messaging
- Match algorithm
- Photo uploads
- User preferences

## Monorepo Structure

This is a monorepo containing both the mobile app and the API backend:

```
slurp/
├── api/                     # Laravel API Backend
│   ├── app/                 # Laravel application code
│   ├── config/              # Configuration files
│   ├── database/            # Migrations, seeds
│   ├── routes/
│   │   ├── api.php          # API routes
│   │   └── web.php          # Web routes (Filament)
│   ├── .env                 # Laravel environment variables
│   └── README.md            # API-specific documentation
│
├── app/                     # React Native App (Expo Router)
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Splash/home screen
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── (tabs)/              # Main app tabs
│       ├── _layout.tsx
│       ├── index.tsx        # Discover/swipe
│       ├── matches.tsx
│       ├── messages.tsx
│       └── profile.tsx
│
├── components/              # Reusable UI components
│   └── ui/
├── lib/                     # Utilities
│   └── supabase.ts
├── store/                   # Zustand state management
│   └── userStore.ts
├── assets/                  # Images, fonts, etc.
├── docs/                    # Documentation
│   └── monorepo-setup-guide.md
├── .env                     # React Native environment variables
└── README.md                # This file
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PHP 8.2+ and Composer installed
- Herd (or Laravel Valet/Sail) for local Laravel development
- Expo Go app on your phone (for testing)
- Git

### Mobile App Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/slurp.git
   cd slurp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   The `.env` file is already configured with:
   - `EXPO_PUBLIC_API_URL` - Points to local Laravel API
   - Supabase credentials

4. **Start the development server**
   ```bash
   npm start
   ```

### API Backend Setup

See [api/README.md](api/README.md) for detailed backend setup instructions.

**Quick start:**

1. **Configure Herd**
   ```bash
   cd api
   herd link slurp
   ```
   Your API will be available at `http://slurp.test`

2. **Run migrations**
   ```bash
   php artisan migrate:fresh
   ```

3. **Create admin user**
   ```bash
   php artisan make:filament-user
   ```

4. **Access admin panel**
   - Admin: http://slurp.test/admin
   - API Health: http://slurp.test/api/health

### Running the App

After starting the dev server, you can:

- **Press `i`** - Open in iOS simulator (macOS only)
- **Press `a`** - Open in Android emulator
- **Press `w`** - Open in web browser
- **Scan QR code** - Use Expo Go app on your phone

## Development Commands

```bash
# Start development server
npm start
# or
npx expo start

# Start with cache cleared (useful for NativeWind changes)
npx expo start -c

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Color Theme

- **Primary**: `#FF4458` (Tinder red)
- **Secondary**: `#FFC629` (Gold)
- **Background**: `#FFFFFF` (White)
- **Text**: `#424242` (Dark gray)

## Styling with NativeWind

This project uses NativeWind (Tailwind for React Native). Use Tailwind classes like you would in web:

```tsx
<View className="flex-1 bg-primary items-center justify-center">
  <Text className="text-2xl font-bold text-white">
    Hello Slurp
  </Text>
</View>
```

If styles don't update, restart with cache cleared:
```bash
npx expo start -c
```

## State Management

We use Zustand for state management. Example:

```tsx
import { useUserStore } from '@/store/userStore';

function Component() {
  const { user, login, logout } = useUserStore();

  // Use state...
}
```

## Deployment

### Backend (Laravel API)
Deploy the Laravel API using **Ploi**:
1. Point Ploi to this repository
2. Set web root to `/api/public`
3. Configure environment variables in Ploi
4. Push to deploy automatically

See [api/README.md](api/README.md#deployment-ploi) for detailed Ploi configuration.

### Mobile App
Build and publish using **Expo EAS**:
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for production
eas build --platform all

# Submit to app stores
eas submit --platform all
```

Update `EXPO_PUBLIC_API_URL` in production build to point to your deployed API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ and ☕
