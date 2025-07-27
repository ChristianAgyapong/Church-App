import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  const menuItems = [
    {
      title: 'Give Online',
      subtitle: 'Support the church financially',
      icon: 'house.fill',
      route: '/giving',
      color: '#27AE60',
    },
    {
      title: 'Live Stream',
      subtitle: 'Watch services live',
      icon: 'play.circle.fill',
      route: '/live-stream',
      color: '#E74C3C',
    },
    {
      title: 'Prayer Wall',
      subtitle: 'Share and pray for others',
      icon: 'paperplane.fill',
      route: '/prayer-wall',
      color: '#3498DB',
    },
    {
      title: 'Bible Reading Plan',
      subtitle: 'Follow daily Bible readings',
      icon: 'paperplane.fill',
      route: '/bible-plan',
      color: '#9B59B6',
    },
    {
      title: 'Devotionals',
      subtitle: 'Daily spiritual reflections',
      icon: 'paperplane.fill',
      route: '/devotionals',
      color: '#F39C12',
    },
    {
      title: 'Church Calendar',
      subtitle: 'View all upcoming events',
      icon: 'calendar',
      route: '/calendar',
      color: '#E67E22',
    },
  ];

  const resourceItems = [
    {
      title: 'Sermon Notes',
      subtitle: 'Download sermon guides',
      icon: 'paperplane.fill',
      route: '/sermon-notes',
    },
    {
      title: 'Church Directory',
      subtitle: 'Connect with members',
      icon: 'person.2.fill',
      route: '/directory',
    },
    {
      title: 'Ministry Information',
      subtitle: 'Learn about our ministries',
      icon: 'house.fill',
      route: '/ministries',
    },
    {
      title: 'New Member Guide',
      subtitle: 'Information for new members',
      icon: 'paperplane.fill',
      route: '/new-member',
    },
  ];

  const aboutItems = [
    {
      title: 'About Our Church',
      subtitle: 'Learn about GCCMA',
      icon: 'house.fill',
      route: '/about',
    },
    {
      title: 'Statement of Faith',
      subtitle: 'Our beliefs and values',
      icon: 'paperplane.fill',
      route: '/faith-statement',
    },
    {
      title: 'Contact Us',
      subtitle: 'Get in touch',
      icon: 'paperplane.fill',
      route: '/contact',
    },
    {
      title: 'Feedback',
      subtitle: 'Share your thoughts',
      icon: 'paperplane.fill',
      route: '/feedback',
    },
  ];

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled'
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share App',
      'Share the GCCMA app with friends and family!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => Alert.alert('Shared!', 'App shared successfully') },
      ]
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate App',
      'We appreciate your feedback! Please rate our app in the store.',
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Rate Now', onPress: () => Alert.alert('Thank you!', 'Thank you for your rating') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>Explore additional features</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
                  <IconSymbol name={item.icon as any} size={20} color="white" />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.actionSubtitle, { color: colors.icon }]}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Resources</Text>
          {resourceItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name={item.icon as any} size={20} color="white" />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.menuSubtitle, { color: colors.icon }]}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Push Notifications</Text>
              <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                Receive updates about events and services
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notificationsEnabled ? 'white' : colors.icon}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                Toggle dark mode theme
              </Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={darkModeEnabled ? 'white' : colors.icon}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          {aboutItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name={item.icon as any} size={20} color="white" />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.menuSubtitle, { color: colors.icon }]}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App</Text>
          
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleShare}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#3498DB' }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Share App</Text>
              <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                Tell others about GCCMA
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleRateApp}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#F39C12' }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Rate App</Text>
              <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                Rate us in the app store
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.section}>
          <View style={[styles.versionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.versionText, { color: colors.icon }]}>
              GCCMA Church App v1.0.0
            </Text>
            <Text style={[styles.versionSubtext, { color: colors.icon }]}>
              © 2025 GCCMA. All rights reserved.
            </Text>
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 15,
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
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },
  versionCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  versionSubtext: {
    fontSize: 12,
  },
});
