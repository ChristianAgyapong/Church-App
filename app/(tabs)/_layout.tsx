import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width: screenWidth } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: Math.max(70, screenWidth * 0.18),
          },
          default: {
            height: Math.max(65, screenWidth * 0.16),
          },
        }),
        tabBarLabelStyle: {
          fontSize: Math.min(12, screenWidth * 0.032),
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: Math.max(4, screenWidth * 0.01),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={Math.min(28, screenWidth * 0.07)} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sermons"
        options={{
          title: 'Sermons',
          tabBarIcon: ({ color }) => <IconSymbol size={Math.min(28, screenWidth * 0.07)} name="play.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <IconSymbol size={Math.min(28, screenWidth * 0.07)} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color }) => <IconSymbol size={Math.min(28, screenWidth * 0.07)} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <IconSymbol size={Math.min(28, screenWidth * 0.07)} name="ellipsis.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
