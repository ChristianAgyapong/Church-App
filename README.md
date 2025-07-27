# GCCMA Church App

A comprehensive church mobile application built with React Native and Expo, designed to connect church members and provide easy access to church services, events, and community features.

## Features

### 🏠 Home Screen
- Welcome message with church branding
- Quick action buttons for key features
- Latest sermon display
- Upcoming events preview
- Daily Bible verse

### 🎙️ Sermons
- Browse and search sermon library
- Filter by category (Sunday Service, Bible Study, Youth, etc.)
- Audio/video playback capabilities
- Sermon notes and descriptions
- Speaker information and dates

### 📅 Events
- Comprehensive event calendar
- Filter events by category
- Add events to device calendar
- Event details with location and time
- RSVP functionality

### 🤝 Connect
- Prayer request submission
- Contact information
- Social media links
- Small group connections
- Volunteer opportunities
- Pastoral team information

### 💰 Online Giving
- Secure donation processing
- Multiple giving categories
- Quick amount selection
- Custom amount input
- Impact information
- Alternative giving methods

### 🙏 Prayer Requests
- Anonymous or named submissions
- Prayer categories
- Urgent request flagging
- Prayer team information
- Contact options for immediate needs

### 📺 Live Streaming
- Watch live church services
- Service schedule
- Previous service access
- Social features during live streams
- Service information and speakers

### ⚙️ Additional Features
- Dark/Light mode support
- Push notifications
- Offline capabilities
- Multi-language support
- Accessibility features

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Expo Router**: File-based routing
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation library
- **Expo Vector Icons**: Icon library
- **Linear Gradient**: Beautiful gradient backgrounds
- **Expo Blur**: Blur effects for iOS

## Project Structure

```
church-app/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── sermons.tsx    # Sermons list
│   │   ├── events.tsx     # Events calendar
│   │   ├── connect.tsx    # Connection features
│   │   └── more.tsx       # Additional features
│   ├── auth.tsx           # Authentication screen
│   ├── giving.tsx         # Online giving
│   ├── prayer-request.tsx # Prayer request form
│   ├── live-stream.tsx    # Live streaming
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── HapticTab.tsx     # Custom tab component
├── constants/            # App constants
│   └── Colors.ts         # Color scheme
├── hooks/               # Custom hooks
│   └── useColorScheme.ts # Color scheme hook
└── assets/              # Static assets
    ├── images/          # Image files
    └── fonts/           # Font files
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd church-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## Development

### File Structure Guidelines
- Place new screens in the `app/` directory
- Create reusable components in `components/`
- Add styling constants to `constants/`
- Use TypeScript for all new files

### Styling
- Use the Colors constant for consistent theming
- Support both light and dark modes
- Follow React Native StyleSheet patterns
- Use Flexbox for layouts

### Navigation
- Expo Router provides file-based routing
- Tab navigation for main sections
- Stack navigation for detailed views
- Deep linking support included

## Features To Implement

### Phase 2
- [ ] User authentication and profiles
- [ ] Push notifications for events
- [ ] Offline sermon downloads
- [ ] Bible reading plans
- [ ] Small group management
- [ ] Event check-in system

### Phase 3
- [ ] Social features and community
- [ ] Prayer wall
- [ ] Volunteer scheduling
- [ ] Donation tracking
- [ ] Multi-campus support
- [ ] Administrative dashboard

## API Integration

The app is designed to work with a church management system API. Key endpoints needed:

- `/sermons` - Sermon data and media files
- `/events` - Church events and calendar
- `/giving` - Donation processing
- `/prayers` - Prayer request management
- `/livestream` - Live streaming information
- `/notifications` - Push notification system

## Deployment

### Building for Production

1. Build for iOS:
```bash
npx expo build:ios
```

2. Build for Android:
```bash
npx expo build:android
```

3. Submit to app stores:
```bash
npx expo submit:ios
npx expo submit:android
```

### Environment Configuration
- Development: `expo start`
- Staging: `expo start --variant staging`
- Production: App Store/Google Play builds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Considerations

- All API communications use HTTPS
- Payment processing follows PCI DSS guidelines
- Personal data is encrypted at rest and in transit
- Authentication tokens are securely stored
- Regular security audits and updates

## Accessibility

The app follows WCAG 2.1 guidelines:
- VoiceOver/TalkBack support
- High contrast mode compatibility
- Font scaling support
- Touch target size compliance
- Keyboard navigation support

## Support

For technical support or questions:
- Email: support@gccma.org
- Phone: +1 (555) 123-4567
- Documentation: [Church App Docs](https://docs.gccma.org)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GCCMA community for feedback and testing
- React Native and Expo teams for excellent tools
- Open source contributors for various libraries used

---

**GCCMA Church App** - Growing in Christ, Changing the World