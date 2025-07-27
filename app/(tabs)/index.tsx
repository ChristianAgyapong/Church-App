import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];

  const quickActions = [
    { title: 'Live Stream', icon: 'play.circle.fill', route: '/live-stream', color: '#E74C3C' },
    { title: 'Give Online', icon: 'house.fill', route: '/giving', color: '#27AE60' },
    { title: 'Prayer Request', icon: 'paperplane.fill', route: '/prayer-request', color: '#3498DB' },
    { title: 'Contact Us', icon: 'person.2.fill', route: '/contact', color: '#9B59B6' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <LinearGradient
        colors={['#2E86C1', '#3498DB']}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.churchName}>GCCMA</Text>
        <Text style={styles.subtitle}>Growing in Christ, Changing the World</Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={() => router.push(action.route as any)}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <IconSymbol name={action.icon as any} size={24} color="white" />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Latest Sermon */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Sermon</Text>
        <TouchableOpacity
          style={[styles.sermonCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/sermons')}
        >
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.sermonImage}
          />
          <View style={styles.sermonContent}>
            <Text style={[styles.sermonTitle, { color: colors.text }]}>
              Walking in Faith
            </Text>
            <Text style={[styles.sermonSpeaker, { color: colors.icon }]}>
              Pastor John Smith
            </Text>
            <Text style={[styles.sermonDate, { color: colors.icon }]}>
              Sunday, July 27, 2025
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => router.push('/events')}>
            <Text style={[styles.seeAllText, { color: colors.tint }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.eventCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/events')}
        >
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>30</Text>
            <Text style={styles.eventMonth}>JUL</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={[styles.eventTitle, { color: colors.text }]}>Youth Night</Text>
            <Text style={[styles.eventTime, { color: colors.icon }]}>7:00 PM - 9:00 PM</Text>
            <Text style={[styles.eventLocation, { color: colors.icon }]}>Youth Hall</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bible Verse of the Day */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Verse of the Day</Text>
        <View style={[styles.verseCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.verseText, { color: colors.text }]}>
            "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."
          </Text>
          <Text style={[styles.verseReference, { color: colors.tint }]}>Jeremiah 29:11</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Math.max(20, screenWidth * 0.05),
    paddingTop: Math.max(50, screenHeight * 0.07),
    alignItems: 'center',
    minHeight: screenHeight * 0.25,
  },
  welcomeText: {
    fontSize: Math.min(18, screenWidth * 0.05),
    color: 'white',
    opacity: 0.9,
  },
  churchName: {
    fontSize: Math.min(32, screenWidth * 0.09),
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(16, screenWidth * 0.045),
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    padding: Math.max(15, screenWidth * 0.04),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  sectionTitle: {
    fontSize: Math.min(22, screenWidth * 0.06),
    fontWeight: 'bold',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  seeAllText: {
    fontSize: Math.min(16, screenWidth * 0.045),
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: screenWidth < 400 ? '100%' : '48%',
    padding: Math.max(15, screenWidth * 0.04),
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Math.max(12, screenHeight * 0.015),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 100,
  },
  actionIcon: {
    width: Math.min(50, screenWidth * 0.12),
    height: Math.min(50, screenWidth * 0.12),
    borderRadius: Math.min(25, screenWidth * 0.06),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: Math.min(14, screenWidth * 0.04),
    fontWeight: '600',
    textAlign: 'center',
  },
  sermonCard: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: Math.max(10, screenHeight * 0.015),
  },
  sermonImage: {
    width: screenWidth < 400 ? '100%' : Math.min(100, screenWidth * 0.25),
    height: screenWidth < 400 ? 150 : 100,
  },
  sermonContent: {
    flex: 1,
    padding: Math.max(12, screenWidth * 0.035),
  },
  sermonTitle: {
    fontSize: Math.min(18, screenWidth * 0.05),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sermonSpeaker: {
    fontSize: Math.min(14, screenWidth * 0.04),
    marginBottom: 3,
  },
  sermonDate: {
    fontSize: Math.min(12, screenWidth * 0.035),
  },
  eventCard: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    padding: Math.max(12, screenWidth * 0.035),
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: Math.max(10, screenHeight * 0.015),
    alignItems: screenWidth < 400 ? 'center' : 'flex-start',
  },
  eventDate: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    padding: Math.max(8, screenWidth * 0.025),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screenWidth < 400 ? 0 : 15,
    marginBottom: screenWidth < 400 ? 10 : 0,
    minWidth: Math.min(60, screenWidth * 0.15),
  },
  eventDay: {
    fontSize: Math.min(24, screenWidth * 0.065),
    fontWeight: 'bold',
    color: 'white',
  },
  eventMonth: {
    fontSize: Math.min(12, screenWidth * 0.035),
    color: 'white',
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: screenWidth < 400 ? 'center' : 'flex-start',
  },
  eventTitle: {
    fontSize: Math.min(16, screenWidth * 0.045),
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  eventTime: {
    fontSize: Math.min(14, screenWidth * 0.04),
    marginBottom: 2,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  eventLocation: {
    fontSize: Math.min(14, screenWidth * 0.04),
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  verseCard: {
    padding: Math.max(15, screenWidth * 0.04),
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: Math.max(10, screenHeight * 0.015),
  },
  verseText: {
    fontSize: Math.min(16, screenWidth * 0.045),
    fontStyle: 'italic',
    lineHeight: Math.min(24, screenWidth * 0.065),
    marginBottom: 10,
    textAlign: 'center',
  },
  verseReference: {
    fontSize: Math.min(14, screenWidth * 0.04),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
