import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  churchName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  sermonCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sermonImage: {
    width: 100,
    height: 100,
  },
  sermonContent: {
    flex: 1,
    padding: 15,
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sermonSpeaker: {
    fontSize: 14,
    marginBottom: 3,
  },
  sermonDate: {
    fontSize: 12,
  },
  eventCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventDate: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    minWidth: 60,
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  eventMonth: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 14,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
  },
  verseCard: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  verseReference: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
