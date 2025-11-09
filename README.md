# Slurp - Dating App

A modern Tinder-style dating app built with React Native and Expo.

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based routing with native navigation
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - Lightweight state management
- **Supabase** - Backend as a Service (authentication, database, storage)
- **TypeScript** - Type-safe JavaScript
- **Lucide React Native** - Beautiful icon library

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

## Project Structure

```
/app                   # Expo Router (file-based routing)
  _layout.tsx          # Root layout with global CSS import
  index.tsx            # Splash/home screen
  (auth)/              # Authentication group
    _layout.tsx
    login.tsx
    signup.tsx
  (tabs)/              # Main app tabs
    _layout.tsx        # Bottom tab navigator
    index.tsx          # Discover/swipe screen
    matches.tsx
    messages.tsx
    profile.tsx
/components
  /ui                  # Reusable UI components
/lib
  supabase.ts          # Supabase client configuration
/store
  userStore.ts         # Zustand state management
/assets                # Images, fonts, etc.
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Expo Go app on your phone (for testing)
- Git

### Installation

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
   Then edit `.env` and add your Supabase credentials (when ready):
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```
   or
   ```bash
   npm start
   ```

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
