import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];

  const connectOptions = [
    {
      title: 'Prayer Request',
      subtitle: 'Share your prayer needs with us',
      icon: 'paperplane.fill',
      route: '/prayer-request',
      color: '#3498DB',
    },
    {
      title: 'Small Groups',
      subtitle: 'Join a small group in your area',
      icon: 'person.2.fill',
      route: '/small-groups',
      color: '#27AE60',
    },
    {
      title: 'Volunteer',
      subtitle: 'Serve in church ministries',
      icon: 'house.fill',
      route: '/volunteer',
      color: '#E74C3C',
    },
    {
      title: 'Counseling',
      subtitle: 'Schedule a pastoral counseling session',
      icon: 'paperplane.fill',
      route: '/counseling',
      color: '#9B59B6',
    },
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: 'house.fill',
      url: 'https://facebook.com/gccma',
      color: '#1877F2',
    },
    {
      name: 'Instagram',
      icon: 'paperplane.fill',
      url: 'https://instagram.com/gccma',
      color: '#E4405F',
    },
    {
      name: 'YouTube',
      icon: 'play.circle.fill',
      url: 'https://youtube.com/gccma',
      color: '#FF0000',
    },
    {
      name: 'Twitter',
      icon: 'paperplane.fill',
      url: 'https://twitter.com/gccma',
      color: '#1DA1F2',
    },
  ];

  const contactInfo = [
    {
      type: 'Phone',
      value: '+1 (555) 123-4567',
      icon: 'paperplane.fill',
      action: () => Linking.openURL('tel:+15551234567'),
    },
    {
      type: 'Email',
      value: 'info@gccma.org',
      icon: 'paperplane.fill',
      action: () => Linking.openURL('mailto:info@gccma.org'),
    },
    {
      type: 'Address',
      value: '123 Church Street, Faith City, FC 12345',
      icon: 'house.fill',
      action: () => Linking.openURL('https://maps.google.com/?q=123+Church+Street+Faith+City'),
    },
    {
      type: 'Website',
      value: 'www.gccma.org',
      icon: 'chevron.left.forwardslash.chevron.right',
      action: () => Linking.openURL('https://www.gccma.org'),
    },
  ];

  const openSocialMedia = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open link');
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Connect</Text>
        <Text style={styles.headerSubtitle}>Stay connected with our community</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Connect Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Get Connected</Text>
          <View style={styles.connectGrid}>
            {connectOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.connectCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(option.route as any)}
              >
                <View style={[styles.connectIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} size={24} color="white" />
                </View>
                <Text style={[styles.connectTitle, { color: colors.text }]}>{option.title}</Text>
                <Text style={[styles.connectSubtitle, { color: colors.icon }]}>{option.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Information</Text>
          {contactInfo.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={contact.action}
            >
              <View style={[styles.contactIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name={contact.icon as any} size={20} color="white" />
              </View>
              <View style={styles.contactContent}>
                <Text style={[styles.contactType, { color: colors.icon }]}>{contact.type}</Text>
                <Text style={[styles.contactValue, { color: colors.text }]}>{contact.value}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Follow Us</Text>
          <View style={styles.socialGrid}>
            {socialMedia.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialCard, { backgroundColor: social.color }]}
                onPress={() => openSocialMedia(social.url)}
              >
                <IconSymbol name={social.icon as any} size={28} color="white" />
                <Text style={styles.socialName}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Church Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About GCCMA</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Growing in Christ, Changing the World
            </Text>
            <Text style={[styles.infoDescription, { color: colors.icon }]}>
              We are a community of believers committed to growing in our faith and making a positive impact in our world. 
              Join us as we worship together, study God's word, and serve our community with love.
            </Text>
            
            <View style={styles.scheduleSection}>
              <Text style={[styles.scheduleTitle, { color: colors.text }]}>Service Times</Text>
              <View style={styles.scheduleItem}>
                <Text style={[styles.scheduleDay, { color: colors.text }]}>Sunday</Text>
                <Text style={[styles.scheduleTime, { color: colors.icon }]}>10:00 AM & 6:00 PM</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={[styles.scheduleDay, { color: colors.text }]}>Wednesday</Text>
                <Text style={[styles.scheduleTime, { color: colors.icon }]}>7:30 PM (Bible Study)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pastoral Team */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pastoral Team</Text>
          <View style={[styles.pastorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.pastorInfo}>
              <Text style={[styles.pastorName, { color: colors.text }]}>Pastor John Smith</Text>
              <Text style={[styles.pastorTitle, { color: colors.tint }]}>Senior Pastor</Text>
              <Text style={[styles.pastorDescription, { color: colors.icon }]}>
                Pastor John has been serving our congregation for over 15 years, bringing wisdom, 
                compassion, and a heart for God's people.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  connectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  connectCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  connectIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  connectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  connectSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactType: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialCard: {
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
  socialName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  scheduleSection: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 15,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleTime: {
    fontSize: 14,
  },
  pastorCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  pastorInfo: {
    flex: 1,
  },
  pastorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pastorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  pastorDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
