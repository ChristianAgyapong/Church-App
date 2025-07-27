import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const { isAuthenticated, isLoading } = useAuth();

  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const titleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(50);
  const subtitleOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    // Check if user is already authenticated
    if (!isLoading && isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    // Sequence of animations
    const animateSequence = () => {
      // Logo animation
      logoScale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) });
      logoOpacity.value = withTiming(1, { duration: 600 });

      // Title animation (delayed)
      setTimeout(() => {
        titleTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) });
        titleOpacity.value = withTiming(1, { duration: 600 });
      }, 400);

      // Subtitle animation (delayed)
      setTimeout(() => {
        subtitleTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) });
        subtitleOpacity.value = withTiming(1, { duration: 600 });
      }, 800);

      // Button animation (delayed)
      setTimeout(() => {
        buttonTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) });
        buttonOpacity.value = withTiming(1, { duration: 600 });
      }, 1200);

      // Glow effect
      setTimeout(() => {
        glowOpacity.value = withRepeat(
          withSequence(
            withTiming(0.6, { duration: 2000 }),
            withTiming(0.2, { duration: 2000 })
          ),
          -1,
          true
        );
      }, 1600);
    };

    if (!isLoading && !isAuthenticated) {
      animateSequence();
    }
  }, [isLoading, isAuthenticated]);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: titleOpacity.value,
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleTranslateY.value }],
    opacity: subtitleOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslateY.value }],
    opacity: buttonOpacity.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const navigateToAuth = () => {
    router.push('/auth');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E86C1', '#3498DB', '#5DADE2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background glow effect */}
        <Animated.View style={[styles.glowBackground, glowAnimatedStyle]} />

        {/* Content */}
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <View style={styles.logoCircle}>
                <Image
                  source={require('@/assets/images/adaptive-icon.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.Text style={[styles.title, titleAnimatedStyle]}>
              GCCMA
            </Animated.Text>

            {/* Subtitle */}
            <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
              Growing in Christ, Changing the World
            </Animated.Text>
          </View>

          {/* Welcome Message */}
          <Animated.View style={[styles.welcomeSection, buttonAnimatedStyle]}>
            <Text style={styles.welcomeTitle}>Welcome to Our Community</Text>
            <Text style={styles.welcomeText}>
              Join us in worship, fellowship, and serving God together as we grow in faith and love.
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.buttonSection, buttonAnimatedStyle]}>
            <TouchableOpacity style={styles.primaryButton} onPress={navigateToAuth}>
              <LinearGradient
                colors={['#27AE60', '#2ECC71']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Floating elements for visual appeal */}
        <Animated.View style={[styles.floatingElement, styles.element1, glowAnimatedStyle]} />
        <Animated.View style={[styles.floatingElement, styles.element2, glowAnimatedStyle]} />
        <Animated.View style={[styles.floatingElement, styles.element3, glowAnimatedStyle]} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  glowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Math.max(20, width * 0.05),
    paddingTop: height * 0.08,
    paddingBottom: Math.max(30, height * 0.04),
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: Math.max(20, height * 0.03),
  },
  logoCircle: {
    width: Math.min(120, width * 0.3),
    height: Math.min(120, width * 0.3),
    borderRadius: Math.min(60, width * 0.15),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoImage: {
    width: Math.min(80, width * 0.2),
    height: Math.min(80, width * 0.2),
    tintColor: 'white',
  },
  title: {
    fontSize: Math.min(42, width * 0.12),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: Math.min(18, width * 0.05),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: Math.min(24, width * 0.065),
    fontWeight: '300',
    paddingHorizontal: 10,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: Math.max(30, height * 0.04),
  },
  welcomeTitle: {
    fontSize: Math.min(24, width * 0.07),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: Math.min(16, width * 0.045),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: Math.min(22, width * 0.06),
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: Math.max(16, height * 0.02),
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: Math.min(18, width * 0.05),
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    paddingVertical: Math.max(14, height * 0.018),
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: 350,
  },
  secondaryButtonText: {
    fontSize: Math.min(16, width * 0.045),
    color: 'white',
    fontWeight: '600',
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  element1: {
    width: 80,
    height: 80,
    top: '15%',
    left: '10%',
  },
  element2: {
    width: 60,
    height: 60,
    top: '25%',
    right: '15%',
  },
  element3: {
    width: 40,
    height: 40,
    bottom: '30%',
    left: '20%',
  },
});
