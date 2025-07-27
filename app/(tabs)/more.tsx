import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = useAuth();
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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigate back to landing page
            router.replace('/landing');
          },
        },
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
        {/* User Profile Section */}
        <View style={styles.section}>
          <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.profileAvatar, { backgroundColor: colors.primary }]}>
              <IconSymbol name="person.fill" size={30} color="white" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.icon }]}>
                {user?.email || 'guest@gccma.org'}
              </Text>
              <Text style={[styles.profileMember, { color: colors.icon }]}>
                Member since {user?.memberSince || '2025'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.logoutButton, { backgroundColor: '#E74C3C' }]}
              onPress={handleLogout}
            >
              <IconSymbol name="paperplane.fill" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
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

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleLogout}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#E74C3C' }]}>
              <IconSymbol name="paperplane.fill" size={20} color="white" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Logout</Text>
              <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                Sign out of your account
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
    padding: Math.max(20, screenWidth * 0.05),
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Math.min(28, screenWidth * 0.08),
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: Math.min(16, screenWidth * 0.045),
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Math.max(15, screenWidth * 0.04),
  },
  sectionTitle: {
    fontSize: Math.min(22, screenWidth * 0.06),
    fontWeight: 'bold',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: screenWidth < 400 ? '100%' : '48%',
    padding: Math.max(12, screenWidth * 0.035),
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Math.max(10, screenHeight * 0.015),
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 100,
  },
  actionIcon: {
    width: Math.min(40, screenWidth * 0.1),
    height: Math.min(40, screenWidth * 0.1),
    borderRadius: Math.min(20, screenWidth * 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: Math.min(14, screenWidth * 0.04),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: Math.min(11, screenWidth * 0.03),
    textAlign: 'center',
    lineHeight: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Math.max(12, screenWidth * 0.035),
    borderRadius: 12,
    marginBottom: Math.max(8, screenHeight * 0.01),
    borderWidth: 1,
    minHeight: 60,
  },
  menuIcon: {
    width: Math.min(40, screenWidth * 0.1),
    height: Math.min(40, screenWidth * 0.1),
    borderRadius: Math.min(20, screenWidth * 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Math.max(12, screenWidth * 0.03),
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Math.min(16, screenWidth * 0.045),
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: Math.min(13, screenWidth * 0.035),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Math.max(12, screenWidth * 0.035),
    borderRadius: 12,
    marginBottom: Math.max(8, screenHeight * 0.01),
    borderWidth: 1,
    minHeight: 60,
  },
  settingIcon: {
    width: Math.min(40, screenWidth * 0.1),
    height: Math.min(40, screenWidth * 0.1),
    borderRadius: Math.min(20, screenWidth * 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Math.max(12, screenWidth * 0.03),
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Math.min(16, screenWidth * 0.045),
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Math.min(13, screenWidth * 0.035),
  },
  versionCard: {
    padding: Math.max(15, screenWidth * 0.04),
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: Math.max(10, screenHeight * 0.015),
  },
  versionText: {
    fontSize: Math.min(14, screenWidth * 0.04),
    fontWeight: '600',
    marginBottom: 5,
  },
  versionSubtext: {
    fontSize: Math.min(12, screenWidth * 0.035),
  },
  profileCard: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    alignItems: 'center',
    padding: Math.max(15, screenWidth * 0.04),
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: Math.max(8, screenHeight * 0.01),
    minHeight: screenWidth < 400 ? 120 : 80,
  },
  profileAvatar: {
    width: Math.min(60, screenWidth * 0.15),
    height: Math.min(60, screenWidth * 0.15),
    borderRadius: Math.min(30, screenWidth * 0.075),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth < 400 ? 0 : 15,
    marginBottom: screenWidth < 400 ? 10 : 0,
  },
  profileInfo: {
    flex: 1,
    alignItems: screenWidth < 400 ? 'center' : 'flex-start',
  },
  profileName: {
    fontSize: Math.min(18, screenWidth * 0.05),
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  profileEmail: {
    fontSize: Math.min(14, screenWidth * 0.04),
    marginBottom: 2,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  profileMember: {
    fontSize: Math.min(12, screenWidth * 0.035),
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  logoutButton: {
    width: Math.min(36, screenWidth * 0.09),
    height: Math.min(36, screenWidth * 0.09),
    borderRadius: Math.min(18, screenWidth * 0.045),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenWidth < 400 ? 10 : 0,
  },
});
