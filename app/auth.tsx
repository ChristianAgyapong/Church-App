import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const { login } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Animation values
  const formOpacity = useSharedValue(1);
  const formTranslateY = useSharedValue(0);

  const toggleAuthMode = () => {
    // Animate form transition
    formOpacity.value = withTiming(0, { duration: 200 }, () => {
      setIsSignUp(!isSignUp);
      formOpacity.value = withTiming(1, { duration: 200 });
    });
  };

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (isSignUp) {
      if (!formData.firstName || !formData.lastName) {
        Alert.alert('Error', 'Please enter your full name');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate authentication process with loading
    setTimeout(async () => {
      // Create user data
      const userData = {
        id: '1',
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        email: formData.email,
        memberSince: '2025',
      };

      // Save user data
      await login(userData);
      
      setIsLoading(false);
      
      // Navigate directly to home screen
      router.replace('/(tabs)');
    }, 2000); // 2 second loading simulation
  };

  const handleSocialAuth = async (provider: string) => {
    setIsLoading(true);

    // Simulate social authentication
    setTimeout(async () => {
      // Create user data for social login
      const userData = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider.toLowerCase()}.com`,
        memberSince: '2025',
      };

      // Save user data
      await login(userData);
      
      setIsLoading(false);
      
      // Navigate directly to home screen
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#2E86C1', '#3498DB']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isSignUp 
                ? 'Join the GCCMA family today' 
                : 'Sign in to continue your journey'
              }
            </Text>
          </View>

          {/* Form Container */}
          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            <View style={[styles.formCard, { backgroundColor: colors.background }]}>
              {/* Sign Up Fields */}
              {isSignUp && (
                <>
                  <View style={styles.nameRow}>
                    <View style={[styles.inputContainer, styles.halfWidth]}>
                      <Text style={[styles.inputLabel, { color: colors.text }]}>First Name</Text>
                      <TextInput
                        style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                        placeholder="John"
                        placeholderTextColor={colors.icon}
                        value={formData.firstName}
                        onChangeText={(text) => handleInputChange('firstName', text)}
                      />
                    </View>
                    <View style={[styles.inputContainer, styles.halfWidth]}>
                      <Text style={[styles.inputLabel, { color: colors.text }]}>Last Name</Text>
                      <TextInput
                        style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                        placeholder="Doe"
                        placeholderTextColor={colors.icon}
                        value={formData.lastName}
                        onChangeText={(text) => handleInputChange('lastName', text)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>Phone Number</Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                      placeholder="+1 (555) 123-4567"
                      placeholderTextColor={colors.icon}
                      value={formData.phone}
                      onChangeText={(text) => handleInputChange('phone', text)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </>
              )}

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="john@example.com"
                  placeholderTextColor={colors.icon}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Password</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.icon}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry
                />
              </View>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Confirm Password</Text>
                  <TextInput
                    style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.icon}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry
                  />
                </View>
              )}

              {/* Forgot Password (Sign In only) */}
              {!isSignUp && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity 
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ['#95A5A6', '#BDC3C7'] : ['#27AE60', '#2ECC71']}
                  style={styles.submitGradient}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="white" size="small" />
                      <Text style={[styles.submitButtonText, { marginLeft: 10 }]}>
                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.submitButtonText}>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.icon }]}>or</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              {/* Social Authentication */}
              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={[
                    styles.socialButton, 
                    { backgroundColor: '#4267B2', borderColor: colors.border },
                    isLoading && { opacity: 0.7 }
                  ]}
                  onPress={() => handleSocialAuth('Facebook')}
                  disabled={isLoading}
                >
                  <IconSymbol name="house.fill" size={20} color="white" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.socialButton, 
                    { backgroundColor: '#DB4437', borderColor: colors.border },
                    isLoading && { opacity: 0.7 }
                  ]}
                  onPress={() => handleSocialAuth('Google')}
                  disabled={isLoading}
                >
                  <IconSymbol name="house.fill" size={20} color="white" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
              </View>

              {/* Toggle Auth Mode */}
              <View style={styles.toggleContainer}>
                <Text style={[styles.toggleText, { color: colors.icon }]}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode} disabled={isLoading}>
                  <Text style={[
                    styles.toggleLink, 
                    { color: isLoading ? colors.icon : colors.tint }
                  ]}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formCard: {
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    marginRight: 5,
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
