import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  day: string;
  month: string;
}

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Worship', 'Bible Study', 'Youth', 'Community', 'Special'];

  const events: Event[] = [
    {
      id: '1',
      title: 'Youth Night',
      date: 'July 30, 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Youth Hall',
      description: 'Join us for an evening of worship, games, and fellowship with other young believers.',
      category: 'Youth',
      day: '30',
      month: 'JUL',
    },
    {
      id: '2',
      title: 'Sunday Worship Service',
      date: 'August 3, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Weekly worship service with inspiring messages and beautiful music.',
      category: 'Worship',
      day: '03',
      month: 'AUG',
    },
    {
      id: '3',
      title: 'Bible Study Group',
      date: 'August 5, 2025',
      time: '7:30 PM - 9:00 PM',
      location: 'Conference Room A',
      description: 'Deep dive into God\'s word with guided discussion and prayer.',
      category: 'Bible Study',
      day: '05',
      month: 'AUG',
    },
    {
      id: '4',
      title: 'Community Outreach',
      date: 'August 10, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'Downtown Park',
      description: 'Serving our community with love and practical support.',
      category: 'Community',
      day: '10',
      month: 'AUG',
    },
    {
      id: '5',
      title: 'Baptism Service',
      date: 'August 17, 2025',
      time: '11:00 AM - 12:30 PM',
      location: 'Main Sanctuary',
      description: 'Celebrate new beginnings as members are baptized.',
      category: 'Special',
      day: '17',
      month: 'AUG',
    },
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  const addToCalendar = (event: Event) => {
    Alert.alert(
      'Add to Calendar',
      `Would you like to add "${event.title}" to your calendar?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => Alert.alert('Added!', 'Event added to your calendar') },
      ]
    );
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'Worship': '#3498DB',
      'Bible Study': '#27AE60',
      'Youth': '#E74C3C',
      'Community': '#9B59B6',
      'Special': '#F39C12',
    };
    return categoryColors[category] || colors.primary;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.headerSubtitle}>Stay connected with church activities</Text>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <View style={styles.categories}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategory === category ? colors.primary : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category ? 'white' : colors.text,
                  }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Events List */}
      <ScrollView style={styles.eventsList}>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(`/event/${event.id}`)}
          >
            <View style={[styles.eventDate, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.eventDay}>{event.day}</Text>
              <Text style={styles.eventMonth}>{event.month}</Text>
            </View>
            
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={[styles.eventTitle, { color: colors.text }]} numberOfLines={2}>
                  {event.title}
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
                  <Text style={styles.categoryBadgeText}>{event.category}</Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailRow}>
                  <IconSymbol name="calendar" size={16} color={colors.icon} />
                  <Text style={[styles.eventDetailText, { color: colors.icon }]}>
                    {event.time}
                  </Text>
                </View>
                
                <View style={styles.eventDetailRow}>
                  <IconSymbol name="house.fill" size={16} color={colors.icon} />
                  <Text style={[styles.eventDetailText, { color: colors.icon }]}>
                    {event.location}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.eventDescription, { color: colors.text }]} numberOfLines={2}>
                {event.description}
              </Text>
              
              <TouchableOpacity
                style={[styles.calendarButton, { backgroundColor: colors.primary }]}
                onPress={() => addToCalendar(event)}
              >
                <IconSymbol name="calendar" size={16} color="white" />
                <Text style={styles.calendarButtonText}>Add to Calendar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categories: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventsList: {
    flex: 1,
    padding: 20,
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  eventDate: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
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
    marginTop: 2,
  },
  eventContent: {
    flex: 1,
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  calendarButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
});
