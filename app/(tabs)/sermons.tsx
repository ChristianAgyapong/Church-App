import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      image: require('@/assets/images/partial-react-logo.png'),
      category: 'Sunday Service',
    },
    {
      id: '2',
      title: 'The Power of Prayer',
      speaker: 'Pastor Sarah Johnson',
      date: 'July 20, 2025',
      duration: '38 min',
      description: 'Understanding the importance of prayer in our daily lives.',
      image: require('@/assets/images/partial-react-logo.png'),
      category: 'Bible Study',
    },
    {
      id: '3',
      title: 'Living with Purpose',
      speaker: 'Pastor Michael Brown',
      date: 'July 13, 2025',
      duration: '42 min',
      description: 'Discovering God\'s purpose for your life.',
      image: require('@/assets/images/partial-react-logo.png'),
      category: 'Sunday Service',
    },
    {
      id: '4',
      title: 'Youth and Faith',
      speaker: 'Pastor David Wilson',
      date: 'July 6, 2025',
      duration: '35 min',
      description: 'A special message for young believers.',
      image: require('@/assets/images/partial-react-logo.png'),
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
  searchSection: {
    padding: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
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
  sermonsList: {
    flex: 1,
    padding: 20,
  },
  sermonCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sermonImage: {
    width: 120,
    height: 120,
  },
  sermonContent: {
    flex: 1,
    padding: 15,
  },
  sermonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sermonSpeaker: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  sermonDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  sermonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sermonDate: {
    fontSize: 12,
  },
  sermonDuration: {
    fontSize: 12,
  },
});
