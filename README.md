# All of K League

A cross-platform mobile and web application for the Korean Football League (K League) community.

## 🏆 Features

- **Match Schedule**: View upcoming matches for K League 1 and K League 2
- **League Standings**: Real-time league tables with team rankings
- **Match Results**: Live scores and match details
- **Stadium Information**: Details about all K League stadiums
- **Real-time Chat**: Community chat rooms for fans to connect

## 📱 Platforms

- ✅ Android
- ✅ iOS
- ✅ Web

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **Build System**: Expo Application Services (EAS)
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── services/       # API services
│   ├── models/         # TypeScript types/interfaces
│   ├── hooks/          # Custom React hooks
│   ├── constants/      # Theme, API endpoints
│   ├── config/         # App & database configuration
│   └── utils/          # Utility functions
├── assets/             # Images, fonts, etc.
├── .github/workflows/  # CI/CD pipelines
├── App.tsx             # Entry point
└── app.json           # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/eogh234/All_Of_KLeague.git

# Navigate to project directory
cd All_Of_KLeague

# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 🔧 Development

### Environment Configuration

The app supports multiple environments:
- **Development**: Local development with mock data
- **Staging**: Pre-production testing
- **Production**: Live application

Configuration is managed in `src/config/app.config.ts`.

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production

# Export web build
npx expo export --platform web
```

## 📊 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- **Lint & Type Check**: Validates code quality
- **Tests**: Runs automated tests
- **Build Web**: Creates web bundle
- **Build Mobile**: Creates Android/iOS builds (on develop branch)
- **Deploy**: Deploys to production (on main branch)

## 📱 Screenshots

Coming soon...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- K League for providing inspiration
- React Native and Expo communities

