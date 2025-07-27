import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Screen size breakpoints
export const BREAKPOINTS = {
  SMALL: 320,
  MEDIUM: 375,
  LARGE: 414,
  XLARGE: 480,
};

export const getScreenSize = () => {
  if (SCREEN_WIDTH <= BREAKPOINTS.SMALL) return 'small';
  if (SCREEN_WIDTH <= BREAKPOINTS.MEDIUM) return 'medium';
  if (SCREEN_WIDTH <= BREAKPOINTS.LARGE) return 'large';
  return 'xlarge';
};

export const isSmallScreen = () => SCREEN_WIDTH <= BREAKPOINTS.MEDIUM;
export const isMediumScreen = () => SCREEN_WIDTH > BREAKPOINTS.MEDIUM && SCREEN_WIDTH <= BREAKPOINTS.LARGE;
export const isLargeScreen = () => SCREEN_WIDTH > BREAKPOINTS.LARGE;

// Responsive font sizes
export const responsiveFontSize = (size: number) => {
  const newSize = scale(size);
  return Math.max(newSize, size * 0.8); // Minimum scale to maintain readability
};

// Responsive spacing
export const responsiveSpacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
};

// Screen dimensions
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: isSmallScreen(),
  isMedium: isMediumScreen(),
  isLarge: isLargeScreen(),
  size: getScreenSize(),
};

// Helper for responsive values
export const responsive = {
  small: isSmallScreen(),
  medium: isMediumScreen(),
  large: isLargeScreen(),
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  
  // Get responsive value based on screen size
  getValue: (small: any, medium?: any, large?: any) => {
    if (isSmallScreen()) return small;
    if (isMediumScreen()) return medium || small;
    return large || medium || small;
  },
};

export { SCREEN_HEIGHT, SCREEN_WIDTH };

