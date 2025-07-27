import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  image: any;
  category: string;
}

export default function SermonsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Sunday Service', 'Bible Study', 'Youth', 'Special Events'];

  const sermons: Sermon[] = [
    {
      id: '1',
      title: 'Walking in Faith',
      speaker: 'Pastor John Smith',
      date: 'July 27, 2025',
      duration: '45 min',
      description: 'A powerful message about trusting God in uncertain times.',
      image: require('../../assets/images/partial-react-logo.png'),
      category: 'Sunday Service',
    },
    {
      id: '2',
      title: 'The Power of Prayer',
      speaker: 'Pastor Sarah Johnson',
      date: 'July 20, 2025',
      duration: '38 min',
      description: 'Understanding the importance of prayer in our daily lives.',
      image: require('../../assets/images/partial-react-logo.png'),
      category: 'Bible Study',
    },
    {
      id: '3',
      title: 'Living with Purpose',
      speaker: 'Pastor Michael Brown',
      date: 'July 13, 2025',
      duration: '42 min',
      description: 'Discovering God\'s purpose for your life.',
      image: require('../../assets/images/partial-react-logo.png'),
      category: 'Sunday Service',
    },
    {
      id: '4',
      title: 'Youth and Faith',
      speaker: 'Pastor David Wilson',
      date: 'July 6, 2025',
      duration: '35 min',
      description: 'A special message for young believers.',
      image: require('../../assets/images/partial-react-logo.png'),
      category: 'Youth',
    },
  ];

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Sermons</Text>
        <Text style={styles.headerSubtitle}>Listen to inspiring messages</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="paperplane.fill" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search sermons..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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

      {/* Sermons List */}
      <ScrollView style={styles.sermonsList}>
        {filteredSermons.map((sermon) => (
          <TouchableOpacity
            key={sermon.id}
            style={[styles.sermonCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(`/sermon/${sermon.id}`)}
          >
            <Image source={sermon.image} style={styles.sermonImage} />
            <View style={styles.sermonContent}>
              <View style={styles.sermonHeader}>
                <Text style={[styles.sermonTitle, { color: colors.text }]} numberOfLines={2}>
                  {sermon.title}
                </Text>
                <View style={[styles.playButton, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="play.circle.fill" size={24} color="white" />
                </View>
              </View>
              <Text style={[styles.sermonSpeaker, { color: colors.tint }]}>
                {sermon.speaker}
              </Text>
              <Text style={[styles.sermonDescription, { color: colors.icon }]} numberOfLines={2}>
                {sermon.description}
              </Text>
              <View style={styles.sermonMeta}>
                <Text style={[styles.sermonDate, { color: colors.icon }]}>
                  {sermon.date}
                </Text>
                <Text style={[styles.sermonDuration, { color: colors.icon }]}>
                  {sermon.duration}
                </Text>
              </View>
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
    padding: 20,
    paddingTop: 50, // Account for status bar
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  searchSection: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    padding: 0, // Remove default TextInput padding
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sermonsList: {
    padding: 16,
  },
  sermonCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  sermonImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  sermonContent: {
    flex: 1,
    padding: 12,
  },
  sermonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sermonSpeaker: {
    fontSize: 14,
    marginTop: 4,
  },
  sermonDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  sermonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sermonDate: {
    fontSize: 12,
  },
  sermonDuration: {
    fontSize: 12,
  },
});


